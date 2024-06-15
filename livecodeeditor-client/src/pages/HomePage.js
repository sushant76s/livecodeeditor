import React from "react";
import { useNavigate } from "react-router-dom";
import codeImage from "../assets/images/code-image.png";

const HomePage = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    console.log("Clicked!");
    navigate("/room");
  };

  return (
    <div className="h-screen p-6 bg-gray-400">
      {/* Desktop view */}
      <div className="hidden md:flex h-full">
        {/* Card 1 */}
        <div className="flex-1 bg-gray-800 text-white p-4 rounded-lg mr-4 flex flex-col items-center justify-between">
          <img
            className="mx-auto w-30 h-15"
            src={codeImage}
            alt="LiveCodeEditor"
          />
          <div className="bg-white text-black p-4 mt-4 w-full rounded-lg">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              imperdiet, nulla et dictum interdum, nisi lorem egestas odio,
              vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est,
              ultrices nec congue eget, auctor vitae massa. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla
              et dictum interdum, nisi lorem egestas odio, vitae scelerisque
              enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
              congue eget, auctor vitae massa.
            </p>
          </div>
          <div className="w-full">
            <h3 className="text-center w-full">Developed by Sushant @2024</h3>
          </div>
        </div>
        {/* Card 2 and Card 3 container */}
        <div className="w-1/4 h-1/ flex flex-col justify-between">
          {/* Card 2 */}
          <div className="bg-gray-700 text-white p-4 rounded-lg mb-4 flex flex-col items-center justify-center">
            <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
              onClick={redirectToLogin}
            >
              Try LiveCodeEditor
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-700 text-white p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg">
              Login/SignUp
            </button>
          </div>
        </div>
      </div>
      {/* ############# > Mobile view < ######################*/}
      <div className="md:hidden flex flex-col h-full">
        {/* Card 1 */}
        <div className="flex-1 bg-gray-800 text-white p-2 rounded-lg mb-2 flex flex-col items-center justify-between">
          <img
            className="mx-auto w-30 h-15"
            src={codeImage}
            alt="LiveCodeEditor"
          />
          <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              imperdiet, nulla et dictum interdum, nisi lorem egestas odio,
              vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est,
              ultrices nec congue eget, auctor vitae massa. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla
              et dictum interdum, nisi lorem egestas odio, vitae scelerisque
              enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
              congue eget, auctor vitae massa.
            </p>
          </div>
        </div>
        {/* Card 2 and Card 3 container */}
        <div className="flex justify-between space-x-4 mb-4">
          {/* Card 2 */}
          <div className="bg-gray-700 text-white p-4 rounded-lg flex-1 flex flex-col items-center justify-center">
            <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
              onClick={redirectToLogin}
            >
              Try LiveCodeEditor
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-700 text-white p-4 rounded-lg flex-1 flex flex-col items-center justify-center">
            <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg">
              Login/SignUp
            </button>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-center w-full">Developed by Sushant @2024</h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
