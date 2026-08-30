'use client';

interface VersionModalProps {
  versions: any[];
  onClose: () => void;
  onRollback: (version: any) => void;
}

export default function VersionModal({
  versions,
  onClose,
  onRollback,
}: VersionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold text-gray-900">Document Versions</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            &times;
          </button>
        </div>

        {/* Versions List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {versions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">No previous versions available.</p>
          ) : (
            versions.map((v) => (
              <div
                key={v.id}
                className="border border-gray-200 rounded-md p-3 flex flex-col gap-1.5 bg-gray-50 hover:bg-gray-100/60 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">
                    {v.created_at ? new Date(v.created_at).toLocaleString() : "Unknown date"}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary uppercase rounded">
                    {v.language || "en"}
                  </span>
                </div>
                
                <p className="text-xs text-gray-800 line-clamp-2">
                  <strong className="text-gray-900">EN:</strong> {v.english_text}
                </p>
                
                {v.language && v.language !== "en" && (
                  <p className="text-xs text-gray-800 line-clamp-2">
                    <strong className="text-gray-900">{v.language.toUpperCase()}:</strong> {v.translated_text}
                  </p>
                )}

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => onRollback(v)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium transition-colors shadow-sm"
                  >
                    Restore This Version
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t border-gray-100 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}