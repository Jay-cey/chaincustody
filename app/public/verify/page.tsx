"use client";
import { useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; message: string }>(null);

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    // Mock verification: treat hashes starting with 0x7 as valid
    await new Promise((r) => setTimeout(r, 700));
    const ok = hash.trim().startsWith("0x7");
    setLoading(false);
    setResult(ok ? { ok: true, message: "VERIFIED. Immutable chain of custody confirmed." } : { ok: false, message: "ERROR. Hash not found or chain broken." });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-xl bg-gray-800 border border-gray-700 rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-100">Public Verification</h1>
        <form onSubmit={onSearch} className="flex gap-3">
          <input
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Enter Evidence Hash"
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100"
          />
          <button disabled={!hash || loading} className={`px-4 py-2 rounded ${!hash || loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-500"}`}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="mt-6">
          {result && result.ok && (
            <div className="text-green-400 text-lg font-bold">{result.message}</div>
          )}
          {result && !result.ok && (
            <div className="text-red-400 text-lg font-bold">{result.message}</div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-400">
          For more details visit <Link href="/dashboard/upload" className="text-blue-400">Dashboard</Link>.
        </div>
      </div>
    </div>
  );
}