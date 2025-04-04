import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Project } from "../types";

export default function useMyProjects(ownerId: string | undefined) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectLoading, setIsProjectLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    if (ownerId) {
      setIsProjectLoading(true);
      try {
        const response = await axiosInstance.get(
          `/projects/my-projects/${ownerId}`
        );
        setProjects(response.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      } finally {
        setIsProjectLoading(false);
      }
    }
  }, [ownerId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading: isProjectLoading,
    refetch: fetchProjects,
  };
}
