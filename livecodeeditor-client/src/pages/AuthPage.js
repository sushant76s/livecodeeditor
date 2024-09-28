import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import { userSignIn, userSignUp } from "../services/UserAPI";
import toast from "react-hot-toast";
import LoginPage from "../components/user-auth/SignIn";
import SignUpPage from "../components/user-auth/SignUp";
import MainHeader from "../components/header/MainHeader";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const type = searchParams.get("type");

  // If "type" is missing, redirect to the default (e.g., signin)
  useEffect(() => {
    if (!type) {
      navigate("/auth?type=signin");
    }
  }, [type, navigate]);

  // SignIn function
  const handleSignIn = async ({ email, password }) => {
    try {
      const response = await userSignIn({ email, password });
      if (!response) throw new Error("Network response was not ok");

      login(response.token);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "There was an error with the login.");
      console.error(error);
    }
  };

  // SignUp function
  const handleSignUp = async ({ fullName, email, password, passwordAgain }) => {
    if (password !== passwordAgain) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await userSignUp({ fullName, email, password });
      if (!response) throw new Error("Network response was not ok");

      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("There was an error with the registration.");
      console.error(error);
    }
  };

  return (
    <div>
      <MainHeader />
      {type === "signin" && <LoginPage handleSignIn={handleSignIn} />}
      {type === "signup" && <SignUpPage handleSignUp={handleSignUp} />}
    </div>
  );
};

export default AuthPage;
