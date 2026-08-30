'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface MaintenanceListProps {
  role: "superuser" | "client" | "renter";
}

export default function MaintenanceList({ role }: MaintenanceListProps) {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);

      let query = supabase
        .from("maintenance_requests")
        .select("id, property_id, title, description, status, priority, created_at, client_id, renter_id");

      if (role === "client") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("client_id", user.id);
        }
      } else if (role === "renter") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("renter_id", user.id);
        }
      }
      // Superuser sees all requests

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    };

    fetchRequests();
  }, [role]);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading maintenance requests...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Maintenance</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + New Request
        </button>
      </div>

      {!requests.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No maintenance requests found.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Property</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Title</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Priority</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{req.property_id || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{req.title || "Untitled Request"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        req.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : req.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {req.priority ? req.priority.charAt(0).toUpperCase() + req.priority.slice(1) : "Normal"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        req.status === "open"
                          ? "bg-blue-100 text-blue-800"
                          : req.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "closed" || req.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {req.status ? req.status.replace("_", " ").replace(/\b\w/g, (char: string) => char.toUpperCase()) : "Open"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {req.created_at ? new Date(req.created_at).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}