import React, { Suspense, lazy } from "react";
// Core React import plus lazy loading and suspense for performance optimization.

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// React Router components for client-side routing.

import { Toaster } from "react-hot-toast";
// Toast notifications for user feedback.

// --- Lazy-loaded pages for better performance
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

// --- Route protection
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

// --- Loader shown while lazy components load
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
  </div>
);

// --- Main App Component
export default function App() {
  return (
    <Router>
      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#f0fdf4",
            color: "#166534",
            fontWeight: "500",
            border: "1px solid #bbf7d0",
          },
        }}
      />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
