"use client";
import React, { useState, useEffect } from 'react';
import { FaEthereum, FaShieldAlt, FaCoins, FaWallet } from "react-icons/fa";
import { RiExchangeFundsFill } from "react-icons/ri";
import { useUser } from '../context/UserContext';
import Web3, { Numbers } from 'web3';

import { useContract } from '../context/ContractContext';



export default function AccountOverview() {
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState("");
  const [activePolicies, setActivePolicies] = useState(0);
  // const [tokensOwned, setTokensOwned] = useState(0);

  const {ERC20Contract,InsuranceContract} = useContract();
  const {account}=useUser();
  
  

  useEffect(() => {
    // Fetch user data here

    //fetching user current balance
    const fetchBalances = async () => {
      if (!account || !InsuranceContract) {
        console.error("No user account found or contract not loaded");
        return;
      }
    
      try {
        const web3 = new Web3(window.ethereum);
    
        // Fetch account balance
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setAccountBalance(parseFloat(parseFloat(balanceEth).toFixed(4)));
    
        // Fetch active policies count
        const activePoliciesCount = await InsuranceContract.methods.activePoliciesCount().call();
        
        setActivePolicies(Number(activePoliciesCount));
    
        // Fetch token balance
        const tokenBalance = await ERC20Contract.methods.balanceOf(account).call();
        setTokenBalance(web3.utils.fromWei(tokenBalance, "ether"));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    fetchBalances();
    //
   
    
    // setTokensOwned(50);
  }, [account,ERC20Contract,InsuranceContract]);

 

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
            </div>
          </div>
  );
}