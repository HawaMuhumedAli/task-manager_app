// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from './user.js'; 

// async function createAdminUser() {
//   try {
//       const MONGODB_URI = 'mongodb+srv://luulh32:NBXiz8db0U4nQS68@cluster0.1wsqian.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//       await mongoose.connect(MONGODB_URI, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//       });

//       const adminUser = await User.findOne({ email: 'admin@gmail.com' });

//       if (adminUser) {
//           console.log('Admin user already exists.');
//           mongoose.connection.close();
//           return;
//       }

//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash('adminuser', salt);

//       const newAdminUser = new User({
//           name: 'Admin',
//           email: 'admin@gmail.com',
//           password: hashedPassword,
//           isAdmin: true,
//           role: 'Admin',
//           title: 'Admin',
//           tasks: [],
//       });

//       await newAdminUser.save();

//       console.log('Admin user created successfully.');

//       const token = jwt.sign(
//           { userId: newAdminUser._id, email: newAdminUser.email, isAdmin: newAdminUser.isAdmin },
//           'your-secret-key', // Replace with process.env.JWT_SECRET if you're using .env
//           { expiresIn: '1h' }
//       );

//       console.log('JWT Token:', token);

//       mongoose.connection.close();
//   } catch (error) {
//       console.error('Error creating admin user:', error.message);
//   }
// }

// createAdminUser.js
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from './user.js'; // Adjust path if needed

// dotenv.config(); // ✅ Load .env variables

// async function createAdminUser() {
//   try {
//     const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://luulh32:NBXiz8db0U4nQS68@cluster0.1wsqian.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//     await mongoose.connect(MONGODB_URI, {
//       serverSelectionTimeoutMS: 10000,
//     });

//     // 🚫 Remove old admin if exists
//     await User.deleteOne({ email: 'admin@gmail.com' });

//     // ✅ Pre-verified bcrypt hash for password: "adminuser"
//     const hashedPassword = '$2a$10$hrRCB3JoUN8qjrzOQoAXduKzN9OP5wYrXyt8RE9nF/Vm0SV06Q55u';

//     const newAdmin = new User({
//       name: 'Admin',
//       email: 'admin@gmail.com',
//       password: hashedPassword,
//       isAdmin: true,
//       isActive: true,
//       title: 'Admin',
//       role: 'Admin',
//       tasks: [],
//     });

//     await newAdmin.save();

//     console.log('\n✅ Admin user created successfully!');
//     console.log('🔐 Email:    admin@gmail.com');
//     console.log('🔐 Password: adminuser\n');

//     await mongoose.connection.close();
//   } catch (err) {
//     console.error('❌ Failed to create admin user:', err.message);
//     process.exit(1);
//   }
// }
// // createAdminUser.js
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from './user.js'; // adjust if needed

// dotenv.config();

// async function createAdminUser() {
//   try {
//     const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://luulh32:NBXiz8db0U4nQS68@cluster0.1wsqian.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//     console.log('🔄 Connecting to MongoDB...');
//     await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
//     console.log('✅ MongoDB connected');

//     // 🚨 Wipe ALL users to reset clean
//     await User.deleteMany({});
//     console.log('🧹 All users deleted');

//     // ✅ Verified hash for password: "adminuser"
//     const hashedPassword = '$2a$10$hrRCB3JoUN8qjrzOQoAXduKzN9OP5wYrXyt8RE9nF/Vm0SV06Q55u';

//     const newAdmin = new User({
//       name: 'Admin',
//       email: 'admin@gmail.com',
//       password: hashedPassword,
//       isAdmin: true,
//       isActive: true,
//       title: 'Admin',
//       role: 'Admin',
//       tasks: [],
//     });

//     await newAdmin.save();
//     console.log('✅ Admin user created');

//     // ✅ Check inserted user
//     const check = await User.findOne({ email: 'admin@gmail.com' });
//     if (check) {
//       console.log('🧪 Password in DB:', check.password);
//       console.log('✅ Admin ready! Login with admin@gmail.com / adminuser');
//     } else {
//       console.log('❌ Admin not found after save!');
//     }

//     await mongoose.connection.close();
//     console.log('🔌 MongoDB connection closed');
//   } catch (err) {
//     console.error('❌ Error creating admin:', err.message);
//     process.exit(1);
//   }
// }
// createAdminUser();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './user.js'; // Adjust path if needed

dotenv.config();

async function createAdminUser() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://luulh32:NBXiz8db0U4nQS68@cluster0.1wsqian.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ MongoDB connected');

    // 🔥 Remove all existing users
    await User.deleteMany({});
    console.log('🧹 All users deleted');

    // 🚀 Use Pre-generated bcrypt hash for "adminuser" (NO bcrypt usage here)
    const hashedPassword = '$2a$10$hrRCB3JoUN8qjrzOQoAXduKzN9OP5wYrXyt8RE9nF/Vm0SV06Q55u';

    const newAdmin = new User({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword, // Already hashed manually
      isAdmin: true,
      isActive: true,
      title: 'Admin',
      role: 'Admin',
      tasks: [],
    });

    await newAdmin.save();
    console.log('✅ Admin user created');

    const check = await User.findOne({ email: 'admin@gmail.com' });
    if (check) {
      console.log('🧪 Password in DB:', check.password);
    } else {
      console.log('❌ Admin not found after save!');
    }

    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
}

createAdminUser(); 