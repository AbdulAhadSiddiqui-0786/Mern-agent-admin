import express from "express";
import {
  addAgent,
  getAllAgents,
  deleteAgent,
} from "../controllers/agentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a new agent (protected)
router.post("/", protect, addAgent);

// Get all agents (protected)
router.get("/", protect, getAllAgents);

// Delete agent by ID (protected)
router.delete("/:id", protect, deleteAgent);

export default router;
