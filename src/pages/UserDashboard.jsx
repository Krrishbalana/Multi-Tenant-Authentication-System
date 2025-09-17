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
    <div className="min-h-screen bg-white p-8 font-sans text-black">
      <div className="max-w-4xl mx-auto bg-neutral-50 p-8 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold mb-6 text-black">User Dashboard</h2>

        {loading && <p className="text-gray-600">Loading your profile...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && userData && (
          <div className="space-y-4 text-lg">
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
