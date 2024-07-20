"use client";
import React, { useState, useEffect } from 'react';
import { FaEthereum, FaShieldAlt, FaCoins, FaWallet } from "react-icons/fa";
import { RiExchangeFundsFill } from "react-icons/ri";

export default function AccountOverview() {
  const [accountBalance, setAccountBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [activePolicies, setActivePolicies] = useState(0);
  const [tokensOwned, setTokensOwned] = useState(0);

  useEffect(() => {
    // Fetch user data here
    setAccountBalance(5.5);
    setTokenBalance(100);
    setActivePolicies(2);
    setTokensOwned(50);
  }, []);

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
              <div className="flex items-center justify-between bg-opacity-20 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <FaCoins className="text-purple-400 text-2xl mr-3" />
                  <span className="text-lg">Tokens Owned</span>
                </div>
                <span className="text-xl font-semibold">{tokensOwned}</span>
              </div>
            </div>
          </div>
  );
}