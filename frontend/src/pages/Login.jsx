import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./../components/LoginForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../services/api"; // Pre-configured Axios instance

export default function Login() {
  // Form state to capture user input
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Error message (used for UI feedback or toast)
  const [error, setError] = useState("");

  const navigate = useNavigate(); // For programmatic route navigation

  // Update form input values
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    try {
      // Send login request
      const res = await API.post("/auth/login", formData);

      // Save token for authenticated routes
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      // Gracefully handle API errors
      const errMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <LoginForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}
