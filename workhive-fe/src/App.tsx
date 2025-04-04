import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessDashboard from "./pages/BusinessDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectDetails from "./pages/ProjectDetails";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationsList from "./pages/ApplicationsList";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/business-dashboard"
                element={
                  <ProtectedRoute userType="BUSINESS">
                    <BusinessDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/freelancer-dashboard"
                element={
                  <ProtectedRoute userType="FREELANCER">
                    <FreelancerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-project"
                element={
                  <ProtectedRoute userType="BUSINESS">
                    <ProjectCreate />
                  </ProtectedRoute>
                }
              />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route
                path="/apply/:projectId"
                element={
                  <ProtectedRoute userType="FREELANCER">
                    <ApplicationForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications/:projectId"
                element={
                  <ProtectedRoute userType="BUSINESS">
                    <ApplicationsList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
