import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        clearUser();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setIsLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
