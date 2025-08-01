import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation between pages
import AgentForm from "../components/AgentForm"; // component for adding new agent details
import CSVUpload from "../components/CSVUpload"; // component for uploading a CSV file
import DistributedList from "../components/DistributedList"; // component to display distributed agents
import axios from "../services/api"; // axios instance for API calls

export default function Dashboard() {
  // State hooks to manage component data
  const [distributedData, setDistributedData] = useState([]); // stores distributed data for agents
  const [loadingDistributed, setLoadingDistributed] = useState(true); // keeps track of loading state for distributed data

  // State for handling the theme (dark/light mode)
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme"); // get theme preference from localStorage if exists
    return (
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" // default to dark theme if no preference found
        : "light") // else default to light theme
    );
  });

  const navigate = useNavigate(); // Hook to navigate between pages

  // Effect hook to apply the theme to the document's root element
  useEffect(() => {
    const root = document.documentElement; // get the root HTML element
    root.classList.remove("dark", "light"); // remove any previous theme classes
    root.classList.add(theme); // apply the current theme
    localStorage.setItem("theme", theme); // store the selected theme in localStorage
  }, [theme]); // this will run when the theme changes

  // Function to toggle between dark and light themes
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear the stored user token
    navigate("/"); // redirect to the home page after logout
  };

  // Function to fetch distributed agent data from the API
  const fetchDistributedData = async () => {
    setLoadingDistributed(true); // set loading state to true before fetching data
    try {
      const token = localStorage.getItem("token"); // get the user token for authentication
      const res = await axios.get("/lists/distributed", {
        // make an API call to fetch data
        headers: { Authorization: `Bearer ${token}` }, // pass the token in the Authorization header
      });
      setDistributedData(res.data || []); // update the state with the fetched data
    } catch (error) {
      console.error("Failed to fetch distributed data", error); // log any errors
    } finally {
      setLoadingDistributed(false); // set loading state to false after fetching data
    }
  };

  // Effect hook to fetch distributed data once the component is mounted
  useEffect(() => {
    fetchDistributedData(); // call the function to fetch data on component mount
  }, []); // empty dependency array means this effect runs only once when the component is first loaded

  // Loader component to show a loading spinner while data is being fetched
  const Loader = () => (
    <div className="flex justify-center py-4">
      <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      {/* Header section with title, theme toggle, and logout button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          {/* Button to toggle dark/light theme */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded dark:bg-gray-900 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? "🌙" : "☀️"}{" "}
            {/* Icon to represent current theme */}
          </button>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Form Component for adding new agents */}
        <div>
          <AgentForm onSuccess={fetchDistributedData} />{" "}
          {/* After success, fetch updated data */}
        </div>
        {/* CSV Upload Component for uploading agent data via CSV */}
        <div className="flex items-center justify-center p-4">
          <CSVUpload onUploadSuccess={fetchDistributedData} />{" "}
          {/* After upload, fetch updated data */}
        </div>
      </div>

      {/* Section displaying the distributed agent data */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Distributed Lists</h2>
        {/* Show loading spinner while data is being fetched */}
        {loadingDistributed ? (
          <Loader />
        ) : distributedData.length === 0 ? (
          <p>No distributed data yet.</p> // message when no data is available
        ) : (
          // Display the distributed agents in a list
          <DistributedList agents={distributedData} />
        )}
      </div>
    </div>
  );
}
