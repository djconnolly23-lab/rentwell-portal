'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface LeaseListProps {
  role: "superuser" | "client";
}

export default function LeaseList({ role }: LeaseListProps) {
  const [leases, setLeases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      setLoading(true);

      let query = supabase
        .from("leases")
        .select("id, property_id, renter_name, start_date, end_date, rent, status, client_id");

      if (role === "client") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("client_id", user.id);
        }
      }
      // Superuser sees all leases

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setLeases(data || []);
      }

      setLoading(false);
    };

    fetchLeases();
  }, [role]);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading leases...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Leases</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + Add Lease
        </button>
      </div>

      {!leases.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No leases found. Create a new lease to start tracking tenants.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Property</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Renter</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Start Date</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">End Date</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Rent</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leases.map((lease) => (
                <tr key={lease.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{lease.property_id}</td>
                  <td className="px-6 py-4 text-gray-600">{lease.renter_name}</td>
                  <td className="px-6 py-4 text-gray-600">{lease.start_date}</td>
                  <td className="px-6 py-4 text-gray-600">{lease.end_date}</td>
                  <td className="px-6 py-4 text-primary font-bold">${lease.rent}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        lease.status === "active"
                          ? "bg-green-100 text-green-800"
                          : lease.status === "delinquent"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
                    </span>
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