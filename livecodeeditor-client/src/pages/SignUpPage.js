import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import codeImage from "../assets/images/code-image.png";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordAgain, setUserPasswordAgain] = useState("");

  const redirectToLogin = (e) => {
    navigate("/login");
  };

  const validateUser = () => {
    if (!userEmail || !userPassword || !user || !userPasswordAgain) {
      toast.error("All the fields are required!");
      return;
    }
    if (userPassword !== userPasswordAgain) {
      toast.error("Password did not match!");
      return;
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
          SignUp to LiveCodeEditor
        </h4>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            onKeyUp={handleInputEnter}
          />
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
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Re-Enter Password"
            onChange={(e) => setUserPasswordAgain(e.target.value)}
            value={userPasswordAgain}
            onKeyUp={handleInputEnter}
          />
          <button
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-blue-600"
            onClick={validateUser}
          >
            SignUp
          </button>
          <span className="block text-center text-gray-600">
            If you are already a user please &nbsp;
            <a
              onClick={redirectToLogin}
              href=""
              className="text-blue-500 hover:underline"
            >
              login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
