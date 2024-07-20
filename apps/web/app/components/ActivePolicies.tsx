"use client";

import { useEffect, useState } from "react";
import { FaShieldAlt, FaCoins, FaChartLine, FaEthereum } from "react-icons/fa";

interface Policy {
  id: number;
  asset: string;
  type: string;
  coverage: string;
  triggerPrice: string;
  endTime: string;
}

const ActivePolicies: React.FC = () => {
  const [activePolicies, setActivePolicies] = useState<Policy[]>([]);

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
  }, []);

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

  return (
    <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 mt-18 p-5 rounded-3xl shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
      <div className="relative z-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-300 text-center border-b border-blue-300 pb-2">
          Active Policies
        </h2>
        {activePolicies.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activePolicies.map((policy) => (
              <li key={policy.id} className="bg-gray-700 bg-opacity-10 p-3 rounded-lg text-sm">
                <p className="font-semibold text-blue-300">
                  {policy.asset} - {insuranceTypes.find((t) => t.id === policy.type)?.name || "Unknown Type"}
                </p>
                <p className="text-gray-300">Coverage: {policy.coverage} {policy.asset}</p>
                <p className="text-gray-300">Trigger: ${policy.triggerPrice}</p>
                <p className="text-gray-300">Expires: {new Date(policy.endTime).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center text-sm">No active policies</p>
        )}
      </div>
    </div>
  );
};

export default ActivePolicies;