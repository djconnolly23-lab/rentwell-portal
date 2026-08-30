'use client';

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  onSign: (dataUrl: string) => void;
}

export default function SignaturePad({ onSign }: SignaturePadProps) {
  const sigRef = useRef<any>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const clear = () => {
    sigRef.current?.clear();
    setSuccessMsg(null);
  };

  const save = () => {
    if (sigRef.current?.isEmpty()) {
      alert("Please provide a signature before saving.");
      return;
    }
    const dataUrl = sigRef.current.toDataURL();
    onSign(dataUrl);
    setSuccessMsg("Signature captured successfully!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4 max-w-lg">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Sign Lease</h2>
        <p className="text-sm text-gray-500 mt-1">Please sign within the box below to authorize the agreement.</p>
      </div>

      {successMsg && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-200">
          {successMsg}
        </div>
      )}

      <div className="border border-gray-300 rounded-md overflow-hidden bg-gray-50 flex justify-center shadow-inner">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{ width: 450, height: 200, className: "cursor-crosshair w-full h-[200px]" }}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={clear}
          className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
        >
          Clear
        </button>
        <button
          onClick={save}
          className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}