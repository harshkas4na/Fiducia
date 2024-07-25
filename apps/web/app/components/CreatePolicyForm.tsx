"use client";

import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useContract } from "../context/ContractContext";
import Web3 from "web3";
import BN from "bn.js";
import { CryptoInsurance_ABI } from "../_web3/ABIs/CryptoInsurance_ABI";
import { CryptoInsurance_ADDRESS } from "../_web3/constants";
import { useUser } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const insuranceTypes = [
  { id: "0", name: "Loan Insurance" },
  { id: "1", name: "Threshold Insurance" },
  { id: "2", name: "Sudden Drop Insurance" },
];

const CreatePolicyForm: React.FC = () => {
  const { InsuranceContract, setInsuranceContract } = useContract();
  const { account } = useUser();

  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [dropPercentage, setDropPercentage] = useState("");
  const [loading, setLoading] = useState(false);

  const getPremiumRate = (insuranceType: string) => {
    switch (insuranceType) {
      case "0": return 1000; // LOAN_PREMIUM_RATE
      case "1": return 1500; // THRESHOLD_PREMIUM_RATE
      case "2": return 2000; // SUDDEN_DROP_PREMIUM_RATE
      default: throw new Error("Invalid insurance type");
    }
  };

  const calculatePremium = (insuranceType: string, coverageAmount: string) => {
    const rate = getPremiumRate(insuranceType);
    return (new BN(coverageAmount).mul(new BN(rate))).div(new BN(10000));
  };

  const handleCreatePolicy = async () => {
    if (!window.ethereum || !InsuranceContract) {
      toast.error(
        "Please connect to MetaMask and ensure the contract is loaded."
      );
      return;
    }

    setLoading(true);

    try {
      const web3 = new Web3(window.ethereum);

      const assetAddress = getAssetAddress(selectedAsset);
      const coverageAmountWei = web3.utils.toWei(coverageAmount, "ether");

      const premiumWei = calculatePremium(selectedType, coverageAmountWei).toString();

      const triggerPriceOrDropPercentage = selectedType === "2" ? dropPercentage : triggerPrice;

      const transaction = await InsuranceContract.methods
        .createPolicy(
          assetAddress,
          selectedType,
          coverageAmountWei,
          triggerPriceOrDropPercentage
        )
        .send({
          from: account,
          value: premiumWei,
        });
      toast.success("Policy created successfully!");
    } catch (error) {
      console.error("Error creating policy:", error);
      toast.error("Failed to create policy. Check console for details.");
    } finally {
      setSelectedAsset("");
      setSelectedType("");
      setCoverageAmount("");
      setTriggerPrice("");
      setDropPercentage("");
      setLoading(false);
    }
  };

  const getAssetAddress = (asset: string) => {
    const assetAddresses: { [key: string]: string } = {
      ETH: "0x1234567890123456789012345678901234567890",
      BTC: "0x0987654321098765432109876543210987654321",
    };
    return (
      assetAddresses[asset] || "0x0000000000000000000000000000000000000000"
    );
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
        {selectedType !== "2" && (
          <input
            type="number"
            value={triggerPrice}
            onChange={(e) => setTriggerPrice(e.target.value)}
            placeholder="Trigger Price"
            className="w-full bg-gray-700 bg-opacity-20 text-white px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        )}
        {selectedType === "2" && (
          <input
            type="number"
            value={dropPercentage}
            onChange={(e) => setDropPercentage(e.target.value)}
            placeholder="Drop Percentage (1-100)"
            className="w-full bg-gray-700 bg-opacity-20 text-white px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        )}
        <p className="text-sm text-gray-400 mb-3">
          Policy Duration: 30 days
        </p>
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