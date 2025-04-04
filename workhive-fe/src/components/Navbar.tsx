"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { currentUser, logout, isBusinessOwner, isFreelancer } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">WorkHive</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-primary-dark">
              Home
            </Link>

            {currentUser ? (
              <>
                {isBusinessOwner && (
                  <>
                    <Link to="/business-dashboard" className="px-3 py-2 rounded-md hover:bg-primary-dark">
                      Dashboard
                    </Link>
                    <Link to="/create-project" className="px-3 py-2 rounded-md hover:bg-primary-dark">
                      Create Project
                    </Link>
                  </>
                )}

                {isFreelancer && (
                  <Link to="/freelancer-dashboard" className="px-3 py-2 rounded-md hover:bg-primary-dark">
                    Dashboard
                  </Link>
                )}

                <button onClick={handleLogout} className="px-3 py-2 rounded-md hover:bg-primary-dark">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md hover:bg-primary-dark">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md bg-white text-primary font-medium hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-dark focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-primary-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {currentUser ? (
              <>
                {isBusinessOwner && (
                  <>
                    <Link
                      to="/business-dashboard"
                      className="block px-3 py-2 rounded-md hover:bg-primary-dark"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/create-project"
                      className="block px-3 py-2 rounded-md hover:bg-primary-dark"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Project
                    </Link>
                  </>
                )}

                {isFreelancer && (
                  <Link
                    to="/freelancer-dashboard"
                    className="block px-3 py-2 rounded-md hover:bg-primary-dark"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-primary-dark"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:bg-primary-dark"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md bg-white text-primary font-medium hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

