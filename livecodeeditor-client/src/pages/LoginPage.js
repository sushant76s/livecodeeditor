import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import codeImage from "../assets/images/code-image.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room Id and username is required!");
      return;
    }
    navigate(`/room/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <img className="mx-auto w-50 h-25" src={codeImage} alt="logo" />
        <h4 className="text-lg font-semibold text-center mt-4 mb-2">
          Paste invitation room Id...
        </h4>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="UserName"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={joinRoom}
          >
            Join
          </button>
          <span className="block text-center text-gray-600">
            If you don't have invite then create &nbsp;
            <a
              onClick={createNewRoom}
              href=""
              className="text-blue-500 hover:underline"
            >
              new room
            </a>
          </span>
        </div>
      </div>
      <footer className="mt-8">
        <h4>
          Developed by{" "}
          <a
            href="https://github.com/sushant76s"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            @Sushant
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default LoginPage;
