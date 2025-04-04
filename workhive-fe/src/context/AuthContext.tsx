import { createContext, useState, useContext, type ReactNode } from "react";
import type { LoginFormData, User } from "../types";
import { axiosInstance } from "../lib/axios";

interface AuthContextType {
  currentUser: User | null;
  login: (userData: LoginFormData) => Promise<User>;
  logout: () => void;
  registerUser: (userData: Omit<User, "id">) => Promise<User>;
  isBusinessOwner: boolean;
  isFreelancer: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (userData: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      localStorage.setItem("token", response.data.access_token);
      setCurrentUser(response.data.user);

      //redirect user based on role
      return response.data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("workhive_user");
  };

  const registerUser = async (userData: Omit<User, "id">): Promise<User> => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post<User>("/auth/signup", userData);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    registerUser,
    isBusinessOwner: currentUser?.role === "BUSINESS",
    isFreelancer: currentUser?.role === "FREELANCER",
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
