import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const SignUp = ({ handleSignUp }) => {
  const navigate = useNavigate();

  return (
    <AuthForm
      title="Sign Up to LiveCodeEditor"
      fields={[
        { name: "fullName", label: "Full Name", autoComplete: "name" },
        {
          name: "email",
          label: "Email Address",
          autoComplete: "email",
          type: "email",
        },
        {
          name: "password",
          label: "Password",
          autoComplete: "current-password",
          type: "password",
        },
        { name: "passwordAgain", label: "Re-enter Password", type: "password" },
      ]}
      onSubmit={handleSignUp}
      redirectText="If you are already a user, please"
      redirectAction={() => navigate("/auth?type=signin")}
      redirectLinkText="login"
      buttonText="Sign Up"
    />
  );
};

export default SignUp;
