import jwt from "jsonwebtoken";

// Middleware to protect routes using JWT authentication
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // Attach user info to request
      next(); // Proceed to the protected route
    } catch (error) {
      res.status(401).json({ msg: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ msg: "No token, authorization denied" });
  }
};
