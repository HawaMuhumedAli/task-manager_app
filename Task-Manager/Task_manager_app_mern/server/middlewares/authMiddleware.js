// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// // Middleware to protect routes and verify the user is authenticated
// const protectRoute = async (req, res, next) => {
//   try {
//     // Retrieve the token from cookies
//     const token = req.cookies.token;

//     // If no token is found, return an unauthorized error
//     if (!token) {
//       return res.status(401).json({ status: false, message: "Not authorized, no token" });
//     }

//     // Verify the token and decode the payload
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find the user by the ID in the token payload and exclude the password field
//     req.user = await User.findById(decoded.userId).select("-password");

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     // If token verification fails, return an unauthorized error
//     res.status(401).json({ status: false, message: "Not authorized, token failed" });
//   }
// };

// // Middleware to check if the user is an admin
// const isAdminRoute = (req, res, next) => {
//   // Check if the user exists and has an admin role
//   if (req.user && req.user.isAdmin) {
//     // Proceed to the next middleware or route handler
//     next();
//   } else {
//     // If the user is not an admin, return an unauthorized error
//     return res.status(401).json({
//       status: false,
//       message: "Not authorized as admin. Try logging in as admin.",
//     });
//   }
// };

// export { protectRoute, isAdminRoute };
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// export const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log("🍪 Token from cookie:", token);

//     if (!token) {
//       return res.status(401).json({ status: false, message: "Not authorized, no token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({ status: false, message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ status: false, message: "Not authorized, token failed" });
//   }
// };



export const protectRoute = async (req, res, next) => {
  try {
    // 1. Log incoming cookies
    console.log("🧪 All cookies:", req.cookies);

    // 2. Get token from cookies
    const token = req.cookies.token;
    console.log("🔐 Received Token:", token);

    if (!token) {
      console.log("⛔ No token found in cookies");
      return res.status(401).json({ status: false, message: "Not authorized, no token provided" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded);

    // 4. Find user by decoded userId
    const user = await User.findById(decoded.userId).select("-password");
    console.log("👤 Retrieved User from DB:", user);

    if (!user) {
      console.log(`❌ User not found for ID: ${decoded.userId}`);
      return res.status(401).json({ status: false, message: "User not found" });
    }

    if (!user.isActive) {
      console.log(`🚫 User is deactivated: ${decoded.userId}`);
      return res.status(401).json({ status: false, message: "User account deactivated" });
    }

    // 5. Attach user to request
    req.user = user;
    console.log(`🎯 User authenticated: ${user.email || user._id}`);

    next(); // Move to the protected controller

  } catch (error) {
    console.error("❌ protectRoute Error:", error.message);
    res.status(401).json({ status: false, message: "Not authorized, token failed" });
  }
};



export const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ status: false, message: "Not authorized as admin" });
  }
};
