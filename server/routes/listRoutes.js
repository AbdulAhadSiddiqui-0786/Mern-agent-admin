import express from "express";
import {
  upload, // Multer middleware
  uploadAndDistribute,
  getDistributedLists,
} from "../controllers/listController.js";

const router = express.Router();

// POST /api/lists/upload upload file,-> then distribute it
router.post("/upload", upload, uploadAndDistribute);

// GET /api/lists/distributed->fetch all distributed lists
router.get("/distributed", getDistributedLists);

export default router;
