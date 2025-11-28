import axios from "axios";
import { toast } from "sonner";

// set the base backend URL for all requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// set cookies in every request
axios.defaults.withCredentials = true;

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    // Axios will automatically include the cookies (like access_token, refresh_token) with every request.
    return config;
  },
  (error) => Promise.reject(error)
);

// dedicated axios instance for refreshing access token (see the reason where its being used)
const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true
})

// Response Interceptor
axios.interceptors.response.use(
  (response) => response, // positive response handling -> return response as it is without doing anything
  async (error) => { // errored response handling
    const originalRequest = error.config

    // status 401 is invalid/expired token, this condition handles token expiration and its refreshing
    if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
      try {
        await refreshAxios.post("/auth/refresh-token");
        // for refresh-token api, use dedicated axios instance that has no interceptors
        // using the same axios instance would trigger this interceptor again creating recursion which are more prone to bugs if not handeled properly
        // for example: if the refresh-token api returns error this interceptor would run again creating nested interceptor(recursion), only after its full execution it would move to catch block due to the recursive nature
        return axios(originalRequest);
      } catch (refreshAccessTokenError) { // Handle errors (e.g., refresh token expired or invalid)        
        if (window.location.pathname !== '/login') {
          toast.error(
            "Your session has expired. Please login again to continue. Redirecting to login page...",
            { duration: 5000 }
          )
          setTimeout(() => {
            window.location.href = '/login';
          }, 5000)
        }
        return Promise.reject(refreshAccessTokenError);
      }
    }

    // propagate other type of errors without doing anything
    return Promise.reject(error);
  }
);

export default axios;
