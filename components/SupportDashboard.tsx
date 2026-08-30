'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SupportDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("support_tickets")
        .select("id, type, description, status, priority, created_at, renter_id, client_id");

      if (error) {
        console.error(error);
      } else {
        setTickets(data || []);
      }

      setLoading(false);
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Loading support tickets...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Support Staff Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Manage active support tickets, customer inquiries, and escalation statuses.</p>
        </div>
      </header>

      {!tickets.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500 shadow-sm">
          No support tickets found. All queues are currently clear!
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Type</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Description</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Priority</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 capitalize">{ticket.type}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={ticket.description}>
                    {ticket.description}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        ticket.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : ticket.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        ticket.status === "open"
                          ? "bg-blue-100 text-blue-800"
                          : ticket.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : ticket.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ticket.status.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(ticket.created_at).toLocaleString()}
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