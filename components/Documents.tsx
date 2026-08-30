'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DocumentsProps {
  role: "superuser" | "client" | "renter";
}

export default function Documents({ role }: DocumentsProps) {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);

      let query = supabase
        .from("documents")
        .select("id, title, type, status, created_at, client_id, renter_id");

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
      // Superuser sees all documents

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setDocs(data || []);
      }

      setLoading(false);
    };

    fetchDocs();
  }, [role]);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading documents...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Documents & E-Sign</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + Upload Document
        </button>
      </div>

      {!docs.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No documents found.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Title</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Type</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{doc.title}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        doc.status === "signed"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {doc.status ? doc.status.charAt(0).toUpperCase() + doc.status.slice(1) : "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : "—"}
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