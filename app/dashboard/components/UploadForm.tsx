"use client";
import { useRef, useState } from "react";

type Props = {
  onSuccess: (hash: string) => void;
};

export default function UploadForm({ onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [caseId, setCaseId] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const dummyGPS = "40.7128° N, 74.0060° W";

  function handleFiles(filesList: FileList | null) {
    if (!filesList) return;
    setFiles((prev) => [...prev, ...Array.from(filesList)]);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!files.length) return;
    setLoading(true);

    // Simulate upload + chain registration
    await new Promise((r) => setTimeout(r, 900));
    // generate mock hash
    const hash = "0x" + Math.random().toString(16).slice(2, 10);
    setLoading(false);
    onSuccess(hash);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div>
        <label className="block text-sm font-medium mb-1">Case ID</label>
        <input
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          required
          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Evidence Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Files / Videos</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          className="w-full border-2 border-dashed border-gray-600 rounded p-6 text-center cursor-pointer bg-gray-900 hover:border-gray-500"
        >
          <p className="text-sm text-gray-300">Drag & drop files here or click to select</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex justify-between text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded px-3 py-2">
                <span className="truncate">{f.name}</span>
                <span className="ml-4 text-gray-400">{(f.size / 1024).toFixed(1)} KB</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Current GPS Location</label>
        <input readOnly value={dummyGPS} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={!files.length || loading}
          className={`px-4 py-2 rounded font-medium ${!files.length || loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"}`}
        >
          {loading ? "Submitting..." : "Submit Evidence"}
        </button>

        <button
          type="button"
          onClick={() => {
            setFiles([]);
            setCaseId("");
            setDescription("");
          }}
          className="text-sm text-gray-400 hover:text-gray-200"
        >
          Reset
        </button>
      </div>
    </form>
  );
}