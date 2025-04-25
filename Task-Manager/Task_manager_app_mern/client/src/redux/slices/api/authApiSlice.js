// // Import the apiSlice created using Redux Toolkit
// import { apiSlice } from "../apiSlice"

// // Define the base URL for authentication-related API endpoints
// const AUTH_URL = "/user"
// console.log(AUTH_URL)

// // Inject authentication-related endpoints into the apiSlice
// export const authApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         // Define the login mutation
//         login: builder.mutation({
//             // Configure the query for the login mutation
//             query: (data) => ({
//                 // Set the URL for the login endpoint
//                 url: `${AUTH_URL}/login`,
//                 // Set the HTTP method to POST
//                 method: "POST",
//                 // Set the request body to the provided data
//                 body: data,
//                 // Include credentials (such as cookies) in the request
//                 credentials: "include",
//             }),
//         }),

//         // Define the register mutation
//         register: builder.mutation({
//             // Configure the query for the register mutation
//             query: (data) => ({
//                 // Set the URL for the register endpoint
//                 url: `${AUTH_URL}/register`,
//                 // Set the HTTP method to POST
//                 method: "POST",
//                 // Set the request body to the provided data
//                 body: data,
//                 // Include credentials (such as cookies) in the request
//                 credentials: "include",
//             }),
//         }),

//         // Define the logout mutation
//         logout: builder.mutation({
//             // Configure the query for the logout mutation
//             query: (data) => ({
//                 // Set the URL for the logout endpoint
//                 url: `${AUTH_URL}/logout`,
//                 // Set the HTTP method to POST
//                 method: "POST",
//                 // Include credentials (such as cookies) in the request
//                 credentials: "include",
//             }),
//         }),
//     }),
// })

// // Export hooks for the login, register, and logout mutations
// export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice
// redux/slices/api/authApiSlice.js
// src/redux/slices/api/authApiSlice.js
import { apiSlice } from "../apiSlice"; // ✅ Correct since both are in the same folder


const AUTH_URL = "/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;
