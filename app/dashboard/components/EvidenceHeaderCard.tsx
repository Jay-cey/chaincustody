"use client";

export default function EvidenceHeaderCard({ hash, caseId, holder }: { hash: string; caseId: string; holder: string }) {
  return (
    <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm text-gray-400">Evidence Hash</div>
          <div className="font-mono text-lg text-green-200 break-all">{hash}</div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-400">Case ID</div>
          <div className="text-gray-100 font-medium">{caseId}</div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-400">Current Holder</div>
          <div className="text-gray-100 font-medium">{holder}</div>
        </div>
      </div>
    </div>
  );
}