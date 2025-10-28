// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ChainOfCustody
 * @author Gemini Code Assist
 * @notice A smart contract for creating a secure, immutable, and auditable
 * log for tracking legal evidence on an EVM-compatible blockchain.
 *
 * This contract uses the Ownable pattern to restrict evidence submission and
 * updates to a designated administrative address (e.g., a police department).
 * Each piece of evidence is tracked by its unique hash, and its history is
 * stored as an append-only array of custody events.
 */
contract ChainOfCustody is Ownable {
    /**
     * @dev Represents a single event in the custody chain of a piece of evidence.
     * @param timestamp The block timestamp when the event was recorded.
     * @param signer The address of the user/entity responsible for the event.
     * @param actionType A description of the action (e.g., "UPLOAD", "TRANSFER").
     * @param metadataHash A cryptographic hash of off-chain metadata associated with this event.
     */
    struct CustodyEvent {
        uint256 timestamp;
        address signer;
        string actionType;
        bytes32 metadataHash;
    }

    /**
     * @dev Maps a unique evidence hash to its full chain of custody events.
     * The key is the initial hash of the evidence.
     */
    mapping(bytes32 => CustodyEvent[]) public evidenceChains;

    /**
     * @dev Emitted when a new piece of evidence is first submitted to the contract.
     * @param evidenceHash The unique hash identifying the evidence.
     * @param signer The address that submitted the evidence (the contract owner).
     */
    event EvidenceSubmitted(bytes32 indexed evidenceHash, address indexed signer);

    /**
     * @dev Emitted when a new custody event is added to an existing evidence chain.
     * @param evidenceHash The unique hash identifying the evidence.
     * @param signer The address that added the event (the contract owner).
     * @param actionType The type of action performed.
     */
    event CustodyEventAdded(bytes32 indexed evidenceHash, address indexed signer, string actionType);

    /**
     * @dev Initializes the contract, setting the deployer as the initial owner.
     */
    constructor() Ownable(msg.sender) {}

    /**
     * @notice Submits the first record for a new piece of evidence. Can only be called by the owner.
     * @dev Creates a new custody chain for the given evidence hash.
     * @param _evidenceHash The unique hash of the evidence being submitted.
     * @param _actionType The initial action, typically "UPLOAD" or "INTAKE".
     */
    function submitInitialEvidence(bytes32 _evidenceHash, string memory _actionType) external onlyOwner {
        require(evidenceChains[_evidenceHash].length == 0, "ChainOfCustody: Evidence hash already exists.");

        CustodyEvent memory firstEvent = CustodyEvent({
            timestamp: block.timestamp,
            signer: msg.sender,
            actionType: _actionType,
            metadataHash: _evidenceHash // The initial metadata hash is the evidence hash itself.
        });

        evidenceChains[_evidenceHash].push(firstEvent);
        emit EvidenceSubmitted(_evidenceHash, msg.sender);
    }

    /**
     * @notice Adds a new event to an existing evidence chain. Can only be called by the owner.
     * @param _evidenceHash The hash of the evidence to which this event is being added.
     * @param _newMetadataHash A hash of any new off-chain metadata for this event.
     * @param _actionType The action being recorded (e.g., "TRANSFER", "ANALYSIS_COMPLETE").
     */
    function addCustodyEvent(bytes32 _evidenceHash, bytes32 _newMetadataHash, string memory _actionType) external onlyOwner {
        require(evidenceChains[_evidenceHash].length > 0, "ChainOfCustody: Evidence hash does not exist.");

        evidenceChains[_evidenceHash].push(CustodyEvent(block.timestamp, msg.sender, _actionType, _newMetadataHash));
        emit CustodyEventAdded(_evidenceHash, msg.sender, _actionType);
    }

    /**
     * @notice Retrieves the full custody chain for a given evidence hash.
     * @param _evidenceHash The hash of the evidence to query.
     * @return An array of all custody events associated with the hash.
     */
    function getChain(bytes32 _evidenceHash) external view returns (CustodyEvent[] memory) {
        return evidenceChains[_evidenceHash];
    }
}