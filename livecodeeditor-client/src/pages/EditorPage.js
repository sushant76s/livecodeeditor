import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";

const EditorPage = () => {
  const [isLeftMenuOpen, setLeftMenuOpen] = useState(true);
  const [isRightMenuOpen, setRightMenuOpen] = useState(true);
  const [editorFontSize, setEditorFontSize] = useState("14px");
  const [editorTheme, setEditorTheme] = useState("light");

  const handleEditorFontSize = (event) => {
    setEditorFontSize(event.target.value);
  };

  const handleEditorTheme = (event) => {
    setEditorTheme(event.target.value);
  };

  return (
    <div className="flex h-screen relative">
      {/* Left Menu Column */}
      <div
        className={`transition-width duration-300 ${
          isLeftMenuOpen ? "w-1/4" : "w-0"
        } overflow-hidden bg-gray-200`}
      >
        {isLeftMenuOpen && (
          <div className="h-full p-2">
            <VerticalMenu />
          </div>
        )}
      </div>

      {/* Editor Column */}
      <div
        className={`transition-width duration-300 ${
          isLeftMenuOpen && isRightMenuOpen
            ? "sm:w-1/2 w-full"
            : isLeftMenuOpen || isRightMenuOpen
            ? "sm:w-3/4 w-full"
            : "w-full"
        } bg-white p-0 relative`}
      >
        <div className="fixed sm:w-1/2 w-full top-0 left-1/2 transform -translate-x-1/2 border p-1 bg-white z-10 items-center justify-center flex">
          <button
            onClick={() => setLeftMenuOpen(!isLeftMenuOpen)}
            className="bg-gray-300 px-2 rounded mx-2"
          >
            {isLeftMenuOpen ? "Close Side Panel" : "Open Side Panel"}
          </button>
          <select
            value={editorFontSize}
            onChange={handleEditorFontSize}
            className="w-1/4 bg-gray-300 rounded-md px-3 mx-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <select
            value={editorTheme}
            onChange={handleEditorTheme}
            className="w-1/4 bg-gray-300 rounded-md px-3 mx-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <button
            onClick={() => setRightMenuOpen(!isRightMenuOpen)}
            className="bg-gray-300 px-2 rounded mx-2"
          >
            {isRightMenuOpen ? "Close Room Chat" : "Open Room Chat"}
          </button>
        </div>
        {/* Your editor content goes here */}
        <div className="mt-9">
          <CodeEditor editorTheme={editorTheme} fontSize={editorFontSize} />
        </div>
      </div>

      {/* Right Menu Column */}
      <div
        className={`transition-width duration-300 ${
          isRightMenuOpen ? "w-1/4" : "w-0"
        } overflow-hidden bg-gray-200`}
      >
        {isRightMenuOpen && (
          <div className="h-full p-2">
            <RoomChat />
          </div>
        )}
      </div>
    </div>
  );
};

const VerticalMenu = () => {
  return (
    <div className="h-full flex flex-col relative">
      {/* First Row */}
      <div className="pt-2 pb-2 bg-gray-300 flex items-center justify-center">
        <h2 className="text-lg font-bold">LiveCodeEditor</h2>
      </div>
      <div className="mt-2 mb-2 bg-gray-300 flex items-center justify-center">
        <h2 className="text-lg font-bold">Connected</h2>
      </div>
      {/* Second Row (Scrollable) */}
      <div className="overflow-y-auto bg-gray-100">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 1</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 2</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 3</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 4</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 5</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 6</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 7</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 8</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 9</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 10</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 11</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 12</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 13</li>
          <li className="py-2 px-4 hover:bg-gray-300">Menu Item 14</li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
      {/* Third Row (Fixed at Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-300 flex items-center justify-center p-4">
        {/* Future button or content */}
        <button className="bg-blue-500 text-white p-2 rounded">
          Copy Room ID
        </button>
        <p className="p-4">|</p>
        <button className="bg-blue-500 text-white p-2 rounded">
          Leave Room
        </button>
      </div>
    </div>
  );
};

const RoomChat = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    setMessages([...messages, { text, isYou: true }]);
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="mb-2 bg-gray-300 flex items-center justify-center">
        <h2 className="text-lg font-bold">Room Chat</h2>
      </div>
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4">
        {/* Chat messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end mb-2 ${
              message.isYou ? "justify-end" : "justify-start"
            }`}
          >
            {message.isYou ? (
              <div className="text-white bg-blue-500 p-2 rounded mr-2">
                {message.text}
              </div>
            ) : (
              <div className="text-gray-700 bg-gray-200 p-2 rounded ml-2">
                {message.text}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Message input field */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-300 p-2 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-shrink rounded px-2 py-2 border-gray-300 focus:border-blue-500 mb-0 w-3/4" // Reduce flex-grow and add fixed width
          onKeyPress={(e) => {
            // ...
          }}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded ml-2 pl-4 pr-4"
          onClick={() => sendMessage("Your message here")}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EditorPage;
