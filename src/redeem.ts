import Web3 from 'web3';
import Web3Modal from 'web3modal';

console.log("hello redeem.ts");

const run = async () => {
  const web3Modal = new Web3Modal();
  const provider = await web3Modal.connect();
  console.log("provider", provider);
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  console.log("goodbye redeem.ts");
};

run();

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