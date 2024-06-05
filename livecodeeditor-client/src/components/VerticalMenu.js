import React, { useState } from "react";

const VerticalMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="p-2 bg-blue-500 text-white rounded-md"
        onClick={toggleMenu}
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>
      <div
        className={`absolute top-0 left-0 h-full bg-gray-200 w-64 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 space-y-2">
          <li>
            <a href="#" className="block p-2 hover:bg-gray-300 rounded">
              Menu Item 1
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-300 rounded">
              Menu Item 2
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-300 rounded">
              Menu Item 3
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-300 rounded">
              Menu Item 4
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalMenu;
