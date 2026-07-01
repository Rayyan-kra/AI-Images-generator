import cloudinary from "../configs/cloudinary.js";

export const COMPOSE_CREDIT_COST = 2;

function formatOverlayPublicId(publicId: string): string {
  return publicId.split("/").join(":");
}

export async function composeUgcImage(options: {
  modelPublicId: string;
  productPublicId: string;
  aspectRatio: string;
  productName?: string;
}): Promise<string> {
  const { modelPublicId, productPublicId, aspectRatio, productName } = options;

  const isLandscape = aspectRatio === "16:9";
  const width = isLandscape ? 1920 : 1080;
  const height = isLandscape ? 1080 : 1920;

  const transformations: Record<string, unknown>[] = [
    { width, height, crop: "fill", gravity: "auto" },
    {
      overlay: formatOverlayPublicId(productPublicId),
      width: Math.round(width * 0.32),
      gravity: "south_east",
      x: 30,
      y: 30,
      crop: "fit",
    },
  ];

  if (productName?.trim()) {
    transformations.push({
      overlay: {
        font_family: "Arial",
        font_size: Math.round(width * 0.035),
        font_weight: "bold",
        text: productName.trim().slice(0, 40),
      },
      gravity: "south_west",
      x: 30,
      y: 30,
      color: "#FFFFFF",
    });
  }

  const composedUrl = cloudinary.url(modelPublicId, {
    transformation: transformations,
    secure: true,
  });

  const uploadResult = await cloudinary.uploader.upload(composedUrl, {
    resource_type: "image",
    folder: "ugc-composed",
  });

  return uploadResult.secure_url;
}
