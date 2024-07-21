"use client";

import React from "react";
import { FaUserShield, FaChartLine, FaVoteYea, FaLock } from "react-icons/fa";

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

const ContributionBenefits: React.FC = () => {
  return (
    <div className="backdrop-blur-md bg-gray-800 bg-opacity-5 p-6 mr-16 rounded-3xl shadow-lg w-full lg:w-1/3 relative bottom-60 overflow-hidden">
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
  );
};

export default ContributionBenefits;
