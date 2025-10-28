"use client";
import React from "react";

export type CustodyEvent = {
  id?: string;
  event: string;
  timestamp: string; // ISO or UTC string
  officerId: string;
  // prefer status or verified flag from your backend
  status?: "VERIFIED" | "PENDING" | "REJECTED" | "FAILED";
  verified?: boolean;
  details?: string;
};

function formatUtcTimestamp(input: string) {
  try {
    const d = new Date(input);
    if (isNaN(d.getTime())) return input;
    const YYYY = d.getUTCFullYear();
    const MM = String(d.getUTCMonth() + 1).padStart(2, "0");
    const DD = String(d.getUTCDate()).padStart(2, "0");
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss} UTC`;
  } catch {
    return input;
  }
}

function VerificationBadge({ verified, status }: { verified?: boolean; status?: CustodyEvent["status"] }) {
  const isVerified = verified ?? status === "VERIFIED";
  const isPending = status === "PENDING";
  if (isVerified) {
    return (
      <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-semibold bg-green-700 text-green-100">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        VERIFIED
      </span>
    );
  }
  if (isPending) {
    return (
      <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-semibold bg-yellow-700 text-yellow-100">
        PENDING
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-semibold bg-red-700 text-red-100">
      NOT VERIFIED
    </span>
  );
}

export default function ChainTimeline({ events }: { events: CustodyEvent[] }) {
  if (!events || events.length === 0) {
    return <div className="text-sm text-gray-400">No custody events available.</div>;
  }

  return (
    <ol className="relative border-l border-gray-700 ml-2 pl-6 space-y-6">
      {events.map((ev, idx) => {
        const key = ev.id ?? `${idx}-${ev.timestamp}`;
        return (
          <li key={key} className="relative">
            {/* marker */}
            <span
              className={`absolute -left-3 top-1.5 w-6 h-6 rounded-full flex items-center justify-center ${
                ev.verified || ev.status === "VERIFIED" ? "bg-green-600" : ev.status === "PENDING" ? "bg-yellow-600" : "bg-red-600"
              } ring-4 ring-gray-900`}
              aria-hidden
            >
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                {ev.verified || ev.status === "VERIFIED" ? (
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : ev.status === "PENDING" ? (
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </span>

            <div className="bg-gray-800 border border-gray-700 rounded-md p-4 pl-6 md:flex md:items-start md:justify-between">
              <div className="md:flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-100">{ev.event}</div>
                    {ev.details ? <div className="text-xs text-gray-400 mt-1">{ev.details}</div> : null}
                  </div>

                  <div className="md:hidden mt-2">
                    <VerificationBadge verified={ev.verified} status={ev.status} />
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-400 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  <div>
                    <span className="font-medium text-gray-300">Timestamp: </span>
                    <span>{formatUtcTimestamp(ev.timestamp)}</span>
                  </div>

                  <div>
                    <span className="font-medium text-gray-300">Officer: </span>
                    <span>{ev.officerId}</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex md:items-start md:justify-end md:ml-6">
                <VerificationBadge verified={ev.verified} status={ev.status} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}