import React, { useState } from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(true);
    if (onClick) onClick(e);
    setTimeout(() => setClicked(false), 600); // Reset animation
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`relative w-full bg-gray-500 text-black rounded-xl px-6 py-2 
                  overflow-hidden group transition duration-500 ease-in-out 
                  hover:bg-gray-600 focus:outline-none ${className}`}
    >
      <span
        className={`flex items-center justify-center relative z-10 font-medium
                    transition-colors duration-500 ${
                      clicked ? "text-white" : "text-black"
                    } group-hover:text-white`}
      >
        {children}
      </span>

      {/* Sliding black arrow background */}
      <div
        className={`absolute inset-0 flex items-center justify-start
                    transform -translate-x-full group-hover:translate-x-0
                    transition-transform duration-500 ease-in-out ${
                      clicked ? "translate-x-0" : ""
                    } bg-black`}
      >
        <svg
          className="w-6 h-6 ml-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default Button;
