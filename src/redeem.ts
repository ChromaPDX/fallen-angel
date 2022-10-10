import Web3 from 'web3';
import Web3Modal from 'web3modal';

const ContractAbi = require("../artifacts/contracts/Contract.sol/Contract.json");


declare var ADDRESS: string;

console.log("hello redeem.ts", ADDRESS, ContractAbi);
const web3Modal = new Web3Modal();
const provider = await web3Modal.connect();
const web3 = new Web3(provider);
const networkId = await web3.eth.net.getId();
const accounts = await web3.eth.getAccounts();
const myWalletAddress = accounts[0]

// const web3 = new Web3(window.web3.currentProvider);

// console.log("your account", web3.eth.accounts);

var contract = new web3.eth.Contract(ContractAbi.abi, ADDRESS);
contract.methods.walletHoldsToken(myWalletAddress).send({ from: myWalletAddress })
  .on('receipt', function (r) {
    console.log("receipt", r)
  });

console.log("goodbye redeem.ts", myWalletAddress);

// const walletHasTokenOfCollection = (collectionId: String): Promise<'NoWallet' | 'NoToken' | 'Yes'> => {
//   return new Promise((res, rej) => {
//     res('NoWallet');
//   })
// }

// const redeem = (collectionId: String): any => {
//   walletHasTokenOfCollection(collectionId).then((usecase) => {
//     switch (usecase) {
//       case 'NoWallet':
//         alert('go install metamask');
//       case 'NoToken':
//         alert("you dont have the right token");
//       case 'Yes':
//         alert("AOK");
//     }

//   })
// }

// module.exports = {
//   walletHasTokenOfCollection,
//   redeem
// }