"use client";
import Link from "next/link";

export default function SuccessCard({ hash, onReset }: { hash: string; onReset: () => void }) {
  return (
    <div className="bg-green-900/20 border border-green-700 p-6 rounded">
      <h2 className="text-xl font-bold text-green-300 mb-2">Evidence Submitted</h2>
      <p className="mb-4 text-sm text-gray-200">Evidence registered on-chain. Use the hash below to view chain of custody.</p>
      <div className="bg-gray-900 px-4 py-3 rounded border border-gray-700 font-mono text-sm text-green-200">{hash}</div>
      <div className="mt-4 flex gap-3">
        <Link href={`/dashboard/custody/${encodeURIComponent(hash)}`} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700">
          View Chain
        </Link>
        <button onClick={onReset} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700">
          Submit Another
        </button>
      </div>
    </div>
  );
}