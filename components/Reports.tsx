'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ReportsProps {
  role: "superuser" | "client";
}

export default function Reports({ role }: ReportsProps) {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);

      let query = supabase
        .from("reports")
        .select("id, title, type, period_start, period_end, summary, client_id");

      if (role === "client") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("client_id", user.id);
        }
      }
      // Superuser sees all reports

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setReports(data || []);
      }

      setLoading(false);
    };

    fetchReports();
  }, [role]);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading reports...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Reports</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + Generate Report
        </button>
      </div>

      {!reports.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No reports found.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Title</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Type</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Period</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-primary">{report.title}</td>
                  <td className="px-6 py-4 text-gray-600">{report.type}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {report.period_start ? new Date(report.period_start).toLocaleDateString() : "—"} –{" "}
                    {report.period_end ? new Date(report.period_end).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate" title={report.summary}>
                    {report.summary || "No summary provided."}
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