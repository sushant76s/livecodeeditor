import React, { useState } from "react";

const VerticalMenu = ({ clients, copyRoomId, leaveRoom }) => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="h-10percent">
          <div className="bg-white p-2 rounded-lg flex items-center justify-center">
            <h2 className="text-lg font-bold">LiveCodeEditor</h2>
          </div>
        </div>
        <div className="h-10percent">
          <div className=" bg-white rounded-lg p-2 flex items-center justify-center">
            <h2 className="text-lg font-bold">Connected</h2>
          </div>
        </div>
        <div className="h-60percent bg-gray-300 overflow-y-auto p-4 rounded-lg">
          <ul>
            {clients.map((client, index) => (
              <li
                key={index}
                className={`py-2 px-4 m-1 rounded-lg ${
                  index % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
                }`}
              >
                <i className="fa-regular fa-user"></i>
                {`  ${client.username}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-20percent bg-white flex rounded-lg mt-2">
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={copyRoomId}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Copy Room ID
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={leaveRoom}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalMenu;
