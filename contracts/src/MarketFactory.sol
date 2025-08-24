// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./Market.sol";

/**
 * @title MarketFactory
 * @dev Factory contract for creating prediction markets
 */
contract MarketFactory is Ownable, ReentrancyGuard, Pausable {
    // Events
    event MarketCreated(address indexed market, address indexed creator, string title);
    event MarketResolved(address indexed market, string outcome);
    event FeeUpdated(uint256 newFee);
    event Paused(address account);
    event Unpaused(address account);

    // State variables
    uint256 public creationFee = 0.01 ether;
    uint256 public totalMarkets;
    mapping(address => bool) public authorizedCreators;
    mapping(address => address[]) public creatorMarkets;

    // Modifiers
    modifier onlyAuthorized() {
        require(authorizedCreators[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    // Constructor
    constructor() {
        authorizedCreators[msg.sender] = true;
    }

    /**
     * @dev Create a new prediction market
     * @param title Market title
     * @param description Market description
     * @param endTime Market end time
     * @param outcomes Array of possible outcomes
     */
    function createMarket(
        string memory title,
        string memory description,
        uint256 endTime,
        string[] memory outcomes
    ) external payable onlyAuthorized whenNotPaused nonReentrant returns (address) {
        require(msg.value >= creationFee, "Insufficient creation fee");
        require(endTime > block.timestamp, "End time must be in the future");
        require(outcomes.length >= 2, "Must have at least 2 outcomes");
        require(bytes(title).length > 0, "Title cannot be empty");

        // Create new market
        Market market = new Market(
            title,
            description,
            endTime,
            outcomes,
            msg.sender,
            address(this)
        );

        // Update state
        totalMarkets++;
        creatorMarkets[msg.sender].push(address(market));
        authorizedCreators[address(market)] = true;

        emit MarketCreated(address(market), msg.sender, title);

        return address(market);
    }

    /**
     * @dev Resolve a market (only owner or market creator)
     * @param market Market address
     * @param outcome Winning outcome
     */
    function resolveMarket(address market, string memory outcome) external onlyAuthorized {
        Market(market).resolve(outcome);
        emit MarketResolved(market, outcome);
    }

    /**
     * @dev Add authorized creator
     * @param creator Address to authorize
     */
    function addAuthorizedCreator(address creator) external onlyOwner {
        authorizedCreators[creator] = true;
    }

    /**
     * @dev Remove authorized creator
     * @param creator Address to remove authorization
     */
    function removeAuthorizedCreator(address creator) external onlyOwner {
        authorizedCreators[creator] = false;
    }

    /**
     * @dev Update creation fee
     * @param newFee New fee amount
     */
    function updateCreationFee(uint256 newFee) external onlyOwner {
        creationFee = newFee;
        emit FeeUpdated(newFee);
    }

    /**
     * @dev Get markets created by an address
     * @param creator Creator address
     * @return Array of market addresses
     */
    function getCreatorMarkets(address creator) external view returns (address[] memory) {
        return creatorMarkets[creator];
    }

    /**
     * @dev Pause contract
     */
    function pause() external onlyOwner {
        _pause();
        emit Paused(msg.sender);
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
        emit Unpaused(msg.sender);
    }

    /**
     * @dev Withdraw fees
     */
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @dev Get market count
     */
    function getMarketCount() external view returns (uint256) {
        return totalMarkets;
    }
}
