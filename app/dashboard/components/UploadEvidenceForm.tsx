"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * UploadEvidenceForm
 *
 * - Uses shadcn/ui components for inputs/buttons/card
 * - Client-side validation (required fields, file type/size limits)
 * - Drag & drop file dropzone (multiple files)
 * - Visible GPS coordinate input with "Use current location" button (uses Geolocation API, falls back to dummy)
 *
 * Props:
 *  - onSuccess(hash: string): called with evidence hash after simulated upload
 *
 * Notes:
 *  - This component avoids external deps like react-hook-form or zod to be drop-in friendly.
 *  - If you use different import paths for shadcn/ui components in your project, adjust imports accordingly.
 */

type Props = {
  onSuccess: (hash: string) => void;
};

type FileWithMeta = {
  file: File;
  id: string;
  error?: string | null;
};

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MB per file
const MAX_FILES = 10;
const ACCEPTED_MIME = ["image/*", "video/*", "application/pdf"];

function bytesToHuman(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function makeId() {
  // small unique id for UI
  return Math.random().toString(36).slice(2, 9);
}

/** Simple MIME acceptance check */
function fileAccepted(file: File) {
  // Accept images/videos and pdf; use a simple check allowing any image/* or video/* or pdf
  if (file.type.startsWith("image/")) return true;
  if (file.type.startsWith("video/")) return true;
  if (file.type === "application/pdf") return true;
  // fallback: accept if extension matches common ones
  const name = file.name.toLowerCase();
  return /\.(jpg|jpeg|png|gif|mp4|mov|avi|mkv|pdf)$/i.test(name);
}

export default function UploadEvidenceForm({ onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [caseId, setCaseId] = useState("");
  const [description, setDescription] = useState("");
  const [gps, setGps] = useState("40.7128° N, 74.0060° W"); // default dummy coords
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const [files, setFiles] = useState<FileWithMeta[]>([]);
  const [fileErrors, setFileErrors] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Drag state for styling
  const [isDragActive, setIsDragActive] = useState(false);

  function handleFileList(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    if (files.length + incoming.length > MAX_FILES) {
      setFileErrors(`Max ${MAX_FILES} files allowed.`);
      return;
    }
    const newFiles: FileWithMeta[] = incoming.map((f) => {
      let error: string | null = null;
      if (!fileAccepted(f)) error = "Unsupported file type";
      if (f.size > MAX_FILE_SIZE) error = `File too large (max ${bytesToHuman(MAX_FILE_SIZE)})`;
      return { file: f, id: makeId(), error };
    });
    setFiles((prev) => [...prev, ...newFiles]);
    setFileErrors(null);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleUseCurrentLocation() {
    if (!("geolocation" in navigator)) {
      setGps("Unavailable");
      return;
    }
    setIsFetchingLocation(true);
    setFormErrors((p) => ({ ...p, gps: "" }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGps(`${latitude.toFixed(6)} , ${longitude.toFixed(6)}`);
        setIsFetchingLocation(false);
      },
      (err) => {
        // fallback dummy
        setGps("40.7128° N, 74.0060° W");
        setIsFetchingLocation(false);
        setFormErrors((p) => ({ ...p, gps: "Unable to fetch precise location (permission denied or unavailable)." }));
      },
      { enableHighAccuracy: true, maximumAge: 1000 * 60 * 5, timeout: 10000 }
    );
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (!caseId.trim()) errors.caseId = "Case ID is required.";
    if (!description.trim()) errors.description = "Evidence description is required.";
    if (files.length === 0) errors.files = "At least one file is required.";
    const hasFileErrors = files.some((f) => f.error);
    if (hasFileErrors) errors.files = "One or more attached files have errors.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function clearAll() {
    setCaseId("");
    setDescription("");
    setFiles([]);
    setFormErrors({});
    setFileErrors(null);
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);

    try {
      // simulate upload + onchain registration
      // In production, replace with actual multipart upload + chain tx
      await new Promise((r) => setTimeout(r, 1100 + Math.random() * 800));

      // Generate a secure-ish random hex hash (mock)
      const arr = new Uint8Array(16);
      crypto.getRandomValues(arr);
      const hash = "0x" + Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");

      // Optionally: upload files to server / IPFS here...

      onSuccess(hash);
      clearAll();
    } catch (err) {
      setFormErrors({ submit: "Upload failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="bg-gray-800 border border-gray-700 p-6">
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        <div>
          <Label htmlFor="caseId" className="text-sm">
            Case ID
          </Label>
          <Input
            id="caseId"
            value={caseId}
            onChange={(e) => {
              setCaseId(e.target.value);
              setFormErrors((p) => ({ ...p, caseId: "" }));
            }}
            placeholder="Enter case identifier (required)"
            className="mt-1 bg-gray-900 border-gray-700 text-gray-100"
          />
          {formErrors.caseId && <p className="mt-1 text-sm text-red-400">{formErrors.caseId}</p>}
        </div>

        <div>
          <Label htmlFor="description" className="text-sm">
            Evidence Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setFormErrors((p) => ({ ...p, description: "" }));
            }}
            placeholder="Describe the evidence, condition, and any notes (required)"
            rows={4}
            className="mt-1 bg-gray-900 border-gray-700 text-gray-100"
          />
          {formErrors.description && <p className="mt-1 text-sm text-red-400">{formErrors.description}</p>}
        </div>

        <div>
          <Label className="text-sm">Files / Videos (images, video, pdf)</Label>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragActive(false);
              handleFileList(e.dataTransfer.files);
            }}
            className={cn(
              "mt-2 w-full border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors",
              isDragActive ? "border-green-500 bg-gray-800/60" : "border-gray-600 bg-gray-900"
            )}
            aria-hidden
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_MIME.join(",")}
              onChange={(e) => handleFileList(e.target.files)}
              className="hidden"
            />
            <div className="text-sm text-gray-300">Drag & drop files here, or click to browse</div>
            <div className="text-xs text-gray-500 mt-1">Max {MAX_FILES} files • Max {bytesToHuman(MAX_FILE_SIZE)} each</div>
          </div>

          {fileErrors && <p className="mt-2 text-sm text-red-400">{fileErrors}</p>}
          {formErrors.files && <p className="mt-2 text-sm text-red-400">{formErrors.files}</p>}

          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-3 bg-gray-900 border border-gray-700 rounded px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-100 truncate">{f.file.name}</div>
                    <div className="text-xs text-gray-400">
                      {bytesToHuman(f.file.size)} • {f.file.type || "unknown type"}
                      {f.error && <span className="text-red-400 ml-2">• {f.error}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeFile(f.id)}
                      className="text-sm px-2 py-1 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300"
                      aria-label={`Remove ${f.file.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-2">
            <Label htmlFor="gps" className="text-sm">
              Current GPS Location
            </Label>
            <Input
              id="gps"
              value={gps}
              onChange={(e) => setGps(e.target.value)}
              className="mt-1 bg-gray-900 border-gray-700 text-gray-100"
              placeholder="Latitude, Longitude"
            />
            {formErrors.gps && <p className="mt-1 text-sm text-red-400">{formErrors.gps}</p>}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleUseCurrentLocation}
              className="w-full"
              disabled={isFetchingLocation}
            >
              {isFetchingLocation ? "Fetching..." : "Use current location"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setGps("40.7128° N, 74.0060° W");
                setFormErrors((p) => ({ ...p, gps: "" }));
              }}
              className="w-full"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-500"
            >
              {submitting ? "Submitting..." : "Submit Evidence"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={clearAll}
              disabled={submitting}
            >
              Clear
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            <div>Files: {files.length}</div>
          </div>
        </div>

        {formErrors.submit && <p className="text-sm text-red-400">{formErrors.submit}</p>}
      </form>
    </Card>
  );
}