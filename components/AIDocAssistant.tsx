'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AIDocAssistant({ role }: { role: "va" | "client" }) {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generateLease = async (state: string) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.functions.invoke("generateLease", {
        body: { state }
      });
      
      if (error) {
        throw error;
      }
      
      setDraft(data?.text || "No text returned from AI function.");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate lease document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-primary">AI Document Assistant</h2>
      <p className="text-sm text-gray-500">Generate state-compliant lease templates instantly using Supabase Edge Functions.</p>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      <textarea
        className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
        rows={10}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Draft will appear here..."
      />

      <div className="flex gap-3">
        <button
          onClick={() => generateLease("Arizona")}
          disabled={loading}
          className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm"
        >
          {loading ? "Generating..." : "Generate AZ Lease"}
        </button>
        <button
          onClick={() => generateLease("California")}
          disabled={loading}
          className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm"
        >
          {loading ? "Generating..." : "Generate CA Lease"}
        </button>
      </div>
    </div>
  );
}