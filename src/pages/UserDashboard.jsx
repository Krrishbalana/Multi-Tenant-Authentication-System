// src/pages/UserDashboard.jsx
import React from "react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md text-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">
          User Dashboard
        </h2>
        <p>Personal and tenant-specific data will show here.</p>
        {/* TODO: Add data fetching and UI for user-specific info */}
      </div>
    </div>
  );
};

export default UserDashboard;
