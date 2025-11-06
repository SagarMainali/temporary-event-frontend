// src/axiosConfig.js
import axios from "axios";

// // Set the base URL for all requests (update this to your backend URL)
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// Enable sending cookies with each request (important for authentication)
axios.defaults.withCredentials = true;

// Request Interceptor: Automatically attach access token (via cookies)
axios.interceptors.request.use(
  (config) => {
    // Axios will automatically include the cookies (like access_token, refresh_token) with every request.
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If a 401 Unauthorized error is returned, it might be because the access token expired
    if (error.response && error.response.status === 401) {
      // Try to refresh the access token using the refresh token
      try {
        const refreshResponse = await axios.post("/auth/refresh-token");

        // If the refresh was successful, retry the original request
        if (refreshResponse.data.success) {
          // Retry the original request with the new access token (from the cookies)
          const originalRequest = error.config;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Handle errors (e.g., refresh token expired or invalid)
        console.error("Refresh token error", refreshError);
        // Optionally, redirect the user to the login page
      }
    }

    // If it's not a 401 error, just propagate the original error
    return Promise.reject(error);
  }
);

export default axios; // Export the configured Axios instance
