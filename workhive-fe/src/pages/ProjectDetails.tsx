import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useApplications from "../hooks/useApplications";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, isFreelancer, isBusinessOwner } = useAuth();
  const navigate = useNavigate();

  const { project, isLoading } = useApplications(id);
  const [hasApplied, setHasApplied] = useState(false);

  // useEffect(() => {
  //   // In a real app, you would fetch from your API
  //   // For this demo, we'll use localStorage
  //   const allProjects = JSON.parse(
  //     localStorage.getItem("workhive_projects") || "[]"
  //   ) as Project[];
  //   const foundProject = allProjects.find((p) => p.id === id);

  //   if (foundProject) {
  //     setProject(foundProject);

  //     // Get project owner details
  //     const users = JSON.parse(
  //       localStorage.getItem("workhive_users") || "[]"
  //     ) as User[];
  //     const projectOwner = users.find((u) => u.id === foundProject.ownerId);
  //     setOwner(
  //       projectOwner || {
  //         id: "",
  //         name: "Unknown Owner",
  //         email: "",
  //         userType: "business",
  //       }
  //     );

  //     // Check if current user has applied
  //     if (currentUser && isFreelancer) {
  //       const applications = JSON.parse(
  //         localStorage.getItem("workhive_applications") || "[]"
  //       ) as Application[];
  //       const userApplication = applications.find(
  //         (app) => app.projectId === id && app.freelancerId === currentUser.id
  //       );
  //       setHasApplied(!!userApplication);
  //     }
  //   }

  //   setLoading(false);
  // }, [id, currentUser, isFreelancer]);

  if (isLoading) {
    return <div className="text-center py-10">Loading project details...</div>;
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="mb-6">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Go Home
        </Link>
      </div>
    );
  }

  // Calculate days remaining until deadline
  const deadline = new Date(project.deadline);
  const today = new Date();
  const daysRemaining = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center">
              <span className="bg-primary text-white text-lg font-medium px-3 py-1 rounded">
                ${project.budget}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Project Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Project Details</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Posted by:</span>{" "}
                  {project.user?.firstName} {project.user?.lastName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Posted on:</span>{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                  {daysRemaining > 0 ? (
                    <span
                      className={`ml-2 ${
                        daysRemaining < 3 ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      ({daysRemaining} days remaining)
                    </span>
                  ) : (
                    <span className="ml-2 text-red-500">(Deadline passed)</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Go Back
            </button>

            {currentUser &&
              isFreelancer &&
              (hasApplied ? (
                <div className="text-green-600 font-medium">
                  You have already applied to this project
                </div>
              ) : (
                <Link
                  to={`/apply/${project.id}`}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                >
                  Apply for this Project
                </Link>
              ))}

            {currentUser &&
              isBusinessOwner &&
              currentUser.id === project.ownerId && (
                <Link
                  to={`/applications/${project.id}`}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                >
                  View Applications
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
