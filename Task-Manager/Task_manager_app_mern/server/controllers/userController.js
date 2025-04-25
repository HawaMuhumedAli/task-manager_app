// import { response } from "express";
// import User from "../models/user.js";
// import { createJWT } from "../utils/index.js";
// import Notice from "../models/notification.js";
// import bcrypt from 'bcryptjs';


// // Function to register a new user
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, isAdmin, role, title } = req.body;

//         const userExist = await User.findOne({ email });

//         if (userExist) {
//             return res.status(400).json({
//                 status: false,
//                 message: "User already exists",
//             });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             isAdmin,
//             role,
//             title,
//         });

//         if (user) {
//             if (isAdmin) {
//                 createJWT(res, user._id);
//             }

//             user.password = undefined; // Hide the password in the response

//             res.status(201).json(user);
//         } else {
//             return res.status(400).json({ status: false, message: "Invalid user data" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // // Function to log in a user
// // export const loginUser = async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         console.log("req.body is", req.body);

// //         const user = await User.findOne({ email });
// //         console.log("the user found is", user);
// //         if (!user) {
// //             return res.status(401).json({ status: false, message: "Invalid email or password." });
// //         }

// //         if (!user.isActive) {
// //             return res.status(401).json({
// //                 status: false,
// //                 message: "User account has been deactivated, contact the administrator.",
// //             });
// //         }

// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(401).json({ status: false, message: "Invalid email or password." });
// //         }

// //         // If login successful, create JWT token
// //         createJWT(res, user._id);
// //         user.password = undefined; // Hide the password in the response
// //         res.status(200).json(user);
// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({ status: false, message: error.message });
// //     }
// // };


// // @desc    Login user
// // @route   POST /api/user/login
// // @access  Public
// // export const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     console.log("🔐 Login attempt with:", email);

// //     // Find user by email
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       console.log("❌ User not found");
// //       return res.status(401).json({
// //         status: false,
// //         message: "Invalid email or password.",
// //       });
// //     }

// //     if (!user.isActive) {
// //       console.log("⚠️ User is deactivated");
// //       return res.status(401).json({
// //         status: false,
// //         message: "User account has been deactivated, contact the administrator.",
// //       });
// //     }

// //     // Check password
// //     const isMatch = await bcrypt.compare(password, user.password);

// //     console.log("🧪 Comparing password:");
// //     console.log("Raw:", password);
// //     console.log("Hashed:", user.password);
// //     console.log("Match:", isMatch);

// //     if (!isMatch) {
// //       return res.status(401).json({
// //         status: false,
// //         message: "Invalid email or password.",
// //       });
// //     }

// //     // Create JWT token & set cookie
// //     await createJWT(res, user._id); // your createJWT handles cookie/token

// //     // Hide password before sending response
// //     const { password: _, ...userData } = user.toObject();

// //     console.log("✅ Login successful:", userData.email);

// //     return res.status(200).json({
// //       status: true,
// //       message: "Login successful",
// //       user: userData,
// //     });

// //   } catch (error) {
// //     console.error("🔥 Login error:", error.message);
// //     return res.status(500).json({
// //       status: false,
// //       message: "Server error. Please try again later.",
// //     });
// //   }
// // };
// export const loginUser = async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       console.log("🔐 Login attempt with:", email);
  
//       // Find user by email
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         console.log("❌ User not found");
//         return res.status(401).json({
//           status: false,
//           message: "Invalid email or password.",
//         });
//       }
  
//       if (!user.isActive) {
//         console.log("⚠️ User is deactivated");
//         return res.status(401).json({
//           status: false,
//           message: "User account has been deactivated, contact the administrator.",
//         });
//       }
  
//       // ❌ No bcrypt: check raw password directly
//       // Admin password is fixed: "adminuser"
//       const isMatch = password === 'adminuser';
  
//       console.log("🧪 Comparing password:");
//       console.log("Raw:", password);
//       console.log("Expected:", 'adminuser');
//       console.log("Match:", isMatch);
  
//       if (!isMatch) {
//         return res.status(401).json({
//           status: false,
//           message: "Invalid email or password.",
//         });
//       }
  
//       // Create JWT token & set cookie
//       await createJWT(res, user._id);
  
//       // Hide password before sending response
//       const { password: _, ...userData } = user.toObject();
  
//       console.log("✅ Login successful:", userData.email);
  
//       return res.status(200).json({
//         status: true,
//         message: "Login successful",
//         user: userData,
//       });
  
//     } catch (error) {
//       console.error("🔥 Login error:", error.message);
//       return res.status(500).json({
//         status: false,
//         message: "Server error. Please try again later.",
//       });
//     }
//   };
  

// // Function to log out a user
// export const logoutUser = async (req, res) => {
//     try {
//         res.cookie("token", "", {
//             httpOnly: true,
//             expires: new Date(0),
//         });

//         res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Function to get a list of all team members
// export const getTeamList = async (req, res) => {
//     try {
//         const users = await User.find().select("name title role email isActive");

//         res.status(200).json(users);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Function to get notifications for a user
// export const getNotificationsList = async (req, res) => {
//     try {
//         const { userId } = req.user;

//         const notice = await Notice.find({
//             team: userId,
//             isRead: { $nin: [userId] },
//         }).populate("task", "title");

//         res.status(200).json(notice);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Function to update user profile
// export const updateUserProfile = async (req, res) => {
//     try {
//         const { userId, isAdmin } = req.user;
//         const { _id } = req.body;

//         const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId;

//         const user = await User.findById(id);

//         if (user) {
//             user.name = req.body.name || user.name;
//             user.title = req.body.title || user.title;
//             user.role = req.body.role || user.role;

//             const updatedUser = await user.save();

//             user.password = undefined; // Hide the password in the response

//             res.status(200).json({
//                 status: true,
//                 message: "Profile updated successfully.",
//                 user: updatedUser,
//             });
//         } else {
//             res.status(404).json({ status: false, message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Function to mark notifications as read
// export const markNotificationRead = async (req, res) => {
//     try {
//         const { userId } = req.user;
//         const { isReadType, id } = req.query;

//         if (isReadType === "all") {
//             await Notice.updateMany(
//                 { team: userId, isRead: { $nin: [userId] } },
//                 { $push: { isRead: userId } },
//                 { new: true }
//             );
//         } else {
//             await Notice.findOneAndUpdate(
//                 { _id: id, isRead: { $nin: [userId] } },
//                 { $push: { isRead: userId } },
//                 { new: true }
//             );
//         }

//         res.status(200).json({ status: true, message: "Done" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Function to change user password
// export const changeUserPassword = async (req, res) => {
//     try {
//         const { userId } = req.user;

//         const user = await User.findById(userId);

//         if (user) {
//             // Hash the new password before saving
//             const hashedPassword = await bcrypt.hash(req.body.password, 10);
//             user.password = hashedPassword;

//             await user.save();

//             user.password = undefined; // Hide the password in the response

//             res.status(200).json({
//                 status: true,
//                 message: "Password changed successfully.",
//             });
//         } else {
//             res.status(404).json({ status: false, message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Function to activate or deactivate a user profile
// export const activateUserProfile = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const user = await User.findById(id);

//         if (user) {
//             user.isActive = req.body.isActive; // Update user activation status

//             await user.save();

//             res.status(200).json({
//                 status: true,
//                 message: `User account has been ${
//                     user.isActive ? "activated" : "disabled"
//                 }`,
//             });
//         } else {
//             res.status(404).json({ status: false, message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Function to delete a user profile
// export const deleteUserProfile = async (req, res) => {
//     try {
//         const { id } = req.params;

//         await User.findByIdAndDelete(id);

//         res.status(200).json({
//             status: true,
//             message: "User deleted successfully",
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: error.message });
//     }
// };
import { response } from "express";
import User from "../models/user.js";
import { createJWT } from "../utils/index.js";
import Notice from "../models/notification.js";
import bcrypt from 'bcryptjs';

// // Function to register a new user
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, isAdmin, role, title } = req.body;

//         const userExist = await User.findOne({ email });
//         if (userExist) {
//             return res.status(400).json({ status: false, message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({ name, email, password: hashedPassword, isAdmin, role, title });

//         if (user) {
//             if (isAdmin) {
//                 createJWT(res, user._id);
//             }

//             user.password = undefined;
//             res.status(201).json(user);
//         } else {
//             res.status(400).json({ status: false, message: "Invalid user data" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };




// export const loginUser = async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
  
//       if (!user || password !== 'adminuser') {
//         return res.status(401).json({ status: false, message: "Invalid email or password." });
//       }
  
//       if (!user.isActive) {
//         return res.status(403).json({ status: false, message: "User is deactivated." });
//       }
  
//       createJWT(res, user._id);
  
//       const { password: _, ...userData } = user.toObject();
//       res.status(200).json({ status: true, message: "Login successful", user: userData });
//     } catch (err) {
//       res.status(500).json({ status: false, message: err.message });
//     }
//   }

// export const logoutUser = async (req, res) => {
//     try {
//         res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
//         res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// export const getTeamList = async (req, res) => {
//     try {
//         const users = await User.find().select("name title role email isActive");
//         res.status(200).json(users);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const getNotificationsList = async (req, res) => {
//     try {
//       if (!req.user?._id) {
//         return res.status(401).json({ status: false, message: "Unauthorized: No user info" });
//       }
  
//       const userId = req.user._id;
  
//       const notice = await Notice.find({
//         team: userId,
//         isRead: { $nin: [userId] },
//       }).populate("task", "title");
  
//       res.status(200).json(notice);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ status: false, message: error.message });
//     }
//   };
  
// export const updateUserProfile = async (req, res) => {
//     try {
//         if (!req.user?.userId) {
//             return res.status(401).json({ status: false, message: "Unauthorized: No user info" });
//         }

//         const { userId, isAdmin } = req.user;
//         const { _id } = req.body;
//         const id = isAdmin && userId !== _id ? _id : userId;

//         const user = await User.findById(id);

//         if (user) {
//             user.name = req.body.name || user.name;
//             user.title = req.body.title || user.title;
//             user.role = req.body.role || user.role;
//             const updatedUser = await user.save();
//             updatedUser.password = undefined;

//             res.status(200).json({ status: true, message: "Profile updated successfully.", user: updatedUser });
//         } else {
//             res.status(404).json({ status: false, message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// export const markNotificationRead = async (req, res) => {
//     try {
//         if (!req.user?.userId) {
//             return res.status(401).json({ status: false, message: "Unauthorized" });
//         }

//         const { isReadType, id } = req.query;

//         if (isReadType === "all") {
//             await Notice.updateMany(
//                 { team: req.user.userId, isRead: { $nin: [req.user.userId] } },
//                 { $push: { isRead: req.user.userId } }
//             );
//         } else {
//             await Notice.findOneAndUpdate(
//                 { _id: id, isRead: { $nin: [req.user.userId] } },
//                 { $push: { isRead: req.user.userId } }
//             );
//         }

//         res.status(200).json({ status: true, message: "Done" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// export const changeUserPassword = async (req, res) => {
//     try {
//         if (!req.user?.userId) {
//             return res.status(401).json({ status: false, message: "Unauthorized" });
//         }

//         const user = await User.findById(req.user.userId);

//         if (user) {
//             user.password = await bcrypt.hash(req.body.password, 10);
//             await user.save();
//             user.password = undefined;

//             res.status(200).json({ status: true, message: "Password changed successfully." });
//         } else {
//             res.status(404).json({ status: false, message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// export const activateUserProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);

//         if (user) {
//             user.isActive = req.body.isActive;
//             await user.save();
//             res.status(200).json({
//                 status: true,
//                 message: `User account has been ${user.isActive ? "activated" : "disabled"}`,
//             });
//         } else {
//             res.status(404).json({ status: false, message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// export const deleteUserProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await User.findByIdAndDelete(id);
//         res.status(200).json({ status: true, message: "User deleted successfully" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };
// User Controller with all fixed references
// import bcrypt from "bcryptjs";
// import User from "../models/user.js";
// import Notice from "../models/notification.js";
// import { createJWT } from "../utils/jwtHelper.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isAdmin, role, title });

    if (user) {
      if (isAdmin) createJWT(res, user._id);
      user.password = undefined;
      res.status(201).json(user);
    } else {
      res.status(400).json({ status: false, message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || password !== 'adminuser') {
      return res.status(401).json({ status: false, message: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(403).json({ status: false, message: "User is deactivated." });
    }

    createJWT(res, user._id);
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ status: true, message: "Login successful", user: userData });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getTeamList = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getNotificationsList = async (req, res) => {
  try {
    if (!req.user?._id) return res.status(401).json({ status: false, message: "Unauthorized" });

    const userId = req.user._id;
    const notice = await Notice.find({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(200).json(notice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    if (!req.user?._id) return res.status(401).json({ status: false, message: "Unauthorized" });

    const { _id: userId, isAdmin } = req.user;
    const { _id } = req.body;
    const id = isAdmin && userId !== _id ? _id : userId;

    const user = await User.findById(id);

    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).json({ status: true, message: "Profile updated successfully.", user: updatedUser });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    if (!req.user?._id) return res.status(401).json({ status: false, message: "Unauthorized" });

    const userId = req.user._id;
    const { isReadType, id } = req.query;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } }
      );
    }

    res.status(200).json({ status: true, message: "Done" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    if (!req.user?._id) return res.status(401).json({ status: false, message: "Unauthorized" });

    const user = await User.findById(req.user._id);

    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      await user.save();
      user.password = undefined;
      res.status(200).json({ status: true, message: "Password changed successfully." });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// export const activateUserProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (user) {
//       user.isActive = req.body.isActive;
//       await user.save();
//       res.status(200).json({
//         status: true,
//         message: `User account has been ${user.isActive ? "activated" : "disabled"}`,
//       });
//     } else {
//       res.status(404).json({ status: false, message: "User not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: false, message: error.message });
//   }
// };
export const activateUserProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (user) {
        user.isActive = req.body.isActive;
        await user.save();
        res.status(200).json({
          status: true,
          message: `User account has been ${user.isActive ? "activated" : "disabled"}`,
        });
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.message });
    }
  };
  
export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};
