import User from "../models/User.js"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 

export const login = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) return res.status(401).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    res.json({ token }); // Send token back to client
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
