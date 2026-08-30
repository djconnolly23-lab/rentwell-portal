'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DocumentTranslatorProps {
  englishText: string;
}

// Comprehensive list of popular global languages for translation
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish (Español)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "zh", name: "Chinese (中文)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "vi", name: "Vietnamese (Tiếng Việt)" },
  { code: "km", name: "Khmer (ខ្មែរ)" },
  { code: "th", name: "Thai (ไทย)" },
  { code: "tl", name: "Tagalog (Filipino)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "pl", name: "Polish (Polski)" },
  { code: "uk", name: "Ukrainian (Українська)" },
];

export default function DocumentTranslator({ englishText }: DocumentTranslatorProps) {
  const [targetLang, setTargetLang] = useState<string>("en");
  const [translated, setTranslated] = useState<string>(englishText);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleTranslation = async () => {
      if (targetLang === "en") {
        setTranslated(englishText);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: englishText, targetLang }),
        });
        
        const data = await res.json();
        if (data?.translatedText) {
          setTranslated(data.translatedText);
        }
      } catch (err) {
        console.error("Translation error:", err);
      } finally {
        setLoading(false);
      }
    };

    handleTranslation();
  }, [targetLang, englishText]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Document View</h2>
        
        {/* Language Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="language-select" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Translate:
          </label>
          <select
            id="language-select"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-primary shadow-sm"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[150px]">
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <p className="text-sm font-medium text-primary animate-pulse">Translating document...</p>
          </div>
        )}
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {translated}
        </div>
      </div>
    </div>
  );
}