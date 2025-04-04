import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useMyProjects from "../hooks/useMyProjects";

export default function BusinessDashboard() {
  const { currentUser } = useAuth();
  const { projects, isLoading } = useMyProjects(currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Business Dashboard</h1>
        <Link
          to="/create-project"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Create New Project
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Welcome back, {currentUser?.firstName}!
        </h2>
        <p className="text-gray-600">
          Manage your projects and review applications from talented
          freelancers.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>

        {isLoading ? (
          <p>Loading your projects...</p>
        ) : projects.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first project to start finding talented freelancers.
            </p>
            <Link
              to="/create-project"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
            >
              Create a Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

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
                    <span className="text-sm text-gray-500">
                      Budget:{" "}
                      <span className="font-medium">${project.budget}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      Deadline:{" "}
                      <span className="font-medium">
                        {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 flex justify-between">
                  <Link
                    to={`/project/${project.id}`}
                    className="text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/applications/${project.id}`}
                    className="text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    View Applications
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
