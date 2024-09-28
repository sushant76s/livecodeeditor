import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    } else {
      createGuestSession();
    }
  }, []);

  const createGuestSession = () => {
    // Generate a temp token call api or implement the temp token generation logic here
    // const guestToken = "temp-token";
    // setAuthToken(guestToken);
    setIsGuest(true);
    // localStorage.setItem("token", guestToken);
  };

  const login = (token) => {
    setAuthToken(token);
    setIsGuest(false);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken(null);
    setIsGuest(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authToken, isGuest, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
