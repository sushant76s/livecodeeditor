import React, { useState } from "react";

const VerticalMenu = ({ clients, copyRoomId, leaveRoom }) => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="h-10percent">
          <div className="bg-gray-600 pt-2 pb-2 flex items-center justify-center">
            <h2 className="text-lg font-bold">LiveCodeEditor</h2>
          </div>
        </div>
        <div className="h-10percent bg-gray-600">
          <div className="mt-2 mb-2 bg-gray-300 flex items-center justify-center">
            <h2 className="text-lg font-bold">Connected</h2>
          </div>
        </div>
        <div className="h-60percent bg-gray-500 overflow-y-auto">
          <ul>
            {clients.map((client, index) => (
              <li
                key={index}
                className={`py-2 px-4 ${
                  index % 2 === 0 ? "bg-white-300" : "bg-gray-300"
                }`}
              >
                {`User: ${client.username}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-20percent bg-gray-400 flex">
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
