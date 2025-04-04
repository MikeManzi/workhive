export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "BUSINESS" | "FREELANCER";
  password?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  budget: string;
  skills: string[];
  deadline: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Application {
  id: string;
  projectId: string;
  project?: Project;
  freelancerId: string;
  skills: string;
  portfolio: string;
  hourlyRate: string;
  bio: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  user: User;
}

export interface LoginFormData {
  email: string;
  password: string;
}
