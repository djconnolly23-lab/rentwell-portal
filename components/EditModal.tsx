'use client';

import { useState } from "react";

interface EditModalProps {
  onClose: () => void;
  onSave: (englishText: string, translatedText: string, lang: string) => void;
  initialEnglishText?: string;
  initialTranslatedText?: string;
  initialLang?: string;
}

export default function EditModal({
  onClose,
  onSave,
  initialEnglishText = "",
  initialTranslatedText = "",
  initialLang = "en",
}: EditModalProps) {
  const [englishText, setEnglishText] = useState(initialEnglishText);
  const [translatedText, setTranslatedText] = useState(initialTranslatedText);
  const [lang, setLang] = useState(initialLang);
  const [saving, setSaving] = useState(false);

  const handleSaveClick = async () => {
    setSaving(true);
    try {
      await onSave(englishText, translatedText, lang);
      onClose();
    } catch (err) {
      console.error("Error saving document version:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-w-2xl w-full p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Edit Document</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            &times;
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Language Code
            </label>
            <input
              type="text"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              placeholder="e.g., es, fr, en"
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              English Source Text
            </label>
            <textarea
              rows={4}
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Translated / Customized Text
            </label>
            <textarea
              rows={4}
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary font-mono"
            />
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            disabled={saving}
            className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}