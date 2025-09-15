import React from "react";

function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-6">
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-700 text-gray-200 placeholder-gray-400 
                   rounded-xl shadow-sm border border-gray-600 
                   focus:outline-none focus:ring-2 focus:ring-cyan-500 
                   transition-all duration-200"
      />
    </div>
  );
}

export default Input;
