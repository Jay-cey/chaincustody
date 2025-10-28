/**
 * @file EthersService.ts
 * @notice This file contains placeholder functions for interacting with the
 * ChainOfCustody smart contract. It simulates network delays and returns mock data,
 * allowing for frontend development without a live blockchain connection.
 */

// This interface should match the structure of the CustodyEvent struct in your Solidity contract.
// We'll use a simplified version for this mock service.
export interface MockCustodyEvent {
  event: string;
  timestamp: string;
  officerId: string;
  status: "VERIFIED" | "PENDING";
}

/**
 * Simulates fetching the chain of custody for a given evidence hash from the blockchain.
 * @param hash The evidence hash to look up.
 * @returns A promise that resolves with an array of mock custody events after a 2-second delay.
 */
export async function getChainOfCustody(hash: string): Promise<MockCustodyEvent[]> {
  console.log(`Fetching chain of custody for hash: ${hash}`);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2s delay

  const mockEvents: MockCustodyEvent[] = [
    { event: "Submitted", timestamp: "2025-10-20 10:12:34 UTC", officerId: "Officer_01", status: "VERIFIED" },
    { event: "Received for testing", timestamp: "2025-10-21 14:05:12 UTC", officerId: "Forensics_Lab_A", status: "VERIFIED" },
    { event: "Transferred to Prosecutor", timestamp: "2025-10-25 09:22:01 UTC", officerId: "Officer_02", status: "PENDING" },
  ];
  return mockEvents;
}

/**
 * Simulates submitting a new evidence event to the blockchain.
 * @param data The form data for the new event.
 * @returns A promise that resolves with a mock transaction hash after a 3-second delay.
 */
export async function submitNewEvent(data: FormData): Promise<string> {
  console.log("Simulating submission of new event:", Object.fromEntries(data.entries()));
  await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate 3s delay
  const mockHash = "0x" + Array.from({ length: 32 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
  return mockHash;
}