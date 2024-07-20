"use client";

import { useState } from "react";
import { FaEthereum } from "react-icons/fa";

const insuranceTypes = [
  { id: "LOAN", name: "Loan Insurance" },
  { id: "THRESHOLD", name: "Threshold Insurance" },
  { id: "SUDDEN_DROP", name: "Sudden Drop Insurance" },
];

interface CreatePolicyFormProps {
  onCreatePolicy: (policy: any) => void;
}

const CreatePolicyForm: React.FC<CreatePolicyFormProps> = ({ onCreatePolicy }) => {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");

  const handleCreatePolicy = () => {
    onCreatePolicy({
      selectedAsset,
      selectedType,
      coverageAmount,
      triggerPrice,
    });
  };

  return (
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
          <option value="" disabled className="bg-gray-800 text-slate-300">
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
            <option key={type.id} value={type.id} className="bg-gray-800 text-slate-300">
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
            <span className="relative z-10 text-slate-50">Create Policy</span>
            <div className="absolute inset-0 bg-blue-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(59,130,246,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(59,130,246,0.7)] transition-shadow duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePolicyForm;
