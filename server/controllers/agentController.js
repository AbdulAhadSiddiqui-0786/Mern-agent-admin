import Agent from "../models/Agent.js"; // Agent model
import bcrypt from "bcryptjs"; // For password hashing

// Create a new agent
export const addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body; // Get data from request

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const agent = new Agent({ name, email, mobile, password: hashedPassword }); // Create agent
    await agent.save(); // Save to DB

    res.status(201).json(agent); // Respond with created agent
  } catch (err) {
    console.error("Error creating agent:", err);
    res.status(500).json({ msg: "Failed to create agent", error: err.message });
  }
};

// Get all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find(); // Fetch all agents
    res.json(agents); // Send response
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch agents" });
  }
};

// Delete an agent by ID
export const deleteAgent = async (req, res) => {
  const { id } = req.params; // Get ID from URL

  try {
    const agent = await Agent.findByIdAndDelete(id); // Delete agent
    if (!agent) return res.status(404).json({ msg: "Agent not found" });

    res.json({ msg: "Agent deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete agent" });
  }
};
