import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  // Check if user is logged in based on presence of token
  const isLoggedIn = !!localStorage.getItem("token");

  // Navigate user to appropriate home page
  const handleGoHome = () => {
    navigate(isLoggedIn ? "/dashboard" : "/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 dark:text-white">
        The page you’re looking for doesn’t exist.
      </p>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );
}
