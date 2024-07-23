"use client";

import React, { useState, useEffect } from "react";
import { useContract } from "../context/ContractContext";
import Web3 from "web3";
import { useUser } from "../context/UserContext";

const TriggerCheckPrice: React.FC = () => {
  const { InsuranceContract } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [lastTriggerTime, setLastTriggerTime] = useState<number>(0);
  const [rewardBalance, setRewardBalance] = useState<string>("0");
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [timeUntilNextTrigger, setTimeUntilNextTrigger] = useState<string>("");

  const { account } = useUser();

  useEffect(() => {
    fetchRewardBalance();
    fetchLastTriggerTime();
  }, [InsuranceContract, account]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastTriggerTime) {
        const now = Math.floor(Date.now() / 1000);
        const timeDiff = 3600 - (now - lastTriggerTime);
        if (timeDiff > 0) {
          const minutes = Math.floor(timeDiff / 60);
          const seconds = timeDiff % 60;
          setTimeUntilNextTrigger(`${minutes}m ${seconds}s`);
        } else {
          setTimeUntilNextTrigger("");
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastTriggerTime]);

  const fetchRewardBalance = async () => {
    if (!InsuranceContract || !window.ethereum || !account) return;

    try {
      const web3 = new Web3(window.ethereum);
      const reward = await InsuranceContract.methods.rewards(account).call();
      setRewardBalance(web3.utils.fromWei(reward, "ether"));
    } catch (error) {
      console.error("Error fetching reward balance:", error);
    }
  };

  const fetchLastTriggerTime = async () => {
    if (!InsuranceContract || !window.ethereum) return;

    try {
      const lastTimestamp = await InsuranceContract.methods.LastTriggerTimestamp().call();
      console.log("Last trigger time:", lastTimestamp);
      setLastTriggerTime(Number(lastTimestamp));
    } catch (error) {
      console.error("Error fetching last trigger time:", error);
    }
  };

  const handleTriggerPriceCheck = async () => {
    if (!InsuranceContract || !window.ethereum) {
      alert("Please connect to MetaMask and ensure the contract is loaded.");
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    // if (now - lastTriggerTime < 3600) {
    //   alert(`You can't trigger a price check yet. Please wait ${timeUntilNextTrigger} before trying again.`);
    //   return;
    // }

    setIsLoading(true);

    try {
      const transaction = await InsuranceContract.methods
        .triggerPriceCheck()
        .send({
          from: account,
        });
      alert(`Price check triggered successfully! You've earned a reward.`);

      await fetchRewardBalance();
      await fetchLastTriggerTime();
    } catch (error) {
      console.error("Error triggering price check:", error);
      alert("Failed to trigger price check. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimReward = async () => {
    if (!InsuranceContract || !window.ethereum) {
      alert("Please connect to MetaMask and ensure the contract is loaded.");
      return;
    }

    // if (parseFloat(rewardBalance) === 0) {
    //   alert("You don't have any rewards to claim.");
    //   return;
    // }

    setIsClaimLoading(true);

    try {
      const transaction = await InsuranceContract.methods.claimReward().send({
        from: account,
      });
      if(transaction.status === true){
        alert(`Reward claimed successfully!`);
      }
      else{
        alert(`Contract doesn't have enough Balance!`);
      }
      await fetchRewardBalance();
    } catch (error) {
      console.error("Error claiming reward:", error);
      alert("Failed to claim reward.");
    } finally {
      setIsClaimLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 p-5 rounded-3xl shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
      <div className="relative z-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-300 text-center border-b border-blue-300 pb-2">
          Price Check and Rewards
        </h2>
        <p className="text-sm text-gray-300 mb-4 text-center">
          Trigger a price check and earn rewards!
        </p>
        <button
          onClick={handleTriggerPriceCheck}
          disabled={isLoading || !!timeUntilNextTrigger}
          className="w-full bg-transparent border-2 border-orange-400 text-orange-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          <span className="relative z-10 text-slate-50">
            {isLoading
              ? "Triggering..."
              : timeUntilNextTrigger
              ? `Next trigger in ${timeUntilNextTrigger}`
              : "Trigger Price Check"}
          </span>
          <div className="absolute inset-0 bg-orange-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(251,146,60,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(251,146,60,0.7)] transition-shadow duration-300"></div>
        </button>
        
        <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-300 text-center">
            Your Reward Balance:{" "}
            <span className="font-bold text-blue-300">{rewardBalance} ETH</span>
          </p>
        </div>
        <button
          onClick={handleClaimReward}
          disabled={isClaimLoading || parseFloat(rewardBalance) === 0}
          className="w-full bg-transparent border-2 border-green-400 text-green-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 text-slate-50">
            {isClaimLoading ? "Claiming..." : "Claim Reward"}
          </span>
          <div className="absolute inset-0 bg-green-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(74,222,128,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(74,222,128,0.7)] transition-shadow duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default TriggerCheckPrice;