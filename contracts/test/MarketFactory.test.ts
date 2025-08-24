import { expect } from "chai";
import { ethers } from "hardhat";
// import { MarketFactory, Market } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import "@nomicfoundation/hardhat-chai-matchers";

describe("MarketFactory", function () {
  let marketFactory: any;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const MarketFactory = await ethers.getContractFactory("MarketFactory");
    marketFactory = await MarketFactory.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await marketFactory.owner()).to.equal(owner.address);
    });

    it("Should authorize the owner as creator", async function () {
      expect(await marketFactory.authorizedCreators(owner.address)).to.be.true;
    });

    it("Should set initial creation fee", async function () {
      expect(await marketFactory.creationFee()).to.equal(ethers.parseEther("0.01"));
    });
  });

  describe("Market Creation", function () {
    const title = "Will Kenya win AFCON 2025?";
    const description = "Test market for AFCON 2025";
    const endTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
    const outcomes = ["YES", "NO"];

    it("Should create a market with valid parameters", async function () {
      const tx = await marketFactory.createMarket(
        title,
        description,
        endTime,
        outcomes,
        { value: ethers.parseEther("0.01") }
      );

      const receipt = await tx.wait();
      const event = receipt?.logs[0];
      
      expect(event).to.not.be.undefined;
      expect(await marketFactory.totalMarkets()).to.equal(1);
    });

    it("Should fail if creation fee is insufficient", async function () {
      await expect(
        marketFactory.createMarket(
          title,
          description,
          endTime,
          outcomes,
          { value: ethers.parseEther("0.005") }
        )
      ).to.be.revertedWith("Insufficient creation fee");
    });

    it("Should fail if end time is in the past", async function () {
      const pastTime = Math.floor(Date.now() / 1000) - 86400; // 24 hours ago
      
      await expect(
        marketFactory.createMarket(
          title,
          description,
          pastTime,
          outcomes,
          { value: ethers.parseEther("0.01") }
        )
      ).to.be.revertedWith("End time must be in the future");
    });

    it("Should fail if less than 2 outcomes", async function () {
      await expect(
        marketFactory.createMarket(
          title,
          description,
          endTime,
          ["YES"],
          { value: ethers.parseEther("0.01") }
        )
      ).to.be.revertedWith("Must have at least 2 outcomes");
    });

    it("Should fail if title is empty", async function () {
      await expect(
        marketFactory.createMarket(
          "",
          description,
          endTime,
          outcomes,
          { value: ethers.parseEther("0.01") }
        )
      ).to.be.revertedWith("Title cannot be empty");
    });

    it("Should fail if not authorized", async function () {
      await expect(
        marketFactory.connect(user1).createMarket(
          title,
          description,
          endTime,
          outcomes,
          { value: ethers.parseEther("0.01") }
        )
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Authorization", function () {
    it("Should allow owner to add authorized creator", async function () {
      await marketFactory.addAuthorizedCreator(user1.address);
      expect(await marketFactory.authorizedCreators(user1.address)).to.be.true;
    });

    it("Should allow owner to remove authorized creator", async function () {
      await marketFactory.addAuthorizedCreator(user1.address);
      await marketFactory.removeAuthorizedCreator(user1.address);
      expect(await marketFactory.authorizedCreators(user1.address)).to.be.false;
    });

    it("Should fail if non-owner tries to add authorized creator", async function () {
      await expect(
        marketFactory.connect(user1).addAuthorizedCreator(user2.address)
      ).to.be.revertedWithCustomError(marketFactory, "OwnableUnauthorizedAccount");
    });
  });

  describe("Fee Management", function () {
    it("Should allow owner to update creation fee", async function () {
      const newFee = ethers.parseEther("0.02");
      await marketFactory.updateCreationFee(newFee);
      expect(await marketFactory.creationFee()).to.equal(newFee);
    });

    it("Should fail if non-owner tries to update fee", async function () {
      await expect(
        marketFactory.connect(user1).updateCreationFee(ethers.parseEther("0.02"))
      ).to.be.revertedWithCustomError(marketFactory, "OwnableUnauthorizedAccount");
    });
  });

  describe("Pause/Unpause", function () {
    it("Should allow owner to pause and unpause", async function () {
      await marketFactory.pause();
      expect(await marketFactory.paused()).to.be.true;

      await marketFactory.unpause();
      expect(await marketFactory.paused()).to.be.false;
    });

    it("Should fail if non-owner tries to pause", async function () {
      await expect(
        marketFactory.connect(user1).pause()
      ).to.be.revertedWithCustomError(marketFactory, "OwnableUnauthorizedAccount");
    });
  });

  describe("Market Resolution", function () {
    let marketAddress: string;

    beforeEach(async function () {
      const tx = await marketFactory.createMarket(
        "Test Market",
        "Test Description",
        Math.floor(Date.now() / 1000) + 86400,
        ["YES", "NO"],
        { value: ethers.parseEther("0.01") }
      );

      const receipt = await tx.wait();
      const event = receipt?.logs[0];
      const parsedEvent = marketFactory.interface.parseLog(event as any);
      marketAddress = parsedEvent?.args?.market;
    });

    it("Should allow factory to resolve market", async function () {
      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [86400]);
      await ethers.provider.send("evm_mine", []);

      await marketFactory.resolveMarket(marketAddress, "YES");
      
      const market = await ethers.getContractAt("Market", marketAddress);
      expect(await market.resolved()).to.be.true;
      expect(await market.resolvedOutcome()).to.equal("YES");
    });
  });
});
