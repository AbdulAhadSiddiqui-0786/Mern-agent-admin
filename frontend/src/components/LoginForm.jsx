import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Login form component — receives data and handlers as props
export default function LoginForm({ formData, onChange, onSubmit, error }) {
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        {/* Display error message if present */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        {/* Email input */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

         {/* Password input with toggle icon  */}
        <div className="relative">
          <label className="block text-sm mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"} // Show/hide password
            name="password"
            value={formData.password}
            onChange={onChange}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-9 right-3 cursor-pointer text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
