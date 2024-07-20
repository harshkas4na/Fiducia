"use client";

import React, { useState,useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import Web3 from "web3";
import { MultiPartyWallet_ADDRESS } from "../_web3/constants";
import { MultiPartyWallet_ABI } from "../_web3/ABIs/MultiPartyWallet_ABI";
import { useContract } from "../context/ContractContext";
import { useUser } from "../context/UserContext";
import { set } from "date-fns/set";

interface ContributionFormProps {
  minimumContribution: string;
}



const ContributionForm: React.FC<ContributionFormProps> = ({ minimumContribution }) => {
  const {WalletContract,setWalletContract}=useContract();
const {account}=useUser();
const [contribution, setContribution] = useState("");

useEffect(() => {
  const ConnectContract=async()=>{
    // Create a new instance of Web3
    const web3 = new Web3(window.ethereum);
    // Create a new contract instance
    const contract = new web3.eth.Contract(MultiPartyWallet_ABI as any, MultiPartyWallet_ADDRESS);
    setWalletContract(contract);
  }

  return () => {
    ConnectContract();
  }
}, [account]);



  const handleContribute = async () => {
    if (!contribution || parseFloat(contribution) <= 0) {
      alert("Please enter a valid contribution amount.");
      return;
    }

    try {
      // Connect to the Ethereum provider
      if (!window.ethereum) {
        alert("Please install MetaMask or another Ethereum wallet.");
        return;
      }

      if (!account) {
        alert("Please connect your Ethereum wallet.");
        return;
      }

      
      const web3 = new Web3(window.ethereum);
      // Convert contribution to Wei (1 ETH = 10^18 Wei)
      const amountInWei = web3.utils.toWei(contribution, "ether");

      // Call the contribute function on the contract
      const tx = await WalletContract.methods.contribute().send({
        from: account,
        value: amountInWei
      });

      // Wait for the transaction receipt
      await web3.eth.getTransactionReceipt(tx.transactionHash);

      alert("Contribution successful!");
    } catch (error) {
      console.error("Error contributing:", error);
      alert("An error occurred while contributing.");
    }
  };


  return (
    <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 p-6 ml-2 rounded-3xl shadow-lg w-full lg:w-1/2 relative bottom-20 overflow-hidden">
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
            className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributionForm;