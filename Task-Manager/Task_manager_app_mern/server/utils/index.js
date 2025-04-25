// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// // Function to establish a connection to the MongoDB database
// export const dbConnection = async () => {
//   try {
//     // Connect to the MongoDB database using the connection URI from environment variables
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("DB connection established");
//   } catch (error) {
//     console.error("DB Error:", error.message); // Log any errors that occur during connection
//   }
// };

// // Function to create a JWT token and set it in a cookie
// export const createJWT = (res, userId) => {
//   // Create a JWT token with the user ID and secret from environment variables
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

//   // Set the JWT token in a cookie with specific options
//   res.cookie("token", token, {
//     httpOnly: true, // Make the cookie HTTP-only for security
//     secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
//     sameSite: "strict", // Set the SameSite attribute to strict
//     maxAge: 1 * 24 * 60 * 60 * 1000, // Set the cookie to expire in 1 day
//   });
// };
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Connects to MongoDB using MONGODB_URI from environment variables.
 */
export const dbConnection = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process on DB connection failure
  }
};

/**
 * Creates a JWT token and sends it via an HTTP-only cookie.
 * @param {Response} res - Express response object
 * @param {String} userId - MongoDB user ID
 */
export const createJWT = (res, userId) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // secure only in prod
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};
