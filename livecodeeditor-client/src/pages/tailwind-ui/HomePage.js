import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import codeImage from "../assets/images/code-image.png";
import { userInfo } from "../services/UserAPI";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const redirectToRoom = () => {
    navigate("/room");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await userInfo();
      if (userDetails !== null) {
        setUser(userDetails.user.fullName);
      }
    };
    getUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setUser(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-300">
      {/* Desktop view */}
      <div className="hidden md:flex h-full flex-col space-y-8">
        {/* Navbar Action Card */}
        <div className="bg-white text-black p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <button>
              <h3 className="text-xl font-bold">
                <i className="fa-solid fa-code mr-2"></i>
                LiveCodeEditor
              </h3>
            </button>
          </div>
          <div className="flex items-center">
            {user && (
              <h4 className="font-bold border rounded-lg p-2">Hi {user}</h4>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white p-2 rounded-lg flex items-center ml-4 hover:bg-blue-600"
              >
                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                Logout
              </button>
            )}
            <a
              href="https://github.com/sushant76s/livecodeeditor/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4"
            >
              <button className="bg-gray-600 text-white p-2 rounded-lg flex items-center ml-4 hover:bg-blue-600">
                <i className="fab fa-github mr-2"></i>
                GitHub
              </button>
            </a>
          </div>
        </div>

        <div className="flex space-x-2">
          {/* Card 1 */}
          <div
            className="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-start"
            style={{ width: "60%" }}
          >
            {/* Content of Card 1 */}
            <img
              className="mx-auto w-30 h-30"
              src={codeImage}
              alt="LiveCodeEditor"
            />
            <div className="bg-white text-black p-4 mt-4 rounded-lg">
              <p>
                LiveCodeEditor is a collaborative real-time code editing tool
                with integrated chat support, allowing multiple users to connect
                and view code snippets simultaneously.
              </p>
            </div>
          </div>

          {/* Cards 2, 3, and 4 (Existing cards with adjusted styles) */}
          <div className="flex flex-col space-y-4" style={{ width: "40%" }}>
            {/* Card 2 */}
            <div className="bg-white text-white p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
                <p>
                  Experience real-time collaborative coding with LiveCodeEditor!
                </p>
              </div>
              <button
                className="mt-4 p-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
                onClick={redirectToRoom}
              >
                Try LiveCodeEditor
              </button>
            </div>
            <div className="bg-white text-white p-4 rounded-lg flex flex-col items-center justify-center ">
              <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
                <p>
                  Access your LiveCodeEditor account to join collaborative
                  coding sessions and chat with peers in real-time.
                </p>
              </div>
              <button
                onClick={redirectToLogin}
                className="mt-4 p-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
              >
                Login
              </button>
            </div>
            <div className="bg-white text-white p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
                <p>
                  Create your LiveCodeEditor account to start collaborating on
                  code snippets and chatting with your team instantly.
                </p>
              </div>
              <button
                onClick={redirectToSignUp}
                className="mt-4 p-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
              >
                Signup
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white text-black p-4 rounded-lg flex items-center justify-center bottom-0 mb-0 w-full">
          <h3>
            Developed by{" "}
            <a
              href="https://github.com/sushant76s/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sushant
            </a>{" "}
            &copy;2024
          </h3>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col h-full space-y-4">
        {/* Navbar Action Card */}
        <div className="bg-white text-black p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <button>
              <i className="fa-solid fa-code mr-2"></i>
            </button>
          </div>
          <div className="flex items-center">
            {user && (
              <h4 className="font-bold border rounded-lg p-2">
                Hi {user?.user}
              </h4>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white p-2 rounded-lg flex items-center ml-4 hover:bg-blue-600"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            )}
            <a
              href="https://github.com/sushant76s/livecodeeditor/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4"
            >
              <button className="bg-gray-600 text-white p-2 rounded-lg flex items-center ml-4 hover:bg-blue-600">
                <i className="fab fa-github"></i>
              </button>
            </a>
          </div>
        </div>

        {/* Card 1 */}
        <div className="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-between">
          <img
            className="mx-auto w-30 h-10"
            src={codeImage}
            alt="LiveCodeEditor"
          />
          <div className="bg-white text-black p-4 mt-4 w-full rounded-lg">
            <p>
              LiveCodeEditor is a collaborative real-time code editing tool with
              integrated chat support, allowing multiple users to connect and
              view code snippets simultaneously.
            </p>
          </div>
        </div>

        {/* Cards 2, 3, and 4 (Existing cards with adjusted styles) */}
        <div className="flex flex-col space-y-4">
          {/* Card 2 */}
          <div className="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
              <p>
                Experience real-time collaborative coding with LiveCodeEditor!
              </p>
            </div>
            <button
              className="mt-4 p-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
              onClick={redirectToRoom}
            >
              Try LiveCodeEditor
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
              <p>
                Access your LiveCodeEditor account to join collaborative coding
                sessions and chat with peers in real-time.
              </p>
            </div>
            <button
              onClick={redirectToLogin}
              className="mt-4 p-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
            >
              Login
            </button>
          </div>
          {/* Card 4 */}
          <div className="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="bg-white text-black p-4 mt-4 rounded-lg w-full">
              <p>
                Create your LiveCodeEditor account to start collaborating on
                code snippets and chatting with your team instantly.
              </p>
            </div>
            <button
              onClick={redirectToSignUp}
              className="mt-4 p-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
            >
              Signup
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white text-black p-4 rounded-lg flex items-center justify-center">
          <h3>
            Developed by{" "}
            <a
              href="https://github.com/sushant76s/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sushant
            </a>{" "}
            &copy;2024
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
