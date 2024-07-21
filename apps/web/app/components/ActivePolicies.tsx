"use client";

import { useEffect, useState } from "react";
import { FaShieldAlt, FaCoins, FaChartLine, FaEthereum } from "react-icons/fa";
import { useContract } from "../context/ContractContext";
import Web3 from 'web3';

interface Policy {
  id: number;
  asset: string;
  type: string;
  coverage: string;
  triggerPrice: string;
  endTime: string;
}

const ActivePolicies: React.FC = () => {
  const { InsuranceContract } = useContract();
  const [activePolicies, setActivePolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      if (!InsuranceContract || !window.ethereum) return;

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      try {
        const supportedAssetsList = await InsuranceContract.methods.supportedAssetsList().call();
        let policies: Policy[] = [];

        for (let asset of supportedAssetsList) {
          for (let i = 0; i < 3; i++) { // For each insurance type
            const policy = await InsuranceContract.methods.policies(asset, userAddress).call();
            if (policy.active) {
              policies.push({
                id: policies.length + 1,
                asset: await getAssetSymbol(asset),
                type: InsuranceType[i],
                coverage: web3.utils.fromWei(policy.coverageAmount, 'ether'),
                triggerPrice: web3.utils.fromWei(policy.triggerPrice, 'ether'),
                endTime: new Date(policy.endTime * 1000).toISOString().split('T')[0]
              });
            }
          }
        }

        setActivePolicies(policies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [InsuranceContract]);

  const getAssetSymbol = async (assetAddress: string) => {
    // This is a placeholder. You might want to implement a proper mapping or fetch from contract
    const assetMap: {[key: string]: string} = {
      "0x1234...": "ETH",
      "0x5678...": "BTC",
      // Add more mappings as needed
    };
    return assetMap[assetAddress] || "Unknown";
  };

  const InsuranceType = ["LOAN", "THRESHOLD", "SUDDEN_DROP"];

  const insuranceTypes = [
    { id: "LOAN", name: "Loan Insurance", icon: FaCoins, color: "text-blue-400" },
    { id: "THRESHOLD", name: "Threshold Insurance", icon: FaShieldAlt, color: "text-green-400" },
    { id: "SUDDEN_DROP", name: "Sudden Drop Insurance", icon: FaChartLine, color: "text-yellow-400" },
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