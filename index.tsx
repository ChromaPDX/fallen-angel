import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import ReactDom from "react-dom";
import { DateTime } from "luxon";
import { GoogleApiProvider, useGoogleApi } from 'react-gapi'


// var gapi = require('gapi');

const ContractAbi = require("./artifacts/contracts/LiquidCollection.sol/LiquidCollection.json");
const configs = require("./config");

const isInState = state => true

const isOldEnough = date =>
  DateTime.fromISO(date)
    .diffNow('years')
    .years < -21;

const Index = (props: any) => {
  const [loadingState, setLoadingState] = useState<any>({ inRedemption: {} })

  useEffect(() => { loadNFTs() }, [])

  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    // const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    /* @ts-ignore:next-line */
    const contract = new web3.eth.Contract(ContractAbi.abi, configs.contractAddress);

    // const owner = await contract.methods.owner().call();

    const totalSupply = await contract.methods.totalSupply().call();
    const getBaseURICount = parseInt(await contract.methods.getBaseURICount().call());

    const mine = await Promise.all(

      (await contract.methods.getMineWithMetadata(account).call())
        .map(async (nft) => {
          console.log(nft);

          const u = nft[1].replace("ipfs://", "https://ipfs.io/ipfs/");

          const ipfsBlob = await fetch(u)
            .then(res => {
              // console.error("mark1", res)
              try {
                return res.json()
              } catch (e) {
                return {};
              }

            })
            .then(
              (result) => {
                return result
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                console.error(error)
              }
            )

          return {
            ...ipfsBlob,
            /* @ts-ignore:next-line */
            httpImage: ipfsBlob.image?.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"),
            id: nft[0],
            tokenURI: nft[1],
            redeemed: nft[2],
          }
        })

    );


    const theirs = await Promise.all(
      (await contract.methods.getMineWithMetadata(configs.owner).call())
        .map(async (nft) => {
          return {
            id: nft[0],
            tokenURI: nft[1],
            redeemed: nft[2],
          }
        })

    );


    // const claim = async () => {
    //   const claimed = await contract.methods.claim(
    //     account,
    //     1,
    //     "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    //     0,
    //     { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "maxQuantityInAllowlist": 0 },
    //     "0x6162636400000000000000000000000000000000000000000000000000000000").send({ from: account });

    //   // setLoadingState({ ...loadingState, claim });
    //   loadNFTs();
    // }

    const redeemer = async (toRedeem) => {
      const redeemed = await contract.methods.claim(loadingState.contract.methods.redeem(toRedeem).send({ from: loadingState.account }));

      // setLoadingState({ mine, account, contract, claim, totalSupply, getBaseURICount, redeemed, redeemer });
      setLoadingState({
        ...loadingState, redeeming: {
          ...(loadingState.redeeming || {}),
          toRedeem: true
        }
      });
    }


    setLoadingState({ mine, account, contract, totalSupply, getBaseURICount, redeemer, theirs });


  }

  const gapi: { auth2?: any } = useGoogleApi({
    scopes: [
      'profile',
    ],
  }) || { auth2: 'loading' }

  // const auth = gapi?.auth2.getAuthInstance();
  console.log(gapi)

  return (<>

    <div className="container">
      <header>
        <h1> LiquidCollections X Chroma</h1>
      </header>


      <hr />

      {/* <pre>{JSON.stringify(loadingState)}</pre> */}

      {/* {
        loadingState.theirs && <>
          <h2>Unsold NFTs</h2>
          <ul>
            {
              loadingState.theirs.map((m, ndx) => <li key={ndx}>
                <pre>{JSON.stringify(m)}</pre>
                <button>Buy me</button>
              </li>)
            }
          </ul>
        </>
      } */}

      {
        loadingState.mine && <>
          <h2>mine</h2>
          <ul>
            {
              loadingState.mine.map((m, ndx) => <li key={m.id}>
                <pre>{JSON.stringify(m)}</pre>

                <img src={m.httpImage} width="100rem" />

                {
                  m.redeemed ?
                    <>
                      <p>This NFT is already redeemed. If you have not done so, please proceed to <a target="_blank" href={configs.stripeCheckoutLink}>the stripe payment page</a>.</p>

                    </> :

                    (

                      (loadingState.inRedemption || {})[m.id]
                        ?
                        <p>please wait...</p>
                        :
                        <form onSubmit={async (event) => {
                          event.preventDefault()

                          /* @ts-ignore:next-line */
                          const usersName = event.target.elements.name.value;
                          /* @ts-ignore:next-line */
                          const usersDateOfBirth = event.target.elements.dob.value;
                          /* @ts-ignore:next-line */
                          const usersState = event.target.elements.state.value;

                          const userIsOfLegalAge = isOldEnough(usersDateOfBirth);
                          const userIsInLegalState = isInState(usersState);

                          console.log(usersName, usersDateOfBirth, usersState, userIsOfLegalAge, userIsInLegalState)

                          if (usersName && userIsOfLegalAge && userIsInLegalState) {
                            setLoadingState({
                              ...loadingState,
                              inRedemption: {
                                [m.id]: true,
                                ...loadingState.inRedemption,
                              }
                            });

                            // var formBody = new FormData();
                            // formBody.set("entry.1832620337", usersName);
                            // formBody.set("entry.835369520", usersState);
                            // formBody.set("entry.1445715173_year", "0");
                            // formBody.set("entry.1445715173_month", "0");
                            // formBody.set("entry.1445715173_day", "0");

                            // await fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSddvCg79SEXdxDQt6mbE67MqLdk1FB5Mg2_ZVHwPP7akjF4uQ/formResponse", {
                            //   method: "POST",
                            //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            //   mode: 'no-cors',
                            //   body: formBody,
                            //   // body: JSON.stringify({
                            //   //   "entry.1832620337": "test",
                            //   //   "entry.835369520": "test",
                            //   //   "entry.1445715173_year": "2022",
                            //   //   "entry.1445715173_month": "10",
                            //   //   "entry.1445715173_day": "2"
                            //   // })
                            // })

                            await loadingState.contract.methods.redeem(m.id).send({ from: loadingState.account });
                            loadNFTs()

                            window.open(configs.stripeCheckoutLink, '_blank');

                            setLoadingState({
                              ...loadingState,

                              inRedemption: {
                                [m.id]: false,
                                ...loadingState.inRedemption,
                              }
                            });
                          } else {
                            alert("You must be 21 years of age and residing in a legal state.")
                          }

                        }}>
                          <label htmlFor="name">name</label>
                          <input type="text" id="name" placeholder="your name" />

                          <label htmlFor="dob">Your date of birth</label>
                          <input type="date" id="dob" />

                          <label htmlFor="state">Choose your state:</label>

                          <select name="state" id="state">
                            <option value=""></option>
                            <option value="alabama">Alabama</option>
                            <option value="alaska">Alaska</option>
                            <option value="arizona">Arizona</option>
                          </select>

                          <input type="submit" value="Redeem" />

                        </form>

                    )

                }

              </li>)
            }
          </ul>
        </>
      }

      <hr />

      {
        loadingState.claiming ? <>
          <p>please wait while your claim is processing...</p>

        </> : <>


          <h2>Mint #{loadingState.totalSupply} of {loadingState.getBaseURICount + 1} </h2>


          <button disabled={loadingState.totalSupply >= loadingState.getBaseURICount + 1} onClick={async (e) => {
            setLoadingState({ ...loadingState, claiming: true });

            await loadingState.contract.methods.claim(
              loadingState.account,
              1,
              "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
              0,
              { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "maxQuantityInAllowlist": 0 },
              "0x6162636400000000000000000000000000000000000000000000000000000000").send({ from: loadingState.account });



            setLoadingState({ ...loadingState, claiming: false });
            loadNFTs();

          }} >mint</button>
        </>





      }


    </div>

    <hr />

    <footer >
      <p >Made with ❤️ by Chroma</p>
    </footer>

  </>);

};

document.addEventListener("DOMContentLoaded", function (event) {
  const body = document.getElementsByTagName('body')
  ReactDom.render(

    <Index />

    //   <GoogleApiProvider
    //   clientId={"304551797540-77jgoe5n49sqjbnofd1h9ctv488u93jv.apps.googleusercontent.com"}
    //   children={<Index />}
    // >
    // </GoogleApiProvider>

    , body[0]);
});
