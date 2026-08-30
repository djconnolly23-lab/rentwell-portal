'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface MessagesProps {
  role: "superuser" | "client" | "renter";
}

export default function Messages({ role }: MessagesProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);

      let query = supabase
        .from("messages")
        .select("id, sender_name, recipient_name, subject, body, created_at, client_id, renter_id");

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
      // Superuser sees all messages

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setMessages(data || []);
      }

      setLoading(false);
    };

    fetchMessages();
  }, [role]);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + New Message
        </button>
      </div>

      {!messages.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No messages found.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">From</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">To</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Subject</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{msg.sender_name || "Unknown"}</td>
                    <td className="px-6 py-4 text-gray-600">{msg.recipient_name || "Unknown"}</td>
                    <td className="px-6 py-4 text-primary font-medium">{msg.subject || "No Subject"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {msg.created_at ? new Date(msg.created_at).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expanded Message View Cards */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Message Threads</h3>
            {messages.map((msg) => (
              <details key={msg.id} className="border border-gray-200 rounded-md p-4 group bg-gray-50/50">
                <summary className="cursor-pointer text-primary font-semibold flex justify-between items-center">
                  <span>{msg.subject || "No Subject"} — <span className="text-gray-600 font-normal">From {msg.sender_name || "Unknown"}</span></span>
                  <span className="text-xs text-gray-400 font-normal">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : "—"}
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-700 pl-2 border-l-2 border-primary/30 leading-relaxed">
                  {msg.body || "No message content."}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}