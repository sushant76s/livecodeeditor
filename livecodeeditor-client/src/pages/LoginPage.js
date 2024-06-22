import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import codeImage from "../assets/images/code-image.png";

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const redirectToSignUp = (e) => {
    navigate("/signup");
  };

  const validateUser = async () => {
    if (!userEmail || !userPassword) {
      toast.error("Email and password is required!");
      return;
    }
    const loginData = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      // Handle the response data as needed, e.g., store token, user info, etc.
      // localStorage.setItem('token', data.token);

      // console.log("data: ", data.uid);
      setCookie("uid", data?.uid, 7);

      toast.success("Logged in successfully!");
      navigate("/"); // or navigate to a different page like navigate("/dashboard")
    } catch (error) {
      toast.error(error.message || "There was an error with the login.");
      console.error("There was an error!", error);
    }
    navigate("/");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      validateUser();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <img className="mx-auto w-50 h-25" src={codeImage} alt="logo" />
        <h4 className="text-lg font-semibold text-center mt-4 mb-2">
          Login to LiveCodeEditor
        </h4>
        <div className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            onKeyUp={handleInputEnter}
          />
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            onKeyUp={handleInputEnter}
          />
          <button
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-blue-600"
            onClick={validateUser}
          >
            Login
          </button>
          <span className="block text-center text-gray-600">
            If you are a new user create &nbsp;
            <a
              onClick={redirectToSignUp}
              href=""
              className="text-blue-500 hover:underline"
            >
              account
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
