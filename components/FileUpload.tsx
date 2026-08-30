'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function FileUpload() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ADD: upload new file
  const handleUpload = async (file: File) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const filePath = `leases/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (error) throw error;

      setFiles([...files, { name: file.name, url: data.path }]);
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || "Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  // EDIT: replace existing file
  const handleEdit = async (index: number, newFile: File) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const oldFile = files[index];
      // Delete old file
      await supabase.storage.from("documents").remove([oldFile.url]);
      // Upload new file
      const filePath = `leases/${Date.now()}_${newFile.name}`;
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(filePath, newFile);

      if (error) throw error;

      const updatedFiles = [...files];
      updatedFiles[index] = { name: newFile.name, url: data.path };
      setFiles(updatedFiles);
    } catch (err: any) {
      console.error("Edit error:", err);
      setErrorMsg(err.message || "Failed to update file.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE: remove file
  const handleDelete = async (index: number) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const fileToDelete = files[index];
      await supabase.storage.from("documents").remove([fileToDelete.url]);

      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
    } catch (err: any) {
      console.error("Delete error:", err);
      setErrorMsg(err.message || "Failed to delete file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
        <p className="text-sm text-gray-500 mt-1">Drag & drop or select files to upload, edit, or delete.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors bg-gray-50/50">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-800 cursor-pointer"
        />
      </div>

      {loading && <p className="text-sm text-primary font-medium animate-pulse">Processing file operation...</p>}

      <div className="space-y-2 mt-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between border border-gray-200 p-3 rounded-md bg-white shadow-sm">
            <span className="text-sm font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = ".pdf,.doc,.docx";
                  input.onchange = (e: any) => e.target.files && handleEdit(index, e.target.files[0]);
                  input.click();
                }}
                className="px-3 py-1.5 bg-amber-500 text-white font-medium rounded text-xs hover:bg-amber-600 transition-colors shadow-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-1.5 bg-red-600 text-white font-medium rounded text-xs hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}