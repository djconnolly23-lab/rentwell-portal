'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FileUpload from "@/components/FileUpload";
import CloudConnectors from "@/components/CloudConnectors";
import AIStructuring from "@/components/AIStructuring";

interface LeaseWorkflowProps {
  role: "va" | "client" | "renter";
}

export default function LeaseWorkflow({ role }: LeaseWorkflowProps) {
  const [draft, setDraft] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [state, setState] = useState("Arizona");
  const [status, setStatus] = useState("draft"); // draft | finalized | signed
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // AI Lease Generator
  const generateLease = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { data, error } = await supabase.functions.invoke("generateLease", {
        body: { state }
      });
      if (error) throw error;
      setDraft(data?.text || "No text returned.");
      setSuccessMsg(`Generated ${state} lease successfully.`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate lease.");
    } finally {
      setLoading(false);
    }
  };

  // Save Draft
  const saveDraft = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const { error } = await supabase.from("leases").insert({
      state,
      text: draft,
      status: "draft"
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setStatus("draft");
      setSuccessMsg("Draft saved successfully.");
    }
  };

  // Finalize Lease
  const finalizeLease = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const { error } = await supabase.from("leases").update({ status: "finalized" }).eq("state", state);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setStatus("finalized");
      setSuccessMsg("Lease finalized.");
    }
  };

  // Sign Lease
  const signLease = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const { error } = await supabase.from("leases").update({ status: "signed" }).eq("state", state);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setStatus("signed");
      setSuccessMsg("Lease signed successfully!");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Lease Workflow</h2>
        <p className="text-sm text-gray-500 mt-1">
          Generate, upload, or import leases. VA and Client can edit/finalize; Renter can sign.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-200">
          {successMsg}
        </div>
      )}

      {/* State selector for AI generation */}
      {role !== "renter" && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Target State Jurisdiction
          </label>
          <select
            className="border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary bg-white w-full md:w-64"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {["Alabama","Alaska","Arizona","California","New York","Texas"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* AI Lease Generator */}
      {(role === "va" || role === "client") && (
        <div className="space-y-4 pt-2">
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
            rows={10}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Lease draft will appear here..."
          />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={generateLease}
              className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm"
              disabled={loading}
            >
              {loading ? "Generating..." : `Generate ${state} Lease`}
            </button>
            <button
              onClick={saveDraft}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              Save Draft
            </button>
            {role === "client" && (
              <button
                onClick={finalizeLease}
                className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors shadow-sm"
              >
                Finalize Lease
              </button>
            )}
          </div>
        </div>
      )}

      {/* File Upload + Cloud Connectors */}
      {(role === "va" || role === "client") && (
        <div className="space-y-6 pt-4 border-t border-gray-100">
          <FileUpload />
          <CloudConnectors onImport={(url) => setFileUrl(url)} />
        </div>
      )}

      {/* AI Structuring for uploaded/imported docs */}
      {fileUrl && (
        <div className="pt-4 border-t border-gray-100">
          <AIStructuring fileUrl={fileUrl} />
        </div>
      )}

      {/* Signing section */}
      {role === "renter" && status === "finalized" && (
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={signLease}
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm"
          >
            Sign Lease Agreement
          </button>
        </div>
      )}

      <div className="pt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Current workflow status: <span className="text-gray-800 font-bold capitalize">{status}</span>
      </div>
    </div>
  );
}