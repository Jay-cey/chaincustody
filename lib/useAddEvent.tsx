"use client";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xChain..."; // replace with real contract address
const CONTRACT_ABI = [
  // Minimal ABI for addEvent(hash, metadata). Adjust types/signature to match your contract.
  "function addEvent(string hash, string metadata) public returns (bool)",
];

/**
 * useAddEvent
 *
 * Hook that provides an addEvent function to call the smart contract addEvent(hash, metadata).
 * Shows a loading state while processing and returns any error.
 *
 * Usage:
 * const { addEvent, loading, error } = useAddEvent();
 * await addEvent("0x123...", { action: "Received", notes: "..." });
 */
export function useAddEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function addEvent(
    hash: string,
    metadata: string | Record<string, unknown>,
    onTxHash?: (txHash: string) => void
  ): Promise<string> {
    setError(null);
    setLoading(true);

    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        throw new Error("No Web3 provider found. Install MetaMask or provide a provider.");
      }

      // Request accounts (wallet popup)
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const metadataStr = typeof metadata === "string" ? metadata : JSON.stringify(metadata);

      // Call contract
      const tx = await contract.addEvent(hash, metadataStr);
      if (onTxHash) onTxHash(tx.hash);

      // Wait for confirmation
      await tx.wait();

      setLoading(false);
      return tx.hash;
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setLoading(false);
      throw err;
    }
  }

  return { addEvent, loading, error };
}

export default useAddEvent;
