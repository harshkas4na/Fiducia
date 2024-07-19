"use client";

import { useState, useEffect } from "react";
import {
  FaEthereum,
  FaUserShield,
  FaChartLine,
  FaVoteYea,
  FaLock,
} from "react-icons/fa";

export default function ContributePage() {
  const [contribution, setContribution] = useState("");
  const [minimumContribution, setMinimumContribution] = useState("0.1");

  const handleContribute = async () => {
    console.log("Contributing:", contribution, "ETH");
  };

  useEffect(() => {
    const animateBackground = () => {
      const bg = document.querySelector(".contribute-bg") as HTMLElement;
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

  const benefits = [
    {
      icon: FaUserShield,
      text: "Become a shareholder in the Fiducia MultiPartyWallet",
      color: "text-blue-400",
    },
    {
      icon: FaChartLine,
      text: "Earn a share of the wallet's profits",
      color: "text-green-400",
    },
    {
      icon: FaVoteYea,
      text: "Participate in decision-making processes",
      color: "text-yellow-400",
    },
    {
      icon: FaLock,
      text: "Access to exclusive Fiducia features and services",
      color: "text-red-400",
    },
  ];

  return (
    <div className="h-full w-full relative">
      <div className="contribute-bg absolute -inset-5 bg-gradient-to-br from-blue-900 to-black opacity-50 rounded-full"></div>
      <div className="relative z-10 gap-24 h-full flex flex-col">
        <h1 className="text-3xl font-bold mt-8 mb-6 text-center text-white">
          Contribute to Fiducia
        </h1>

        <div className="flex-grow flex flex-col lg:flex-row justify-start items-start gap-6 gap-x-64">
          <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 p-6 ml-8 rounded-3xl shadow-lg w-full lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border-b border-blue-300 pb-2">
                Make a Contribution
              </h2>
              <div className="flex items-center mb-4">
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  placeholder="Amount in ETH"
                  className="flex-grow bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <span className="bg-gray-600 bg-opacity-50 px-4 py-2 rounded-r-lg text-blue-400">
                  <FaEthereum className="inline mr-2" />
                  ETH
                </span>
              </div>
              <p className="text-sm text-blue-200 mb-4">
                Minimum contribution: {minimumContribution} ETH
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleContribute}
                  className="w-32 bg-transparent border-2 border-blue-400 text-blue-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group"
                >
                  <span className="relative z-10 text-slate-50">
                    Contribute
                  </span>
                  <div className="absolute inset-0 bg-blue-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(59,130,246,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(59,130,246,0.7)] transition-shadow duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-gray-800 bg-opacity-10 p-6 mr-16 rounded-3xl shadow-lg w-full lg:w-1/3 relative overflow-hidden">
            <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border border-blue-300 rounded-lg py-2">
                Contribution Benefits
              </h2>
              <ul className="space-y-4 text-gray-300">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span
                      className={`w-8 h-8 mr-3 ${benefit.color} bg-opacity-20 rounded-full flex-shrink-0 flex items-center justify-center`}
                    >
                      <benefit.icon className={`${benefit.color}`} />
                    </span>
                    <span className="text-sm">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
