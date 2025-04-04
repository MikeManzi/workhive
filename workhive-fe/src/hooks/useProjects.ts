import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Project } from "../types";

export default function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsProjectsLoading(true);
    try {
      const response = await axiosInstance.get(`/projects/`);
      setProjects(response.data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsProjectsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading: isProjectsLoading,
    refetch: fetchProjects,
  };
}
