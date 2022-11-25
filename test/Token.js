const { BigNumber } = require("ethers")
const { ethers } = require("hardhat");
const { expect } = require("chai");

const lcName = "FallenAngels";
const lcSymbol = "lc-test";
const ipfsURL = "ipfs://QmcceQ5mbWixKox1jnEA67kKZuTojCyobfXBJtd7ewJjP4/";
const nullData = "0x"
const currency = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const pricePerToken = "010000000000000000";
const merkleRoot = "0x0000000000000000000000000000000000000000000000000000000000000000";
const proof = {
  "proof": [merkleRoot],
  "maxQuantityInAllowlist": 0
};
const dummyData = "0x6162636400000000000000000000000000000000000000000000000000000000";

const metadataCID = config.metadataCID;  //"bafybeiblzu7xvvcepkarrblpduffm54cncr33ndyabcd5vf7ccwhlsrufq";

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const getMetadata = (tokenUri) => {
  const data = tokenUri[0]
  const body = data.split("data:application/json;base64,")[1]
  let buff = new Buffer(body, 'base64');
  let text = buff.toString('ascii');
  return JSON.parse(text);
}

const makeMetadata = (id, redeemable) => {
  const fancyId = id + 1;
  return {
    redeemable,
    "name": `Fallen Angel Tequila #${fancyId}${redeemable ? "" : " [REDEEMED]"}`,
    "description": `The inaugural drop of Fallen Angel Tequila, a super-premium reposado made from 100% Blue Weber Agave. A collaboration between Meta Angels and Liquid Collections, this Liquid-backed token features the beautiful artwork from Aslan Ruby and is redeemable for our limited edition Fallen Angel Tequila.  Return to this page at Liquid Collections for additional tequila details and redemption information in February 2023: https://liquidcollections.com/collections/fallen-angel-tequila `,
    "image": (redeemable ? `https://${metadataCID}.ipfs.nftstorage.link/pre/${fancyId}.jpg` : `https://${metadataCID}.ipfs.nftstorage.link/post/${fancyId}.jpg`),
    "animation_url": (redeemable ? `https://${metadataCID}.ipfs.nftstorage.link/pre/${fancyId}.jpg` : `https://${metadataCID}.ipfs.nftstorage.link/post/${fancyId}.jpg`),
    "attributes": [
      { "trait_type": "Spirit", "value": "Gin" },
      { "trait_type": "Provenance", "value": "Oregon" },
      { "trait_type": "Proof", "value": "86" },
      { "trait_type": "Size", "value": "750ml" },
      { "trait_type": "Distilled", "value": "2022" },
      { "trait_type": "Batch", "value": "One" },
      { "trait_type": "Style", "value": "American Gin" }
    ]
  }
}

describe("Token contract", function () {
  it("Deploys and mints and redeems", async function () {
    //  get 3 random addresses. The 1st shall be the owner of the contract, the others will be users claiming NFTs
    const [owner, signerA, signerB] = await ethers.getSigners();

    const Token = await ethers.getContractFactory(lcName);
    const hardhatToken = await Token.deploy(lcName, lcSymbol, owner.address, 1, owner.address);
    await hardhatToken.lazyMint(1, ipfsURL, nullData);
    await hardhatToken.lazyMint(2, ipfsURL, nullData);

    expect(
      BigNumber.from((await hardhatToken.functions.nextTokenIdToMint())[0])
    ).to.equal(3);
    expect(
      BigNumber.from((await hardhatToken.functions.nextTokenIdToClaim())[0])
    ).to.equal(0);

    console.log(merkleRoot)
    console.log(pricePerToken)
    console.log(currency)

    await hardhatToken.functions.setClaimConditions({
      startTimestamp: 0,
      maxClaimableSupply: 100,
      supplyClaimed: 0,
      quantityLimitPerTransaction: 1,
      waitTimeInSecondsBetweenClaims: 1,
      merkleRoot,
      pricePerToken,
      currency
    }, false)

    // await hardhatToken.claim(signerA.address, 1, currency, pricePerToken, proof, dummyData, { value: pricePerToken });


    // expect(
    //   BigNumber.from((await hardhatToken.functions.nextTokenIdToMint())[0])
    // ).to.equal(3);
    // expect(
    //   BigNumber.from((await hardhatToken.functions.nextTokenIdToClaim())[0])
    // ).to.equal(1);

    // await hardhatToken.connect(signerA).redeem(0);

    // await expect(
    //   hardhatToken.connect(signerA).redeem(0)
    // ).to.be.revertedWith('LiquidCollections: NFT is aleady redeemed')

    // await expect(
    //   hardhatToken.connect(signerA).redeem(1)
    // ).to.be.revertedWith('LiquidCollections: Token does not exist')

    // await expect(
    //   hardhatToken.connect(signerB).redeem(1)
    // ).to.be.revertedWith('LiquidCollections: Token does not exist')

    // await hardhatToken.claim(signerB.address, 1, currency, pricePerToken, proof, dummyData, { value: pricePerToken });

    // await expect(
    //   hardhatToken.connect(signerA).redeem(1)
    // ).to.be.revertedWith('LiquidCollections: You are not the owner of this token');

    // hardhatToken.connect(signerB).redeem(1)
    // await expect(
    //   hardhatToken.connect(signerB).redeem(1)
    // ).to.be.revertedWith('LiquidCollections: NFT is aleady redeemed')

  });

  // it("returns tokenURI", async function () {
  //   //  get 3 random addresses. The 1st shall be the owner of the contract, the others will be users claiming NFTs
  //   const [owner, signerA, signerB] = await ethers.getSigners();

  //   const contractFactory = await ethers.getContractFactory(lcName);
  //   const contract = await contractFactory.deploy(lcName, lcSymbol, owner.address, 1, owner.address);
  //   await contract.lazyMint(1, ipfsURL, nullData);
  //   await contract.lazyMint(2, ipfsURL, nullData);


  //   await contract.functions.setClaimConditions({
  //     startTimestamp: 0,
  //     maxClaimableSupply: 100,
  //     supplyClaimed: 0,
  //     quantityLimitPerTransaction: 1,
  //     waitTimeInSecondsBetweenClaims: 1,
  //     merkleRoot,
  //     pricePerToken,
  //     currency
  //   }, false)

  //   await contract.claim(signerA.address, 1, currency, pricePerToken, proof, dummyData, { value: pricePerToken });

  //   await expect(getMetadata(await contract.functions.tokenURI(0))).to.deep.equal(makeMetadata(0, true))
  //   await contract.connect(signerA).redeem(0);
  //   await expect(getMetadata(await contract.functions.tokenURI(0))).to.deep.equal(makeMetadata(0, false))

  // });

});