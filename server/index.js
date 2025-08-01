import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import listRoutes from "./routes/listRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON data
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/lists", listRoutes);

const PORT = process.env.PORT || 5000;

// Connect to database and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
