'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface AccountingToolsProps {
  role: "superuser" | "client";
}

export default function AccountingTools({ role }: AccountingToolsProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounting = async () => {
      setLoading(true);

      let query = supabase
        .from("accounting")
        .select("id, property_id, type, amount, status, created_at, client_id");

      if (role === "client") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("client_id", user.id);
        }
      }
      // Superuser sees all accounting records

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setRecords(data || []);
      }

      setLoading(false);
    };

    fetchAccounting();
  }, [role]);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading accounting records...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Accounting & Financials</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + Add Transaction
        </button>
      </div>

      {!records.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No accounting records found.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Property</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Type</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Amount</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{rec.property_id}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{rec.type}</td>
                  <td className="px-6 py-4 text-primary font-bold">${rec.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        rec.status === "cleared"
                          ? "bg-green-100 text-green-800"
                          : rec.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : rec.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(rec.created_at).toLocaleDateString()}
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