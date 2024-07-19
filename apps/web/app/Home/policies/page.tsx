"use client";

import { useState, useEffect } from "react";
import { FaShieldAlt, FaCoins, FaChartLine, FaEthereum } from "react-icons/fa";

const insuranceTypes = [
  { id: "LOAN", name: "Loan Insurance", icon: FaCoins, color: "text-blue-400" },
  {
    id: "THRESHOLD",
    name: "Threshold Insurance",
    icon: FaShieldAlt,
    color: "text-green-400",
  },
  {
    id: "SUDDEN_DROP",
    name: "Sudden Drop Insurance",
    icon: FaChartLine,
    color: "text-yellow-400",
  },
];

interface Policy {
  id: number;
  asset: string;
  type: string;
  coverage: string;
  triggerPrice: string;
  endTime: string;
}

export default function PoliciesPage() {
  const [activePolicies, setActivePolicies] = useState<Policy[]>([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");

  useEffect(() => {
    setActivePolicies([
      {
        id: 1,
        asset: "ETH",
        type: "LOAN",
        coverage: "5",
        triggerPrice: "2000",
        endTime: "2024-08-01",
      },
      {
        id: 2,
        asset: "BTC",
        type: "SUDDEN_DROP",
        coverage: "0.1",
        triggerPrice: "30000",
        endTime: "2024-09-15",
      },
    ]);

    const animateBackground = () => {
      const bg = document.querySelector(".policies-bg") as HTMLElement;
      if (!bg) return;
      let x = 0,
        y = 0;
      setInterval(() => {
        x = (x + 1) % 100;
        y = (y + 1) % 100;
        bg.style.backgroundPosition = `${x}% ${y}%`;
      }, 50);
    };

    animateBackground();
  }, []);

  const handleCreatePolicy = async () => {
    console.log("Creating policy:", {
      selectedAsset,
      selectedType,
      coverageAmount,
      triggerPrice,
    });
  };

  return (
    <div className="min-h-screen w-full relative p-6 overflow-hidden">
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="policies-bg absolute -inset-5 bg-gradient-to-br from-blue-900 to-black opacity-50 rounded-ss-full rounded-ee-full"></div>
      <div className="relative z-10 flex flex-col max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Crypto Insurance Policies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="backdrop-blur-md bg-gray-800 mr-6 bg-opacity-20 p-5 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-4 text-blue-300 text-center border-b border-blue-300 pb-2">
                Create New Policy
              </h2>
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="w-full bg-gray-800 bg-opacity-50 text-slate-300 px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option
                  value=""
                  disabled
                  className="bg-gray-800 text-slate-300"
                >
                  Select Asset
                </option>
                <option value="ETH" className="bg-gray-800 text-slate-300">
                  Ethereum
                </option>
                <option value="BTC" className="bg-gray-800 text-slate-300">
                  Bitcoin
                </option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-gray-800 bg-opacity-50 text-slate-300 px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">Select Insurance Type</option>
                {insuranceTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                    className="bg-gray-800 text-slate-300"
                  >
                    {type.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center mb-3">
                <input
                  type="number"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  placeholder="Coverage Amount"
                  className="flex-grow bg-gray-700 bg-opacity-20 text-white px-3 py-2 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <span className="bg-gray-600 bg-opacity-30 px-3 py-2 rounded-r-lg text-blue-400 text-sm">
                  <FaEthereum className="inline mr-1" />
                  ETH
                </span>
              </div>
              <input
                type="number"
                value={triggerPrice}
                onChange={(e) => setTriggerPrice(e.target.value)}
                placeholder="Trigger Price"
                className="w-full bg-gray-700 bg-opacity-20 text-white px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div className="flex justify-center">
                <button
                  onClick={handleCreatePolicy}
                  className="w-full bg-transparent border-2 border-blue-400 text-blue-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group"
                >
                  <span className="relative z-10 text-slate-50">
                    Create Policy
                  </span>
                  <div className="absolute inset-0 bg-blue-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(59,130,246,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(59,130,246,0.7)] transition-shadow duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-gray-800 bg-opacity-10 ml-8 p-5 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-4 text-blue-300 text-center border border-blue-300 rounded-lg py-2">
                Insurance Types
              </h2>
              <ul className="space-y-3 text-gray-400 text-sm">
                {insuranceTypes.map((type) => (
                  <li key={type.id} className="flex items-start">
                    <span
                      className={`w-8 h-8 mr-3 ${type.color} bg-opacity-20 rounded-full flex-shrink-0 flex items-center justify-center`}
                    >
                      <type.icon className={`${type.color} text-lg`} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-base">{type.name}</h3>
                      <p className="text-sm text-gray-400">
                        {type.id === "LOAN" &&
                          "Protects against price drops below a specified loan threshold."}
                        {type.id === "THRESHOLD" &&
                          "Triggers when the asset price falls below a set threshold."}
                        {type.id === "SUDDEN_DROP" &&
                          "Activates if there's a sudden significant price drop within 24 hours."}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 mt-18 p-5 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-4 text-blue-300 text-center border-b border-blue-300 pb-2">
              Active Policies
            </h2>
            {activePolicies.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activePolicies.map((policy) => (
                  <li
                    key={policy.id}
                    className="bg-gray-700 bg-opacity-10 p-3 rounded-lg text-sm"
                  >
                    <p className="font-semibold text-blue-300">
                      {policy.asset} -{" "}
                      {insuranceTypes.find((t) => t.id === policy.type)?.name ||
                        "Unknown Type"}
                    </p>
                    <p className="text-gray-300">
                      Coverage: {policy.coverage} {policy.asset}
                    </p>
                    <p className="text-gray-300">
                      Trigger: ${policy.triggerPrice}
                    </p>
                    <p className="text-gray-300">
                      Expires: {new Date(policy.endTime).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-center text-sm">
                No active policies
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
