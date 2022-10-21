import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import AppFrame from "./AppFrame";
const configs = require("../config");

const isInState = state => true

const isOldEnough = date =>
  DateTime.fromISO(date)
    .diffNow('years')
    .years < -21;

export function Redeem(props: { contract, provider, address }) {
  const { contract, provider, address } = props;
  const [loadingState, setLoadingState] = useState<any>({})
  useEffect(() => { refreshWeb3() }, []);

  async function refreshWeb3() {
    const mine = await Promise.all(

      (await contract.getMineWithMetadata(address))
        .map(async (nft) => {
          console.log(nft);

          const u = nft[1].replace("ipfs://", "https://ipfs.io/ipfs/");

          const ipfsBlob = await fetch(u)
            .then(res => {
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

    const redeemer = async (toRedeem) => {
      await contract.claim(loadingState.contract.redeem(toRedeem).send({ from: loadingState.address }));
      setLoadingState({
        ...loadingState, redeeming: {
          ...(loadingState.redeeming || {}),
          toRedeem: true
        }
      });
    }
    setLoadingState({ mine, address, contract, redeemer });
  }

  return (<>

    <div className="container">

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
                            refreshWeb3()

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
    </div>
  </>);
}

export default (props: any) => {
  return (<>
    <AppFrame >
      {
        (contract, provider, address): React.ReactNode => <Redeem contract={contract} provider={provider} address={address} />
      }
    </AppFrame>
  </>);
};
