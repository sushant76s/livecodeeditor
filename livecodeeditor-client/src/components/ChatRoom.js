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
        <div className="h-10percent">
          <div className="bg-white rounded-lg p-2 flex items-center justify-center">
            <h2 className="text-lg font-bold">Room Chat</h2>
          </div>
        </div>
        <div className="h-80percent bg-gray-300 overflow-y-auto rounded-lg p-2">
          {messages.map((text, index) => (
            <div
              key={index}
              className={`flex items-end mb-2 ${
                text.isYou ? "justify-end" : "justify-start"
              }`}
            >
              {text.isYou ? (
                <div className="text-black bg-gray-400 p-2 rounded mr-2">
                  {`${text.username}: ${text.message}`}
                </div>
              ) : (
                <div className="text-black bg-gray-400 p-2 rounded ml-2">
                  {`${text.username}: ${text.message}`}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-10percent bg-white flex rounded-lg mt-2 p-2">
          <div className="flex items-center justify-center w-6/10 bg-gray-500 rounded-lg">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-shrink rounded px-2 py-2 mx-1 border-none focus:border-blue-500 mb-0 w-full"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="flex items-center justify-center w-4/10">
            <button
              className="bg-gray-600 hover:bg-blue-500 text-white px-3 py-2 rounded ml-2 w-full"
              onClick={sendMessage}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
