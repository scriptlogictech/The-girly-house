import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  login as loginService,
  register as registerService,
  verifyPhoneOtp,
  getProfile,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ================= Fetch Profile =================

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data.user);
      setIsAuthenticated(true);

      return data.user;
    } catch (error) {
      console.error(error);

      logout();
      return null;
    }
  };

  // ================= Login =================

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);

      localStorage.setItem("token", data.token);

      const loggedInUser = await fetchProfile();

      toast.success(data.message || "Login Successful");

      return {
        ...data,
        user: loggedInUser,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );

      throw error;
    }
  };

  // ================= Register =================

  const register = async (payload) => {
    try {
      const data = await registerService(payload);

      toast.success(
        data.message ||
          "Registration Successful. Please verify your phone number."
      );

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );

      throw error;
    }
  };

  // ================= Verify OTP =================

  const verifyOtp = async (payload) => {
    try {
      const data = await verifyPhoneOtp(payload);

      localStorage.setItem("token", data.token);

      const loggedInUser = await fetchProfile();

      toast.success(
        data.message || "Phone Verified Successfully"
      );

      return {
        ...data,
        user: loggedInUser,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "OTP Verification Failed"
      );

      throw error;
    }
  };

  // ================= Logout =================

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setIsAuthenticated(false);
  };

  // ================= Auto Login =================

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      await fetchProfile();

      setLoading(false);
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,

        login,
        register,
        verifyOtp,
        logout,
        fetchProfile,

        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);