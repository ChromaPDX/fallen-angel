import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { Contract } from "web3-eth-contract";

import ContractAbi from "../artifacts/contracts/Contract.sol/Contract.json";


declare var ADDRESS: String;

console.log("hello redeem.ts", ADDRESS);
// const web3Modal = new Web3Modal();
// const provider = await web3Modal.connect();
// console.log("provider", provider);
// const web3 = new Web3(provider);
// const networkId = await web3.eth.net.getId();

// var contract = new Contract(ContractAbi, address);

// contract.methods.somFunc().send({})
//   .on('receipt', function () {
//     console.log("receipt", this)
//   });

console.log("goodbye redeem.ts");

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