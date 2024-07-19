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
    },
    { icon: FaChartLine, text: "Earn a share of the wallet's profits" },
    { icon: FaVoteYea, text: "Participate in decision-making processes" },
    { icon: FaLock, text: "Access to exclusive Fiducia features and services" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="contribute-bg absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-50 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">
          Contribute to Fiducia
        </h1>
        <div className="flex flex-col lg:flex-row justify-start items-start gap-16">
          <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-lg w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">
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
              <span className="bg-gray-600 bg-opacity-50 px-4 py-2 rounded-r-lg text-blue-300">
                <FaEthereum className="inline mr-2" />
                ETH
              </span>
            </div>
            <p className="text-sm text-blue-200 mb-4">
              Minimum contribution: {minimumContribution} ETH
            </p>
            <button
              onClick={handleContribute}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Contribute
            </button>
          </div>

          <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-lg w-full lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">
              Contribution Benefits
            </h2>
            <ul className="space-y-4 text-gray-300">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-8 h-8 mr-3 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
                    <benefit.icon className="text-white text-sm" />
                  </span>
                  <span className="text-sm">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
