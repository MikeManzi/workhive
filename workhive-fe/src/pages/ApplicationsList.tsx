import { useParams, useNavigate } from "react-router-dom";
import useApplications from "../hooks/useApplications";
import { axiosInstance } from "../lib/axios";

export default function ApplicationsList() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { applications, isLoading, project, refetch } =
    useApplications(projectId);

  // const handleStatusChange = (applicationId: string, newStatus: "approved" | "rejected") => {
  //   // In a real app, you would send this to your backend
  //   // For this demo, we'll update localStorage
  //   const allApplications = JSON.parse(localStorage.getItem("workhive_applications") || "[]") as Application[]
  //   const updatedApplications = allApplications.map((app) => {
  //     if (app.id === applicationId) {
  //       return { ...app, status: newStatus }
  //     }
  //     return app
  //   })

  //   localStorage.setItem("workhive_applications", JSON.stringify(updatedApplications))

  //   // Update local state
  //   setApplications(
  //     applications.map((app) => {
  //       if (app.id === applicationId) {
  //         return { ...app, status: newStatus }
  //       }
  //       return app
  //     }),
  //   )
  // }

  const handleStatusChange = async (
    applicationId: string,
    newStatus: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      await axiosInstance.patch(`/applications/${applicationId}`, {
        status: newStatus,
      });
      // Refetch applications after updating status
      await refetch();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading applications...</div>;
  }

  // if (!project) {
  //   return (
  //     <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-center">
  //       <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
  //       <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
  //       <button
  //         onClick={() => navigate("/business-dashboard")}
  //         className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
  //       >
  //         Back to Dashboard
  //       </button>
  //     </div>
  //   )
  // }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="mb-6">
        <button
          onClick={() => navigate(`/project/${projectId}`)}
          className="text-primary hover:text-primary-dark font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Project
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">
            Applications for: {project?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Review and manage freelancer applications
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600">
              Check back later to see if freelancers have applied to your
              project.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {applications.map((application) => (
              <div key={application.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {application.user.firstName} {application.user.lastName}
                    </h3>
                    <p className="text-gray-600">
                      Applied on:{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="text-lg font-medium">
                      ${application.hourlyRate}/hr
                    </span>
                    <span
                      className={`ml-4 px-2 py-1 text-sm font-medium rounded-full ${
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
                        ? "Accepted"
                        : "Rejected"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <p className="text-gray-700">{application.skills}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-gray-700">{application.bio}</p>
                  </div>
                </div>

                {application.portfolio && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Portfolio</h4>
                    <a
                      href={application.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {application.portfolio}
                    </a>
                  </div>
                )}

                {application.status === "PENDING" && (
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                      onClick={() =>
                        handleStatusChange(application.id, "ACCEPTED")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                      onClick={() =>
                        handleStatusChange(application.id, "REJECTED")
                      }
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
