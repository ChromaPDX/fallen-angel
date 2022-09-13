const walletHasTokenOfCollection = (collectionId: String): Promise<'NoWallet' | 'NoToken' | 'Yes'> => {
  return new Promise((res, rej) => {

  })
}

const redeem = (collectionId: String): any => {
  walletHasTokenOfCollection(collectionId).then((usecase) => {
    switch (usecase) {
      case 'NoWallet':
        alert('go install metamask');
      case 'NoToken':
        alert("you dont havae the right token");
      case 'Yes':
        alert("AOK");
    }

  })
}

module.exports = {
  walletHasTokenOfCollection,
  redeem
}