import multer from "multer";
import XLSX from "xlsx";
import DistributedList from "../models/DistributedList.js";
import Agent from "../models/Agent.js";
import path from "path";

// Multer config for file upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    if ([".csv", ".xlsx", ".xls"].includes(ext)) cb(null, true);
    else cb(new Error("Only CSV, XLSX, and XLS files are allowed"), false);
  },
}).single("file");

// Handle file upload and distribute data to agents
export const uploadAndDistribute = async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const requiredFields = ["firstName", "phone", "notes"];
    const missingFields = requiredFields.filter(
      (field) => !Object.keys(rows[0] || {}).includes(field)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const agents = await Agent.find();
    if (agents.length < 5) {
      return res.status(400).json({ msg: "At least 5 agents are required" });
    }

    const chunkSize = Math.floor(rows.length / 5);
    const remainder = rows.length % 5;

    for (let i = 0; i < 5; i++) {
      const extra = i < remainder ? 1 : 0;
      const chunk = rows.splice(0, chunkSize + extra).map((item) => ({
        firstName: item.firstName || "",
        phone: item.phone || "",
        notes: item.notes || "",
      }));

      await DistributedList.create({
        agentId: agents[i]._id,
        data: chunk,
      });
    }

    res.json({ msg: "List distributed successfully!" });
  } catch (error) {
    console.error("Distribution failed:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// Fetch all distributed lists
export const getDistributedLists = async (req, res) => {
  try {
    const lists = await DistributedList.find().populate(
      "agentId",
      "name email"
    );
    res.json(lists);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to fetch lists", error: error.message });
  }
};
