import { createContext, useState, useContext, useEffect } from 'react';
import { checkAuthStateUrl, logoutUrl } from '@/config/urls';
import axios from '@/axiosConfig';
import { toast } from 'sonner';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const res = await axios.get(checkAuthStateUrl);

        if (res.data.success) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const logout = async () => {
    try {
      const result = await axios.post(logoutUrl);
      if (result.data.success) {
        toast.success("Successfully logged out");
        setIsLoggedIn(false);
      }
    } catch (err) {
      toast.error("Failed to logout");
      console.error("Logout error:", err);
    }
  };

  return (
    <LoginContext.Provider value={{ loading, isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
