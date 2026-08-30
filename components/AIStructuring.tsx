'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AIStructuring({ fileUrl }: { fileUrl: string }) {
  const [structuredText, setStructuredText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const structureDoc = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.functions.invoke("structureDocument", {
        body: { fileUrl }
      });

      if (error) {
        throw error;
      }
      
      setStructuredText(data?.structuredText || "No structured text returned.");
    } catch (err: any) {
      console.error("Error structuring document:", err);
      setErrorMsg(err.message || "Failed to structure document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-primary">AI Document Structuring</h2>
      <p className="text-sm text-gray-500">
        AI parses uploaded or imported leases into structured sections (terms, rent, dates, signatures).
      </p>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      <button
        onClick={structureDoc}
        className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm"
        disabled={loading}
      >
        {loading ? "Structuring..." : "Run AI Structuring"}
      </button>

      {structuredText && (
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
          rows={12}
          value={structuredText}
          onChange={(e) => setStructuredText(e.target.value)}
        />
      )}
    </div>
  );
}