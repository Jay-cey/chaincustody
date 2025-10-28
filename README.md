----
# ChainCustody 🔗

[!Build Status](https://github.com/your-username/chaincustody/actions)
[!License: MIT](https://opensource.org/licenses/MIT)
[!Solidity](#)
[!Next.js](https://nextjs.org/)

A decentralized evidence management system providing an immutable, verifiable chain of custody for digital evidence using blockchain technology.



## Overview

ChainCustody empowers law enforcement agencies, forensic labs, and legal teams to maintain a transparent and tamper-proof custody trail for digital evidence. By leveraging the Ethereum blockchain, it guarantees the integrity and chronological history of every piece of evidence from collection to courtroom.

### Live Demo

*   **Main Application**: app.chaincustody.com
*   **Public Verification Portal**: verify.chaincustody.com

## Core Features

*   🔒 **End-to-End Encrypted Evidence Handling**: Securely upload and manage evidence with client-side encryption. Supports multi-file drag & drop (up to 200MB per file).
*   📍 **Automated Metadata Capture**: Automatically records GPS location, timestamps, and user details upon evidence submission.
*   ⛓️ **Immutable Blockchain Ledger**: Every custody event—from submission to transfer—is permanently recorded as a transaction on the Ethereum blockchain.
*   🔍 **Public Verification**: Anyone can independently verify an evidence item's history using its unique hash, without accessing the sensitive data itself.
*   🔐 **Role-Based Access Control**: Smart contract-level permissions ensure that only authorized individuals can update an evidence item's custody chain.
*    timeline.
*   📱 **Modern & Responsive UI**: A sleek, dark-themed interface designed for clarity and ease of use on both desktop and mobile devices.

## Architecture

ChainCustody is built on a decoupled architecture:

1.  **Frontend (Next.js)**: A responsive web application for user interaction, evidence management, and wallet integration (via ethers.js).
2.  **Smart Contract (Solidity)**: The on-chain logic that governs the chain of custody, deployed on the Ethereum network. It acts as the single source of truth for all custody events.
3.  **Decentralized Storage (IPFS/Arweave)**: Encrypted evidence files are stored off-chain to ensure privacy and reduce blockchain bloat. Only the hash of the file is stored on-chain.

## Getting Started

### Prerequisites

*   Node.js (v18.x or later)
*   Yarn or npm
*   MetaMask browser extension
*   A testnet RPC URL and private key (e.g., from Alchemy or Infura)

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chaincustody.git
cd chaincustody

# Install frontend and smart contract dependencies
npm install
```

### 2. Smart Contract Deployment

```bash
# Compile the smart contracts
npx hardhat compile

# Deploy to a testnet (e.g., Sepolia)
# Ensure your hardhat.config.js is set up with your RPC URL and private key
npx hardhat run scripts/deploy.ts --network sepolia
```

Take note of the deployed contract address.

### 3. Environment Setup

Create a `.env.local` file in the root directory by copying the example file:

```bash
copy .env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Smart Contract (Required)
NEXT_PUBLIC_CONTRACT_ADDRESS="0x..."    # Address from the deployment step
NEXT_PUBLIC_RPC_URL="https://..."       # Your testnet RPC endpoint

# Decentralized Storage (e.g., Pinata for IPFS)
STORAGE_API_KEY="your_api_key"
STORAGE_API_SECRET="your_api_secret"
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser. Connect your MetaMask wallet to the configured testnet to begin.

## Testing

### Smart Contract Tests

Run the full suite of Solidity tests using Hardhat:

```bash
npx hardhat test
```

### Frontend Tests

Run end-to-end tests with Cypress:

```bash
npm run cypress:open
```

## Deployment

The application is optimized for deployment on Vercel.

1.  Push your code to a Git repository (GitHub, GitLab, etc.).
2.  Import the repository into Vercel.
3.  Add the environment variables from your `.env.local` file to the Vercel project settings.
4.  Deploy! Vercel will automatically build and deploy your Next.js application.

## API Reference

### Public Verification

A public GET endpoint is available for third-party verification.

`GET /api/verify?hash=<evidence_hash>`

**Response:**

```json
{
  "isValid": true,
  "evidenceHash": "0x...",
  "custodyChain": [
    {
      "actionType": "SUBMITTED",
      "timestamp": 1672531200,
      "signer": "0x..."
    },
    {
      "actionType": "TRANSFERRED",
      "timestamp": 1672617600,
      "signer": "0x..."
    }
  ]
}
```

## Security

*   **Client-Side Encryption**: Evidence files are encrypted in the browser before being sent to storage, ensuring the server and storage provider never see plaintext data.
*   **Smart Contract Ownership**: The `ChainOfCustody` contract uses OpenZeppelin's `Ownable` pattern to restrict administrative functions.
*   **Data Privacy**: Only cryptographic hashes of evidence and metadata are stored on-chain, preserving the privacy of the underlying data.
*   **Signature Verification**: All state changes to the custody chain require a valid cryptographic signature from an authorized party.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/new-enhancement`).
3.  Commit your changes (`git commit -m 'Add some new enhancement'`).
4.  Push to the branch (`git push origin feature/new-enhancement`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

*   Built with OpenZeppelin Contracts.
*   UI components inspired by shadcn/ui.
*   Blockchain integration powered by ethers.js and Hardhat.

---

> **Note**: This project is under active development. Features and documentation may change.