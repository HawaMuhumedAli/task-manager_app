// import React, { useState, useEffect } from "react"; // Import useState and useEffect
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Textbox from "../components/Textbox";
// import Button from "../components/Button";
// import { useSelector, useDispatch } from "react-redux";
// import { useLoginMutation } from "../redux/slices/api/authApiSlice";
// import { toast } from "sonner"; // Assuming this is for notifications

// import { setCredentials } from "../redux/slices/authSlice";
// import Loading from "../components/Loader";

// const Login = () => {
//     const [error, setError] = useState(''); // Initialize state using useState
//     const { user } = useSelector((state) => state.auth);
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [login, { isLoading }] = useLoginMutation();

//     const handleLogin = async () => {
//         const credentials = { email: 'admin@gmail.com', password: 'adminuser' };

//         try {
//             const response = await fetch('http://localhost:5000/api/user/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(credentials),
//             });

//             if (!response.ok) {
//                 // Handle non-200 status code
//                 throw new Error('Login failed');
//             }

//             // Successful login logic
//             console.log('Login successful');
//         } catch (error) {
//             // Handle network errors or bad responses
//             console.error('Login error:', error.message);
//             setError('Login failed. Please check your credentials.');
//         }
//     };


//     const submitHandler = async (data) => {
//         try {
//           // Log the data being sent for debugging
//           console.log('Login data:', data);
      
//           // Ensure data contains email and password
//           if (!data.email || !data.password) {
//             throw new Error('Email and password are required.');
//           }
      
//           // Make the login request
//           const result = await login(data).unwrap();
//            console.log("result" , result)
//           // Dispatch the result to set the credentials
//           dispatch(setCredentials(result));
      
//           // Navigate to the dashboard
//           navigate("/dashboard");
      
//         } catch (error) {
//           // Log the error for debugging
//           console.error('Login error:', error);
      
//           // Check for specific error messages from the backend
//           if (error?.data?.message) {
//             toast.error(error.data.message);
//           } else if (error.message) {
//             toast.error(error.message);
//           } else {
//             toast.error("Invalid email or password.");
//           }
//         }
//       };

//     useEffect(() => {
//         if (user) {
//             navigate("/dashboard");
//         }
//     }, [user, navigate]);

//     return (
//         <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
//             <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
//                 {/* Left side */}
//                 <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
//                     <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
//                         <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
//                             Manage all your tasks in one place!
//                         </span>
//                         <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
//                             <span>Taskme</span>
//                             <span>Task Manager</span>
//                         </p>
//                         <div className="cell">
//                             <div className="circle rotate-in-up-left"></div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right side */}
//                 <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
//                     <form
//                         onSubmit={handleSubmit(submitHandler)}
//                         className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
//                     >
//                         <div className="">
//                             <p className="text-blue-600 text-3xl font-bold text-center">
//                                 Welcome back!
//                             </p>
//                             <p className="text-center text-base text-gray-700">
//                                 Keep all your credentials safe.
//                             </p>
//                         </div>

//                         <div className="flex flex-col gap-y-5">
//                             <Textbox
//                                 placeholder="email@example.com"
//                                 type="email"
//                                 name="email"
//                                 label="Email Address"
//                                 className="w-full rounded-full"
//                                 register={register("email", {
//                                     required: "Email Address is required!",
//                                 })}
//                                 error={errors.email ? errors.email.message : ""}
//                                 autocomplete="email" // Autocomplete attribute
//                             />
//                             <Textbox
//                                 placeholder="your password"
//                                 type="password"
//                                 name="password"
//                                 label="Password"
//                                 className="w-full rounded-full"
//                                 register={register("password", {
//                                     required: "Password is required!",
//                                 })}
//                                 error={
//                                     errors.password
//                                         ? errors.password.message
//                                         : ""
//                                 }
//                                 autocomplete="current-password" // Autocomplete attribute
//                             />

//                             <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
//                                 Forgot Password?
//                             </span>

//                             {isLoading ? (
//                                 <Loading />
//                             ) : (
//                                 <Button
//                                     type="submit"
//                                     label="Submit"
//                                     className="w-full h-10 bg-blue-700 text-white rounded-full"
//                                 />
//                             )}
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Loading from "../components/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Handle form submit
  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to access your dashboard
        </p>

        {/* Email Field */}
        <Textbox
          placeholder="you@example.com"
          type="email"
          name="email"
          label="Email Address"
          register={register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />

        {/* Password Field */}
        <Textbox
          placeholder="••••••••"
          type="password"
          name="password"
          label="Password"
          register={register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        {/* Forgot Password */}
        <p className="text-sm text-right text-blue-600 hover:underline cursor-pointer mt-2 mb-4">
          Forgot Password?
        </p>

        {/* Submit Button */}
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            type="submit"
            label="Login"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white mt-4"
          />
        )}
      </form>
    </div>
  );
};

export default Login;
