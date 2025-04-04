"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import useApplications from "../hooks/useApplications";
import { axiosInstance } from "../lib/axios";

interface ApplicationFormData {
  skills: string;
  portfolio: string;
  hourlyRate: string;
  bio: string;
}

export default function ApplicationForm() {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm<ApplicationFormData>();
  const navigate = useNavigate();
  const { project, isLoading } = useApplications(projectId);
  const [error, setError] = useState("");

  const handleApplicationSubmit = async (formData: ApplicationFormData) => {
    setError("");

    // Basic validation
    if (!formData.skills || !formData.hourlyRate || !formData.bio) {
      setError("All fields are required except portfolio URL");
      return;
    }

    try {
      const newApplication = {
        ...formData,
        projectId,
        freelancerId: currentUser?.id,
        hourlyRate: +formData.hourlyRate,
      };

      await axiosInstance.post(`/applications/`, newApplication);
      navigate("/freelancer-dashboard");
    } catch (err) {
      setError("Failed to submit application");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading project details...</div>;
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="mb-6">
          The project you're trying to apply for doesn't exist or has been
          removed.
        </p>
        <button
          onClick={() => navigate("/freelancer-dashboard")}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Apply for Project: {project.name}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleApplicationSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="skills"
          >
            Your Skills
          </label>
          <textarea
            {...register("skills")}
            id="skills"
            name="skills"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="List your relevant skills for this project"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="portfolio"
          >
            Portfolio URL (Optional)
          </label>
          <input
            {...register("portfolio")}
            id="portfolio"
            name="portfolio"
            type="url"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hourlyRate"
          >
            Hourly Rate (USD)
          </label>
          <input
            {...register("hourlyRate")}
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            min="1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your hourly rate"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bio"
          >
            Personal Bio
          </label>
          <textarea
            {...register("bio")}
            id="bio"
            name="bio"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tell the client about yourself and why you're a good fit for this project"
            rows={5}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(`/project/${projectId}`)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
