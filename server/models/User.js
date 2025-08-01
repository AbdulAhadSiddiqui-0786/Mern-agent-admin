import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // No two users can have the same email
    trim: true, // Remove extra spaces
    lowercase: true, // Convert email to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for basic security
  },
});

export default mongoose.model("User", userSchema);
