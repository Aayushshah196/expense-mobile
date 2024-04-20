import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a context for authentication
export const AuthContext = createContext();

// Provider component for managing authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Function to store user data in async storage
  const storeUserData = async (userData) => {
    try {
      const userDataString = JSON.stringify(userData);
      await AsyncStorage.setItem("currentUser", userDataString);
    } catch (error) {
      console.error("Failed to store user data:", error);
    }
  };

  // Function to retrieve user data from async storage
  const retrieveUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userDataString = await AsyncStorage.getItem("currentUser");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log("Initial user data:", userData);
        setCurrentUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
    }
  };

  // Function to remove user data from async storage
  const removeUserData = async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Failed to remove user data:", error);
    }
  };

  // Function to perform logout
  const performLogout = async () => {
    try {
      // Reset authentication state and current user data
      setIsAuthenticated(false);
      setCurrentUser(null);

      // Clear any stored authentication data
      await AsyncStorage.removeItem("authToken"); // Example for removing the authentication token

      // Optionally, clear other storage related to the current user or authentication
      await AsyncStorage.removeItem("currentUser");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(
        "Error",
        "An error occurred during logout. Please try again."
      );
      return false;
    }
  };

  // Use effect to retrieve user data when the component mounts
  useEffect(() => {
    retrieveUserData();
  }, []);

  // Export authentication state and functions
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated: (state) => {
          setIsAuthenticated(state);
          if (!state) {
            removeUserData();
          }
        },
        currentUser,
        setCurrentUser: (userData) => {
          setCurrentUser(userData);
          if (userData) {
            storeUserData(userData);
          }
        },
        performLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
