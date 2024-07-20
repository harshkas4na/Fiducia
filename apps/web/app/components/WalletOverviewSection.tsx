// components/WalletOverviewSection.tsx
"use client";
import {
    FaMoneyBillWave,
    FaCoins
  } from "react-icons/fa";
import { useState,useEffect } from "react";
import { useContract } from "../context/ContractContext";
import { useUser } from "../context/UserContext";
import Web3, { Numbers } from "web3";
  
  interface WalletOverviewSectionProps {
    
    memeCoins: string;
  }
  
  const WalletOverviewSection = ({
    memeCoins
  }: WalletOverviewSectionProps) => {
    const {WalletContract}=useContract();
    const {account}=useUser();

    const [totalContributions, setTotalContributions] = useState<string>("");
    useEffect(() => {
      const fetchContractData = async () => {
        if (typeof window.ethereum === "undefined") {
          console.error("Ethereum provider not found.");
          return;
        }
  
        try {
          const web3 = new Web3(window.ethereum);
          const totalContributionsInWei:Numbers = await WalletContract.methods.totalContributions().call();
          setTotalContributions(web3.utils.fromWei(totalContributionsInWei, "ether"));
  
        } catch (error) {
          console.error("Error fetching data from contract:", error);
        }
      };
  
      fetchContractData();
    }, []);


    

    return (
      <div className="backdrop-blur-md bg-gray-800 bg-opacity-10 p-6 mr-2 rounded-3xl shadow-lg w-full lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border border-blue-300 rounded-lg py-2">
            Wallet Overview
          </h2>
          <div className="text-center mb-6">
            <p className="text-sm text-blue-200 mb-2">Total Contributions</p>
            <p className="text-2xl font-bold text-white">
              <FaMoneyBillWave className="inline mr-2 text-green-400" />
              {totalContributions} ETH
            </p>
          </div>
          <div className="text-center mb-6">
            <p className="text-sm text-blue-200 mb-2">Your MemeCoin Balance</p>
            <p className="text-2xl font-bold text-white">
              <FaCoins className="inline mr-2 text-red-800" />
              {memeCoins} MEME
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WalletOverviewSection;
  