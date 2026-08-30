'use client';

import LeaseWorkflow from "@/components/LeaseWorkflow";
import AIDocAssistant from "@/components/AIDocAssistant";
import DocumentTranslator from "@/components/DocumentTranslator";
import FileUpload from "@/components/FileUpload";

export default function VAProfile() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Virtual Assistant Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Daily monitoring, document preparation, AI structuring, triage, and support tasks.</p>
      </header>

      <section className="space-y-8">
        {/* Lease Generation and Workflow Management */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Lease Workflow Management</h2>
          <LeaseWorkflow role="va" />
        </div>

        {/* AI Document Assistant */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">AI Document Analysis</h2>
          <AIDocAssistant />
        </div>

        {/* Document Translation Support */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Document Translation Center</h2>
          <DocumentTranslator englishText="Standard Lease Agreement Terms & Conditions: Rent is due on the 1st of every month." />
        </div>

        {/* File Repository Management */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Document Vault & Storage</h2>
          <FileUpload />
        </div>
      </section>
    </div>
  );
}