import React from "react";

function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-6">
      <label className="block text-black text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white text-black placeholder-gray-400 
                   rounded-xl border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition duration-500"
        autoComplete="off"
      />
    </div>
  );
}

export default Input;
