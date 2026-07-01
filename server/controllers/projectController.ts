import { Request, Response } from "express";
import * as Sentry from "@sentry/node";
import { prisma } from "../configs/prisma.js";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs";
import {
  composeUgcImage,
  COMPOSE_CREDIT_COST,
} from "../utils/cloudinaryCompose.js";

export const createProject = async (req: Request, res: Response) => {
  let tempProjectId: string | undefined;
  const { userId } = req.auth();
  let isCreditDeducted = false;

  const {
    name = "New Project",
    aspectRatio,
    userPrompt,
    productName,
    productDescription,
    targetLength = 5,
  } = req.body;

  const images: Express.Multer.File[] =
    (req.files as Express.Multer.File[]) || [];

  if (images.length < 2 || !productName) {
    return res.status(400).json({ message: "Please upload at least 2 images" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.credits < COMPOSE_CREDIT_COST) {
    return res.status(401).json({ message: "Insufficient credits" });
  }

  await prisma.user
    .update({
      where: { id: userId },
      data: { credits: { decrement: COMPOSE_CREDIT_COST } },
    })
    .then(() => {
      isCreditDeducted = true;
    });

  try {
    const uploaded = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          folder: "ugc-uploads",
        });

        if (fs.existsSync(item.path)) {
          fs.unlinkSync(item.path);
        }

        return {
          secure_url: result.secure_url,
          public_id: result.public_id,
        };
      }),
    );

    const project = await prisma.project.create({
      data: {
        name,
        userId,
        productName,
        productDescription,
        userPrompt,
        aspectRatio,
        targetLength: parseInt(targetLength),
        uploadedImages: uploaded.map((item) => item.secure_url),
        isGenerating: true,
      },
    });

    tempProjectId = project.id;

    const [productUpload, modelUpload] = uploaded;

    const generatedImage = await composeUgcImage({
      modelPublicId: modelUpload.public_id,
      productPublicId: productUpload.public_id,
      aspectRatio: aspectRatio || "9:16",
      productName,
    });

    await prisma.project.update({
      where: { id: project.id },
      data: {
        generatedImage,
        isGenerating: false,
      },
    });

    res.json({
      projectId: project.id,
      message: "Post created successfully",
    });
  } catch (error: any) {
    if (tempProjectId) {
      await prisma.project.update({
        where: { id: tempProjectId },
        data: { isGenerating: false, error: error.message },
      });
    }

    if (isCreditDeducted) {
      await prisma.user.update({
        where: { id: userId },
        data: { credits: { increment: COMPOSE_CREDIT_COST } },
      });
    }

    Sentry.captureException(error);

    return res.status(500).json({
      message: error?.message || "Failed to create post",
    });
  }
};

export const getALLPublishedProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ projects });
  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const projectId = String(req.params.projectId);

    const project = await prisma.project.findUnique({
      where: { id: projectId, userId },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    res.json({ message: "Project deleted" });
  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({ message: error.message });
  }
};
