"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/useProjects";
import useMyApplications from "../hooks/useMyApplications";

export default function FreelancerDashboard() {
  const { currentUser } = useAuth();
  const { projects, isLoading } = useProjects();
  const { applications, isApplicationsLoading } = useMyApplications(
    currentUser?.id
  );
  console.log("applications", applications);

  const [filter, setFilter] = useState("all");

  // useEffect(() => {
  //   // In a real app, you would fetch from your API
  //   // For this demo, we'll use localStorage
  //   const allProjects = JSON.parse(localStorage.getItem("workhive_projects") || "[]") as Project[]
  //   const allApplications = JSON.parse(localStorage.getItem("workhive_applications") || "[]") as Application[]

  //   // Get user's applications
  //   const userApplications = allApplications.filter((app) => app.freelancerId === currentUser?.id)
  //   setApplications(userApplications)

  //   // Get projects the user hasn't applied to yet
  //   const appliedProjectIds = userApplications.map((app) => app.projectId)
  //   const availableProjects = allProjects.filter((project) => !appliedProjectIds.includes(project.id))

  //   setLoading(false)
  // }, [currentUser?.id])

  // Filter projects based on skills (in a real app, this would be more sophisticated)
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) =>
          project.skills.some((skill) =>
            skill.toLowerCase().includes(filter.toLowerCase())
          )
        );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Find and apply for projects that match your skills
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Welcome back, {currentUser?.firstName}!
        </h2>
        <p className="text-gray-600">
          Browse available projects and track your applications.
        </p>
      </div>

      {/* Applications Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Applications</h2>

        {isApplicationsLoading ? (
          <p>Loading your applications...</p>
        ) : applications.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600">
              Apply to projects to start building your portfolio.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => {
                  return (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.project?.name || "Unknown Project"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            application.status === "ACCEPTED"
                              ? "bg-green-100 text-green-800"
                              : application.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {application.status === "PENDING"
                            ? "Pending"
                            : application.status === "ACCEPTED"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/project/${application.project?.id}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          View Project
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Available Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Available Projects</h2>

          <div className="flex items-center">
            <label
              htmlFor="filter"
              className="mr-2 text-sm font-medium text-gray-700"
            >
              Filter by skill:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="all">All Skills</option>
              <option value="react">React</option>
              <option value="javascript">JavaScript</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="writing">Writing</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects available
            </h3>
            <p className="text-gray-600">
              Check back later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
