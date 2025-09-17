import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchWithAuth("http://localhost:5050/api/users/me");
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-200">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold mb-6 text-cyan-400">
          User Dashboard
        </h2>

        {loading && <p>Loading your profile...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && userData && (
          <div className="space-y-4">
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Role:</strong> {userData.role}
            </p>
            <p>
              <strong>Tenant ID:</strong> {userData.tenantId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
