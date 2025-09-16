// src/pages/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md text-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">
          Admin Dashboard
        </h2>
        <p>Manage users and data for your tenant.</p>
        {/* TODO: Add data fetching and UI for tenant users */}
      </div>
    </div>
  );
};

export default AdminDashboard;
