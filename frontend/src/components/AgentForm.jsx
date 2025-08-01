import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import api from "../services/api";

export default function AgentForm({ onSuccess }) {
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setAgent({ ...agent, mobile: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = agent;

    if (!name || !email || !mobile || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await api.post("/agents", agent);
      toast.success("Agent added successfully!");
      onSuccess?.(); // Notify parent component
      setAgent({ name: "", email: "", mobile: "", password: "" });
    } catch (error) {
      console.error("Error adding agent:", error);
      toast.error("Failed to add agent");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-lg space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Add New Agent</h2>

      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          value={agent.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={agent.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Mobile Number</label>
        <PhoneInput
          placeholder="Enter mobile number"
          defaultCountry="IN"
          international
          countryCallingCodeEditable={false}
          value={agent.mobile}
          onChange={handlePhoneChange}
          className="w-full border border-gray-300 p-2 rounded !outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={agent.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded hover:from-blue-700 hover:to-indigo-700 transition duration-300 disabled:opacity-50"
        disabled={
          !agent.name || !agent.email || !agent.mobile || !agent.password
        }
      >
        Add Agent
      </button>
    </form>
  );
}
