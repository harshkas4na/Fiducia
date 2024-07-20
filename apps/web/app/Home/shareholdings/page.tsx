"use client";

import { useState, useEffect } from "react";
import {
  FaEthereum,
  FaCoins,
  FaWallet,
  FaChartPie,
  FaMoneyBillWave,
  FaShare,
  FaBullhorn,
  FaMoneyBillWaveAlt,
  FaPiedPiper,
} from "react-icons/fa";

export default function ShareholdingsPage() {
  const [totalContributions, setTotalContributions] = useState("0");
  const [userContribution, setUserContribution] = useState("0");
  const [userShare, setUserShare] = useState("0");
  const [unclaimedFunds, setUnclaimedFunds] = useState("0");
  const [memeCoins, setMemeCoins] = useState("0");

  useEffect(() => {
    // Fetch shareholding data from the MultiPartyWallet contract
    // This is mock data for now
    setTotalContributions("100");
    setUserContribution("10");
    setUserShare("10");
    setUnclaimedFunds("0.5");
    setMemeCoins("1000");

    const animateBackground = () => {
      const bg = document.querySelector(".shareholdings-bg") as HTMLElement;
      if (!bg) return;

      let x = 0;
      let y = 0;

      setInterval(() => {
        x = (x + 1) % 100;
        y = (y + 1) % 100;
        bg.style.backgroundPosition = `${x}% ${y}%`;
      }, 50);
    };

    animateBackground();
  }, []);

  const handleWithdraw = async () => {
    // Implement withdrawal logic here
    console.log("Withdrawing unclaimed funds");
  };

  return (
    <div className="h-full w-full relative flex flex-col">
      <div className="shareholdings-bg absolute -inset-15 bg-gradient-to-br from-blue-900 to-black opacity-50 rounded-full"></div>
      <div className="relative z-10 flex-grow flex flex-col">
        <h1 className="text-3xl font-bold mt-8 mb-6 text-center text-white">
          Your Shareholdings
        </h1>

        <div className="flex-grow flex flex-col lg:flex-row justify-start items-start gap-6 gap-x-14 mb-8">
          <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 p-6 ml-2 rounded-3xl shadow-lg w-full lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border-b border-blue-300 pb-2">
                Your Contributions
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-blue-200 mb-2">
                    Your Contribution
                  </p>
                  <p className="text-2xl font-bold text-white">
                    <FaEthereum className="inline mr-2 text-blue-400" />
                    {userContribution} ETH
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-200 mb-2">Your Share</p>
                  <p className="text-2xl font-bold text-white">
                    <FaChartPie className="inline mr-2 text-green-400" />
                    {userShare}%
                  </p>
                </div>
              </div>
              <div className="text-center mb-6">
                <p className="text-sm text-blue-200 mb-2">
                  Total Contributions
                </p>
                <p className="text-2xl font-bold text-white">
                  <FaWallet className="inline mr-2 text-yellow-400" />
                  {totalContributions} ETH
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-gray-800 bg-opacity-10 p-6 mr-2 rounded-3xl shadow-lg w-full lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border border-blue-300 rounded-lg py-2">
                Wallet Overview
              </h2>
              <div className="text-center mb-6">
                <p className="text-sm text-blue-200 mb-2">
                  Total Contributions
                </p>
                <p className="text-2xl font-bold text-white">
                  <FaMoneyBillWave className="inline mr-2 text-green-400" />
                  {totalContributions} ETH
                </p>
              </div>
              <div className="text-center mb-6">
                <p className="text-sm text-blue-200 mb-2">
                  Your MemeCoin Balance
                </p>
                <p className="text-2xl font-bold text-white">
                  <FaCoins className="inline mr-2 text-red-800" />
                  {memeCoins} MEME
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-gray-800 bg-opacity-10 p-6 rounded-3xl shadow-lg w-full max-w-md mx-auto relative overflow-hidden">
          <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border border-blue-300 rounded-lg py-2">
              Withdraw Shareholdings
            </h2>
            <div className="text-center mb-6">
              <p className="text-sm text-blue-200 mb-2">Your Share</p>
              <p className="text-2xl font-bold text-white">
                <FaChartPie className="inline mr-2 text-green-400" />
                10%
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleWithdraw}
                className="w-40 bg-transparent border-2 border-red-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group"
              >
                <span className="relative z-10 text-slate-50">
                  Withdraw Share
                </span>
                <div className="absolute inset-0 bg-red-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(255,49,49,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(255,50,128,0.7)] transition-shadow duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
