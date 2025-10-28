"use client";
import { useState } from "react";
import UploadForm from "../components/UploadForm";
import SuccessCard from "../components/SuccessCard";

export default function UploadPage() {
  const [resultHash, setResultHash] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Evidence Submission</h1>
      {!resultHash ? (
        <UploadForm onSuccess={(hash) => setResultHash(hash)} />
      ) : (
        <SuccessCard hash={resultHash} onReset={() => setResultHash(null)} />
      )}
    </div>
    
  );
}