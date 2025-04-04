"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "BUSINESS" | "FREELANCER";
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { registerUser, isLoading } = useAuth();

  const handleRegister = async (formData: RegisterFormData) => {
    setError("");

    console.log(formData);
    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      // Register the user
      registerUser(formData);

      // Redirect based on user type
      if (formData.role === "BUSINESS") {
        navigate("/business-dashboard");
      } else {
        navigate("/freelancer-dashboard");
      }
    } catch (err) {
      setError("Failed to create an account");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Your Account
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            First Name
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            name="firstName"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Last Name
          </label>
          <input
            {...register("lastName")}
            id="lastName"
            name="lastName"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            id="email"
            name="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="john@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="********"
          />
          <p className="text-gray-500 text-xs mt-1">
            Must be at least 6 characters
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            I am a:
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                {...register("role")}
                type="radio"
                name="role"
                value="BUSINESS"
                className="mr-2"
              />
              Business Owner
            </label>
            <label className="flex items-center">
              <input
                {...register("role")}
                type="radio"
                name="role"
                value="FREELANCER"
                className="mr-2"
              />
              Freelancer
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create Account
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
