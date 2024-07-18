// app/home/page.tsx
"use client";

import { useState, useEffect } from "react";
// import Minion3D from '../../components/Minion3D'; // Assuming you have this component
import { FaEthereum } from "react-icons/fa";
import CryptoChart from "./CryptoChart";
import Spline from "@splinetool/react-spline/next";

export default function HomePage() {
  const [username, setUsername] = useState("John Doe");
  const [ethPrice, setEthPrice] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [activePolicies, setActivePolicies] = useState(0);
  const [tokensOwned, setTokensOwned] = useState(0);

  useEffect(() => {
    // Fetch ETH price and user data here
    // This is just mock data
    setEthPrice(3000);
    setAccountBalance(5.5);
    setTokenBalance(100);
    setActivePolicies(2);
    setTokensOwned(50);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold mt-8 mb-4 text-white">
        Welcome, {username}
      </h1>

      <div className="flex flex-1">
        <div className="flex-1 pr-8">
          <div className="mb-8">{/* <Minion3D /> */}</div>

          <div className="bg-gray-900 bg-opacity-0 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 mt-8">Price Chart</h2>
            <CryptoChart />
            <p className="text-2xl font-bold">
              <FaEthereum className="inline mr-2" />${ethPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="w-64 bg-gray-800 bg-opacity-40 p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
          <div className="space-y-4">
            <p>Account Balance: {accountBalance} ETH</p>
            <p>Token Balance: {tokenBalance} FIDU</p>
            <p>Active Policies: {activePolicies}</p>
            <p>Tokens Owned: {tokensOwned}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
