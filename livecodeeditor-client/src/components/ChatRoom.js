import React, { useState, useEffect, useRef } from "react";

const ChatRoom = ({ socketRef, roomId, username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { username, message, isYou: true }]);
    socketRef.current.emit("message", {
      roomId,
      message,
      username,
    });
    setMessage("");
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("message", ({ messages }) => {
        const filteredMessage = messages.filter(
          (msg) => msg.username !== username
        );

        setMessages((prevMessages) => [...prevMessages, ...filteredMessage]);
      });
    }
    return () => {
      socketRef.current.off("message");
    };
  }, [socketRef.current]);

  console.log("msgs: ", messages);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="h-10percent bg-gray-700">
          <div className="mb-2 flex items-center justify-center">
            <h2 className="text-lg font-bold">Room Chat</h2>
          </div>
        </div>
        <div className="h-80percent bg-gray-500 overflow-y-auto">
          {messages.map((text, index) => (
            <div
              key={index}
              className={`flex items-end mb-2 ${
                text.isYou ? "justify-end" : "justify-start"
              }`}
            >
              {text.isYou ? (
                <div className="text-white bg-blue-500 p-2 rounded mr-2">
                  {`${text.username}: ${text.message}`}
                </div>
              ) : (
                <div className="text-gray-700 bg-gray-200 p-2 rounded ml-2">
                  {`${text.username}: ${text.message}`}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-10percent bg-gray-600 flex">
          <div className="flex items-center justify-center w-7/10">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-shrink rounded px-2 py-2 ml-1 border-gray-300 focus:border-blue-500 mb-0 w-full"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="flex items-center justify-center w-3/10">
            <button
              className="bg-blue-500 text-white p-2 rounded ml-2 w-full"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
