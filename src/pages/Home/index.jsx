import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { getTotalCollections } from '~/lib/contract.js';

import './styles.scss';

const HomePage = () => {
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [totalCollection, setTotalCollection] = useState(0)

  const getAccountHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
  }

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.send("eth_requestAccounts", []).then(async () => {
        await getAccountHandler(provider.getSigner());
      })
    } else {
      alert("Please Install MetaMask!!!");
    }
  }

  useEffect(() => {
    if (defaultAccount) {
      getTotalCollections()
        .then(async (res) => {
          setTotalCollection(res);
        })
        .catch(() => { });
    }
  }, [defaultAccount])

  return (
    <div className="p-home text-center">
      <h1 className='p-home__title'>
        <span className="text-jpgppl">Assets Library</span>
      </h1>
      {
        defaultAccount ? (
          <div className="text-left">
            <div className="text-primary mb-2">Wallet Address: <br />{defaultAccount}</div>
            <div className="text-secondary">
              Your Collection: <h3>{totalCollection}</h3>
            </div>
          </div>
        )
          : (
            <div className="mt-5 text-center">
              <button className='btn btn-primary cursor-pointer' onClick={() => connectWalletHandler()}>
                Connect Your Wallet
              </button>
            </div>
          )
      }
    </div>
  )
}

export default HomePage;