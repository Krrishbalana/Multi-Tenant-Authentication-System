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
    <div className="min-h-screen bg-white p-8 font-sans text-black">
      <div className="max-w-5xl mx-auto bg-neutral-50 p-8 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold mb-6 text-black">Admin Dashboard</h2>
        <h3 className="mb-8 text-lg font-medium">
          Users in Tenant: <span className="font-semibold">{tenant.name}</span>
        </h3>

        {loading && <p className="text-gray-600">Loading users...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && users.length === 0 && (
          <p className="text-gray-600">No users found for this tenant.</p>
        )}

        <table className="min-w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <thead>
            <tr className="text-left text-gray-700 uppercase text-sm bg-gray-100">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ email, name, role }) => (
              <tr
                key={email}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
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
