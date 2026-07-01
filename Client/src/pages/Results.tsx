import { useEffect, useState } from "react";
import { ImageIcon, Loader2Icon, RefreshCwIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import { GhostButton } from "../components/Buttons";
import { useAuth, useUser } from "@clerk/react";
import api from "../configs/axios";
import toast from "react-hot-toast";

const Results = () => {
  const { projectId } = useParams();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [project, setProjectData] = useState<Project>({} as Project);
  const [loading, setLoading] = useState(true);

  const fetchProjectData = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get(`/api/user/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjectData(data.project);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user && !project.id) {
      fetchProjectData();
    } else if (isLoaded && !user) {
      navigate("/");
    }
  }, [user]);

  return loading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2Icon className="animate-spin text-indigo- size-9" />
    </div>
  ) : (
    <div className="min-h-screen text-white p-6 md:p-12 mt-20">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">Post Result</h1>
          <Link
            to="/generate"
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <RefreshCwIcon className="w-4 h-4" />
            <p className="max-sm:hidden">New Post</p>
          </Link>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel inline-block p-2 rounded-2xl">
              <div
                className={`${project?.aspectRatio === "9:16" ? "aspect-9/16" : "aspect-video"} sm:max-h-200 rounded-xl bg-gray-900 overflow-hidden relative`}
              >
                <img
                  src={project.generatedImage}
                  alt="Composed Result"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="mb-4 font-medium">Actions</h3>
              <div className="space-y-3">
                <a
                  href={project.generatedImage}
                  download={`${project.productName}-post.jpg`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GhostButton
                    disabled={!project.generatedImage}
                    className="w-full justify-center rounded-md py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ImageIcon className="size-4.5" />
                    Download Post ({project.aspectRatio})
                  </GhostButton>
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">Post Details</h3>
              <p className="text-gray-400 text-sm mb-2">
                <span className="text-white">Product:</span> {project.productName}
              </p>
              {project.productDescription && (
                <p className="text-gray-400 text-sm mb-2">
                  {project.productDescription}
                </p>
              )}
              {project.userPrompt && (
                <p className="text-gray-400 text-sm italic">{project.userPrompt}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
