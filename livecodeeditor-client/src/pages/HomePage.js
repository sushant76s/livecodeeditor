import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    console.log("Clicked!");
    navigate("/login");
  };

  return (
    <div>
      <h2 className="text-7xl text-center text-blue-400">HomePage</h2>
      <button onClick={redirectToLogin}>Login</button>
    </div>
  );
};

export default HomePage;
