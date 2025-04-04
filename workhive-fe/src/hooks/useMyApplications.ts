import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Application } from "../types";

export default function useMyApplications(freelancerId: string | undefined) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isProjectLoading, setIsApplicationsLoading] = useState(false);
  const fetchProjects = useCallback(async () => {
    if (freelancerId) {
      setIsApplicationsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/applications/my-applications/${freelancerId}`
        );
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
  }, [freelancerId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    applications,
    isApplicationsLoading: isProjectLoading,
    refetch: fetchProjects,
  };
}
