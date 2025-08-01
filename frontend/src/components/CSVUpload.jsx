import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api"; // Pre-configured Axios instance with base URL and auth

export default function CSVUpload() {
  const [file, setFile] = useState(null); // State to store selected file

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return toast.error("No file selected");

    const allowedExtensions = ["csv", "xlsx", "xls"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return toast.error("Only CSV, XLSX, and XLS files are allowed.");
    }

    const formData = new FormData();
    formData.append("file", file); // Append file to FormData for upload

    try {
      const res = await api.post("/lists/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        toast.success("File uploaded and distributed successfully.");
        setFile(null);
        window.location.reload(); // Reload to refresh UI after upload
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.msg || "Error uploading file";

      if (errorMsg.includes("agents")) {
        toast.error("Please add at least 5 agents to upload files.");
      } else if (errorMsg.includes("Missing required fields")) {
        toast.error("The uploaded file is missing required columns.");
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Upload CSV/Excel File
      </h2>

      <div className="flex flex-col gap-4">
        <label className="cursor-pointer flex items-center justify-center gap-3 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {file ? file.name : "Choose File"}

          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Upload File
        </button>
      </div>
    </form>
  );
}
