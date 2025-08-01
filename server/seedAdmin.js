import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // Adjust path as per your project structure

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mern_test";

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin user:", err);
    process.exit(1);
  }
};

seedAdmin();
