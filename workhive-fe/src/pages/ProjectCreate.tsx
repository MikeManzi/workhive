import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../lib/axios";

interface ProjectFormData {
  name: string;
  description: string;
  budget: string;
  skills: string[];
  deadline: string;
}

export default function ProjectCreate() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ProjectFormData>();

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills((prev) => [...prev, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleProjectSubmit = async (formData: ProjectFormData) => {
    setError("");

    // Basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.budget ||
      !formData.deadline
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.skills.length === 0) {
      setError("Please add at least one required skill");
      return;
    }

    try {
      const newProject = {
        ...formData,
        skills: skills,
        deadline: new Date(formData.deadline).toISOString(),
        budget: +formData.budget,
        ownerId: currentUser?.id,
      };

      await axiosInstance.post("/projects", newProject);
      navigate("/business-dashboard");
    } catch (err) {
      setError("Failed to create project");
      console.error(err);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create a New Project
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleProjectSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Project Name
          </label>
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="E.g., Website Redesign"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Project Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Describe your project requirements in detail"
            rows={5}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="budget"
          >
            Budget (USD)
          </label>
          <input
            {...register("budget")}
            id="budget"
            name="budget"
            type="number"
            min="1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Maximum budget for this project"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Required Skills
          </label>
          <div className="flex">
            <input
              {...register("skills")}
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="E.g., JavaScript, Design, Marketing"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-r"
            >
              Add
            </button>
          </div>

          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1.5 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deadline"
          >
            Project Deadline
          </label>
          <input
            {...register("deadline")}
            id="deadline"
            name="deadline"
            type="date"
            min={today}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/business-dashboard")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
