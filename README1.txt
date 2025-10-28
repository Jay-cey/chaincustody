# ChainCustody 🔗

A decentralized evidence management system providing immutable chain of custody tracking for digital evidence using blockchain technology.

## Overview

ChainCustody helps law enforcement agencies, forensic labs, and legal teams maintain verifiable custody trails for digital evidence. Built on Ethereum, it ensures transparency while protecting evidence integrity.

## Features

- 🔒 **Secure Evidence Upload**
  - Multi-file upload with drag & drop support (up to 200MB per file)
  - Automatic GPS location capture
  - Strict file validation (images, videos, PDFs)
  - Encrypted storage

- ⛓️ **Blockchain Integration**
  - Immutable custody events stored on Ethereum
  - Timestamp and signer verification
  - Public verification portal
  - OpenZeppelin-powered smart contracts

- 📱 **Modern UI/UX**
  - Responsive dark theme design
  - Real-time upload feedback
  - Interactive custody timeline
  - Clear verification badges

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/chaincustody.git

# Install dependencies
cd chaincustody
npm install

# Create environment file
copy .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
chaincustody/
├── app/                    # Next.js 14 app router
│   ├── dashboard/         # Protected routes
│   │   ├── upload/       # Evidence submission
│   │   └── custody/      # Chain viewer
│   └── public/           # Public verification
├── components/            # React components
│   ├── ui/              # Base UI components
│   └── shared/          # Shared components
├── contracts/            # Solidity contracts
├── lib/                  # Utilities & hooks
└── styles/              # Global styles
```

## Smart Contract

The `ChainOfCustody.sol` contract manages the evidence chain:

```solidity
interface IChainOfCustody {
    function submitInitialEvidence(bytes32 _evidenceHash, string memory _actionType) external;
    function addCustodyEvent(bytes32 _evidenceHash, bytes32 _newMetadataHash, string memory _actionType) external;
    function getChain(bytes32 _evidenceHash) external view returns (CustodyEvent[] memory);
}
```

### Key Features
- Evidence submission with unique hashes
- Append-only custody event logs
- Owner-controlled access
- Public verification methods

## Environment Setup

Required environment variables in `.env.local`:

```bash
# Smart Contract (Required)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...    # Deployed contract address
NEXT_PUBLIC_RPC_URL=https://...       # Ethereum RPC endpoint

# Optional Storage Config
STORAGE_API_KEY=                      # If using IPFS/Arweave
```

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Solidity ^0.8.20, OpenZeppelin, ethers.js
- **Testing**: Hardhat
- **UI Components**: Custom Tailwind components

## Development Status

- [x] Core smart contract
- [x] Frontend components
- [x] Evidence upload flow
- [x] Chain of custody viewer
- [ ] Public verification API
- [ ] Secure storage integration
- [ ] Contract testing
- [ ] Production deployment

## Security Notes

- Evidence files are encrypted before storage
- Smart contract includes access controls
- Metadata hashing preserves privacy
- Public verification without data exposure

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

---

> **Note**: This project is under active development. Features and documentation may change.