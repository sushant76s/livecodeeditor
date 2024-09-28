import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const SignIn = ({ handleSignIn }) => {
  const navigate = useNavigate();

  return (
    <AuthForm
      title="Sign In to LiveCodeEditor"
      fields={[
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
      ]}
      onSubmit={handleSignIn}
      redirectText="If you are a new user create"
      redirectAction={() => navigate("/auth?type=signup")}
      redirectLinkText="account"
      buttonText="Sign In"
    />
  );
};

export default SignIn;
