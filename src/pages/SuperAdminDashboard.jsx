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
    <div className="min-h-screen bg-white p-8 font-sans text-black">
      <div className="max-w-5xl mx-auto bg-neutral-50 p-8 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold mb-8">Super Admin Dashboard</h2>

        {loading && <p className="text-gray-600">Loading tenants...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && tenants.length === 0 && (
          <p className="text-gray-600">No tenants found.</p>
        )}

        <ul className="space-y-4">
          {tenants.map(({ tenantId, name }) => (
            <li
              key={tenantId}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex justify-between items-center"
            >
              <span className="text-lg font-semibold">{name}</span>
              <span className="text-sm text-gray-500">ID: {tenantId}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
