import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

const SuperAdminDashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        const data = await fetchWithAuth("http://localhost:5050/api/tenants");
        setTenants(data.tenants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md text-gray-200">
        <h2 className="text-4xl font-bold mb-8 text-cyan-400">
          Super Admin Dashboard
        </h2>

        {loading && <p>Loading tenants...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && tenants.length === 0 && <p>No tenants found.</p>}

        <ul className="space-y-4">
          {tenants.map(({ tenantId, name }) => (
            <li
              key={tenantId}
              className="bg-gray-700 p-4 rounded-md shadow-sm flex justify-between items-center"
            >
              <span className="text-lg font-semibold">{name}</span>
              <span className="text-sm text-gray-400">ID: {tenantId}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
