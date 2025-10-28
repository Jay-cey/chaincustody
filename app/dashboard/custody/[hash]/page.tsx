"use client";
import EvidenceHeaderCard from "../../components/EvidenceHeaderCard";
import ChainTimeline from "../../components/ChainTimeline";

type Props = {
  params: { hash: string };
};

export default function CustodyPage({ params }: Props) {
  const { hash } = params;

  // Mocked events — replace with API call
  const events = [
    { event: "Submitted", timestamp: "2025-10-20 10:12:34 UTC", signer: "Officer_01", status: "VERIFIED" },
    { event: "Received for testing", timestamp: "2025-10-21 14:05:12 UTC", signer: "Forensics_Lab_A", status: "VERIFIED" },
    { event: "Transferred to Prosecutor", timestamp: "2025-10-25 09:22:01 UTC", signer: "Officer_02", status: "PENDING" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <EvidenceHeaderCard hash={hash} caseId={"CASE-1234"} holder={"Forensics Lab A"} />
      <div className="mt-6">
        <ChainTimeline events={events} />
      </div>
    </div>
  );
}