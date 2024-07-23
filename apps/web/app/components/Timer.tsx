// components/Timer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useContract } from "../context/ContractContext";
import Web3 from "web3";
import { useUser } from "../context/UserContext";

const Timer: React.FC = () => {
  const [closureTime, setClosureTime] = useState<number>(0);
  const { WalletContract } = useContract();
  const { account } = useUser();

  const handleCloseWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      console.error("Ethereum provider not found.");
      return;
    }

    try {

      const web3 = new Web3(window.ethereum);

      const tx = await WalletContract.methods.closeWallet().send({
        from: account,
        
      });

      // Wait for the transaction receipt
      await web3.eth.getTransactionReceipt(tx.transactionHash);
      
      
    } catch (error) {
      console.error("Error closing wallet:", error);
    }
  };


  useEffect(() => {
    const fetchClosureTime = async () => {
      if (typeof window.ethereum === "undefined") {
        console.error("Ethereum provider not found.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);

        const closureTime = await WalletContract.methods.closureTime().call();
        setClosureTime(Number(closureTime));
      } catch (error) {
        console.error("Error fetching closure time from contract:", error);
      }
    };

    fetchClosureTime();
  }, [ WalletContract]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeLeft = () => {
    const difference = closureTime * 1000 - new Date().getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  return (
    <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 p-8 ml-16  rounded-3xl shadow-lg lg:w-2/5 relative overflow-hidden">
      <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-purple-400 text-center mb-4">
          Time Left
        </h2>
        <div className="flex justify-center items-center text-green-300">
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.days}</span>
            <span className="block text-sm">days</span>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.hours}</span>
            <span className="block text-sm">hours</span>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.minutes}</span>
            <span className="block text-sm">minutes</span>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.seconds}</span>
            <span className="block text-sm">seconds</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCloseWallet}
            className="w-40 bg-transparent border-2 border-purple-400 text-purple-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group"
          >
            <span className="relative z-10 text-slate-50">Close Wallet</span>
            <div className="absolute inset-0 bg-purple-800 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(168,85,247,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(168,85,247,0.7)] transition-shadow duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
