import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Application, Project } from "../types";

export default function useApplications(projectId: string | undefined) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isProjectLoading, setIsApplicationsLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const fetchProjects = useCallback(async () => {
    if (projectId) {
      setIsApplicationsLoading(true);
      try {
        const projectResponse = await axiosInstance.get(
          `/projects/${projectId}`
        );
        const response = await axiosInstance.get(`/applications/${projectId}`);
        setProject(projectResponse.data);
        setApplications(response.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      } finally {
        setIsApplicationsLoading(false);
      }
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    applications,
    isLoading: isProjectLoading,
    refetch: fetchProjects,
    project,
  };
}
