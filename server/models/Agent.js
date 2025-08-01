import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: String, // Agent's name
  email: String, 
  mobile: String, 
  password: String, 
});

export default mongoose.model("Agent", agentSchema);
