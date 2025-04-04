"use client";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { currentUser, isFreelancer } = useAuth();

  const deadline = new Date(project.deadline);
  const today = new Date();
  const daysRemaining = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {project.name}
          </h3>
          <span className="bg-primary text-white text-sm font-medium px-2.5 py-0.5 rounded">
            ${project.budget}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span
              className={`font-medium ${
                daysRemaining < 3 ? "text-red-500" : "text-gray-700"
              }`}
            >
              {daysRemaining > 0
                ? `${daysRemaining} days remaining`
                : "Deadline passed"}
            </span>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/project/${project.id}`}
              className="text-primary hover:text-primary-dark font-medium text-sm"
            >
              View Details
            </Link>

            {isFreelancer && currentUser && (
              <Link
                to={`/apply/${project.id}`}
                className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark"
              >
                Apply
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
