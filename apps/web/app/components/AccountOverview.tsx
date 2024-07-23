"use client";
import React, { useState, useEffect } from 'react';
import { FaEthereum, FaShieldAlt, FaCoins, FaWallet } from "react-icons/fa";
import { RiExchangeFundsFill } from "react-icons/ri";
import { useUser } from '../context/UserContext';
import Web3, { Numbers } from 'web3';
import { MultiPartyWallet_ABI } from '../_web3/ABIs/MultiPartyWallet_ABI';
import { CryptoInsurance_ADDRESS, MultiPartyWallet_ADDRESS } from '../_web3/constants';
import { useContract } from '../context/ContractContext';
import { CryptoInsurance_ABI } from '../_web3/ABIs/CryptoInsurance_ABI';


export default function AccountOverview() {
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [activePolicies, setActivePolicies] = useState(0);
  // const [tokensOwned, setTokensOwned] = useState(0);

  const {account}=useUser();
  
  

  useEffect(() => {
    // Fetch user data here

    //fetching user current balance
    const fetchBalances = async () => {
      if (!account) {
        console.error("No user account found");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);

        // Fetch account balance
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth:Numbers = web3.utils.fromWei(balanceWei, 'ether');
        setAccountBalance(parseFloat(parseFloat(balanceEth).toFixed(4)));

        // Interact with the contract
        // const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        // const tokenBalanceWei = await contract.methods.balanceOf(user.account).call();
        // const tokenBalance = web3.utils.fromWei(tokenBalanceWei, 'ether');
        // setTokenBalance(tokenBalance);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    } 

    fetchBalances();
    //
    setTokenBalance(100);
    setActivePolicies(2);
    // setTokensOwned(50);
  }, [account]);

  

  return (
    <div className="w-80 bg-gray-1000 bg-opacity-5 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mt-6 mb-12 text-center text-blue-300">
              Account Overview
            </h2>
            <div className="space-y-6">
            <div className="flex items-center justify-between bg-opacity-20 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center ">
                  <FaWallet className="text-yellow-400  text-2xl mr-3" />
                  <span className="text-lg">Account Balance</span>
                </div>
                <span className="text-xl font-semibold">
                  {accountBalance} ETH
                </span>
              </div>
              <div className="flex items-center justify-between bg-opacity-20 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <RiExchangeFundsFill className="text-green-400 text-2xl mr-3" />
                  <span className="text-lg">Token Balance</span>
                </div>
                <span className="text-xl font-semibold">
                  {tokenBalance} FIDU
                </span>
              </div>
              <div className="flex items-center justify-between bg-opacity-20 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <FaShieldAlt className="text-blue-400 text-2xl mr-3" />
                  <span className="text-lg">Active Policies</span>
                </div>
                <span className="text-xl font-semibold">{activePolicies}</span>
              </div>
              {/* <div className="flex items-center justify-between bg-opacity-20 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <FaCoins className="text-purple-400 text-2xl mr-3" />
                  <span className="text-lg">Tokens Owned</span>
                </div>
                <span className="text-xl font-semibold">{tokensOwned}</span>
              </div> */}
            </div>
          </div>
  );
}