// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Market
 * @dev Individual prediction market contract
 */
contract Market is Ownable, ReentrancyGuard, Pausable {
    using Counters for Counters.Counter;

    // Events
    event BetPlaced(address indexed user, string outcome, uint256 amount, uint256 potentialPayout);
    event MarketResolved(string outcome);
    event PayoutClaimed(address indexed user, uint256 amount);
    event OutcomeAdded(string outcome);
    event LiquidityAdded(address indexed provider, uint256 amount);

    // Structs
    struct Outcome {
        string name;
        uint256 totalStake;
        uint256 totalBets;
        bool exists;
    }

    struct Bet {
        address user;
        string outcome;
        uint256 amount;
        uint256 potentialPayout;
        bool claimed;
        uint256 timestamp;
    }

    // State variables
    string public title;
    string public description;
    uint256 public endTime;
    string public resolvedOutcome;
    bool public resolved;
    uint256 public totalLiquidity;
    uint256 public totalVolume;
    
    mapping(string => Outcome) public outcomes;
    mapping(address => Bet[]) public userBets;
    mapping(address => uint256) public userTotalStake;
    
    string[] public outcomeNames;
    Counters.Counter private _betIdCounter;

    // Modifiers
    modifier marketActive() {
        require(!resolved, "Market already resolved");
        require(block.timestamp < endTime, "Market has ended");
        _;
    }

    modifier marketEnded() {
        require(block.timestamp >= endTime, "Market has not ended");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == owner(), "Only factory can call this");
        _;
    }

    // Constructor
    constructor(
        string memory _title,
        string memory _description,
        uint256 _endTime,
        string[] memory _outcomes,
        address _creator,
        address _factory
    ) {
        title = _title;
        description = _description;
        endTime = _endTime;
        
        for (uint i = 0; i < _outcomes.length; i++) {
            outcomes[_outcomes[i]] = Outcome({
                name: _outcomes[i],
                totalStake: 0,
                totalBets: 0,
                exists: true
            });
            outcomeNames.push(_outcomes[i]);
        }
        
        _transferOwnership(_factory);
    }

    /**
     * @dev Place a bet on an outcome
     * @param outcome Outcome to bet on
     */
    function placeBet(string memory outcome) external payable marketActive whenNotPaused nonReentrant {
        require(outcomes[outcome].exists, "Invalid outcome");
        require(msg.value > 0, "Bet amount must be greater than 0");

        // Calculate potential payout based on current odds
        uint256 potentialPayout = calculatePayout(outcome, msg.value);
        
        // Create bet
        Bet memory newBet = Bet({
            user: msg.sender,
            outcome: outcome,
            amount: msg.value,
            potentialPayout: potentialPayout,
            claimed: false,
            timestamp: block.timestamp
        });

        // Update state
        userBets[msg.sender].push(newBet);
        userTotalStake[msg.sender] += msg.value;
        outcomes[outcome].totalStake += msg.value;
        outcomes[outcome].totalBets++;
        totalVolume += msg.value;

        emit BetPlaced(msg.sender, outcome, msg.value, potentialPayout);
    }

    /**
     * @dev Calculate potential payout for a bet
     * @param outcome Outcome being bet on
     * @param amount Bet amount
     * @return Potential payout
     */
    function calculatePayout(string memory outcome, uint256 amount) public view returns (uint256) {
        uint256 totalStake = 0;
        uint256 outcomeStake = outcomes[outcome].totalStake;
        
        for (uint i = 0; i < outcomeNames.length; i++) {
            totalStake += outcomes[outcomeNames[i]].totalStake;
        }
        
        if (totalStake == 0) {
            return amount * 2; // 2x payout for first bet
        }
        
        // Simple odds calculation: (total pool / outcome stake) * bet amount
        return (totalStake * amount) / outcomeStake;
    }

    /**
     * @dev Resolve the market
     * @param outcome Winning outcome
     */
    function resolve(string memory outcome) external onlyFactory {
        require(!resolved, "Market already resolved");
        require(outcomes[outcome].exists, "Invalid outcome");
        require(block.timestamp >= endTime, "Market has not ended");
        
        resolvedOutcome = outcome;
        resolved = true;
        
        emit MarketResolved(outcome);
    }

    /**
     * @dev Claim payout for winning bets
     */
    function claimPayout() external nonReentrant {
        require(resolved, "Market not resolved");
        
        uint256 totalPayout = 0;
        Bet[] storage bets = userBets[msg.sender];
        
        for (uint i = 0; i < bets.length; i++) {
            if (!bets[i].claimed && keccak256(bytes(bets[i].outcome)) == keccak256(bytes(resolvedOutcome))) {
                totalPayout += bets[i].potentialPayout;
                bets[i].claimed = true;
            }
        }
        
        require(totalPayout > 0, "No payout to claim");
        
        payable(msg.sender).transfer(totalPayout);
        emit PayoutClaimed(msg.sender, totalPayout);
    }

    /**
     * @dev Add liquidity to the market
     */
    function addLiquidity() external payable whenNotPaused {
        require(msg.value > 0, "Liquidity amount must be greater than 0");
        totalLiquidity += msg.value;
        emit LiquidityAdded(msg.sender, msg.value);
    }

    /**
     * @dev Get user's bets
     * @param user User address
     * @return Array of user's bets
     */
    function getUserBets(address user) external view returns (Bet[] memory) {
        return userBets[user];
    }

    /**
     * @dev Get outcome details
     * @param outcome Outcome name
     * @return Outcome struct
     */
    function getOutcome(string memory outcome) external view returns (Outcome memory) {
        return outcomes[outcome];
    }

    /**
     * @dev Get all outcome names
     * @return Array of outcome names
     */
    function getOutcomeNames() external view returns (string[] memory) {
        return outcomeNames;
    }

    /**
     * @dev Get market statistics
     * @return Total volume, total liquidity, resolved status
     */
    function getMarketStats() external view returns (uint256, uint256, bool) {
        return (totalVolume, totalLiquidity, resolved);
    }

    /**
     * @dev Pause market
     */
    function pause() external onlyFactory {
        _pause();
    }

    /**
     * @dev Unpause market
     */
    function unpause() external onlyFactory {
        _unpause();
    }

    /**
     * @dev Emergency withdraw (only factory)
     */
    function emergencyWithdraw() external onlyFactory {
        payable(owner()).transfer(address(this).balance);
    }
}
