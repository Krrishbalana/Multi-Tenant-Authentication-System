import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { tenant } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenantUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchWithAuth(
          `http://localhost:5050/api/tenants/${tenant.id}/users`
        );
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (tenant && tenant.id) {
      fetchTenantUsers();
    }
  }, [tenant]);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-200">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold mb-6 text-cyan-400">
          Admin Dashboard
        </h2>
        <h3 className="mb-6">Users in Tenant: {tenant.name}</h3>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && users.length === 0 && (
          <p>No users found for this tenant.</p>
        )}

        <table className="min-w-full bg-gray-700 rounded-md overflow-hidden">
          <thead>
            <tr className="text-left text-gray-400 uppercase text-sm">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ email, name, role }) => (
              <tr
                key={email}
                className="border-b border-gray-600 hover:bg-gray-600 transition-colors"
              >
                <td className="px-6 py-4">{name}</td>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4 capitalize">{role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
