const { BigNumber } = require("ethers")
const { ethers } = require("hardhat");
const { expect } = require("chai");

const lcName = "LiquidCollectionsDynamicMetadata";
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

const getMetadata = (tokenUri) => {
  const data = tokenUri[0]
  const body = data.split("data:application/json;base64,")[1]
  let buff = new Buffer(body, 'base64');
  let text = buff.toString('ascii');
  return JSON.parse(text);
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

    await hardhatToken.claim(signerA.address, 1, currency, pricePerToken, proof, dummyData, { value: pricePerToken });


    expect(
      BigNumber.from((await hardhatToken.functions.nextTokenIdToMint())[0])
    ).to.equal(3);
    expect(
      BigNumber.from((await hardhatToken.functions.nextTokenIdToClaim())[0])
    ).to.equal(1);

    await hardhatToken.connect(signerA).redeem(0);

    await expect(
      hardhatToken.connect(signerA).redeem(0)
    ).to.be.revertedWith('LiquidCollections: NFT is aleady redeemed')

    await expect(
      hardhatToken.connect(signerA).redeem(1)
    ).to.be.revertedWith('LiquidCollections: Token does not exist')

    await expect(
      hardhatToken.connect(signerB).redeem(1)
    ).to.be.revertedWith('LiquidCollections: Token does not exist')

    await hardhatToken.claim(signerB.address, 1, currency, pricePerToken, proof, dummyData, { value: pricePerToken });

    await expect(
      hardhatToken.connect(signerA).redeem(1)
    ).to.be.revertedWith('LiquidCollections: You are not the owner of this token');

    hardhatToken.connect(signerB).redeem(1)
    await expect(
      hardhatToken.connect(signerB).redeem(1)
    ).to.be.revertedWith('LiquidCollections: NFT is aleady redeemed')

  });

  it("returns tokenURI", async function () {
    //  get 3 random addresses. The 1st shall be the owner of the contract, the others will be users claiming NFTs
    const [owner, signerA, signerB] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory(lcName);
    const contract = await contractFactory.deploy(lcName, lcSymbol, owner.address, 1, owner.address);
    await contract.lazyMint(1, ipfsURL, nullData);
    await contract.lazyMint(2, ipfsURL, nullData);


    await contract.functions.setClaimConditions({
      startTimestamp: 0,
      maxClaimableSupply: 100,
      supplyClaimed: 0,
      quantityLimitPerTransaction: 1,
      waitTimeInSecondsBetweenClaims: 1,
      merkleRoot,
      pricePerToken,
      currency
    }, false)

    await contract.claim(signerA.address, 1, currency, pricePerToken, proof, dummyData, { value: pricePerToken });

    // const data = (await contract.functions.tokenURI(0))[0]
    // // console.log("data", data);
    // const body = data.split("data:application/json;base64,")[1]
    // // console.log("body", body);
    // let buff = new Buffer(body, 'base64');
    // let text = buff.toString('ascii');
    // const jsonMetadata = JSON.parse(text);

    await expect(getMetadata(await contract.functions.tokenURI(0))).to.deep.equal({ name: 'My721Token #0', foo: "bar", redeemable: true })
    await contract.connect(signerA).redeem(0);
    await expect(getMetadata(await contract.functions.tokenURI(0))).to.deep.equal({ name: 'My721Token #0 [REDEEMED]', foo: "bar", redeemable: false })

  });

});