'use client';

import { useState } from "react";

export default function CloudConnectors({ onImport }: { onImport: (fileUrl: string) => void }) {
  // Track which provider is loading so we can show specific button states
  const [loading, setLoading] = useState<string | null>(null);

  const connectCloud = async (provider: string) => {
    setLoading(provider);
    try {
      // Placeholder: replace with actual OAuth + API integration
      // Each provider will return a file URL or ID
      const fileUrl = `https://fake-${provider}-file-url.com/lease.pdf`;
      
      // Artificial delay to demonstrate loading state in UI
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onImport(fileUrl);
    } catch (error) {
      console.error(`Error connecting to ${provider}:`, error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Import from Cloud Storage</h2>
        <p className="text-sm text-gray-500 mt-1">Choose a provider to import your lease or document.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={() => connectCloud("google")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 transition-all shadow-sm"
          disabled={!!loading}
        >
          {loading === "google" ? "Connecting..." : "Google Drive"}
        </button>

        <button
          onClick={() => connectCloud("onedrive")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 transition-all shadow-sm"
          disabled={!!loading}
        >
          {loading === "onedrive" ? "Connecting..." : "OneDrive"}
        </button>

        <button
          onClick={() => connectCloud("dropbox")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 transition-all shadow-sm"
          disabled={!!loading}
        >
          {loading === "dropbox" ? "Connecting..." : "Dropbox"}
        </button>

        <button
          onClick={() => connectCloud("box")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 transition-all shadow-sm"
          disabled={!!loading}
        >
          {loading === "box" ? "Connecting..." : "Box"}
        </button>

        <button
          onClick={() => connectCloud("icloud")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 transition-all shadow-sm"
          disabled={!!loading}
        >
          {loading === "icloud" ? "Connecting..." : "iCloud Drive"}
        </button>
      </div>
    </div>
  );
}