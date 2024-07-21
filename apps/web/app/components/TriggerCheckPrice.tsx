// "use client";

// import React, { useState, useEffect } from 'react';
// import { useContract } from "../context/ContractContext";
// import Web3 from 'web3';

// const TriggerCheckPrice: React.FC = () => {
//   const { InsuranceContract } = useContract();
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastTriggerTime, setLastTriggerTime] = useState<Date | null>(null);
//   const [rewardBalance, setRewardBalance] = useState<string>('0');
//   const [isClaimLoading, setIsClaimLoading] = useState(false);

//   useEffect(() => {
//     fetchRewardBalance();
//   }, [InsuranceContract]);

//   const fetchRewardBalance = async () => {
//     if (!InsuranceContract || !window.ethereum) return;

//     try {
//       const web3 = new Web3(window.ethereum);
//       const accounts = await web3.eth.getAccounts();
//       const userAddress = accounts[0];

//       const reward = await InsuranceContract.methods.rewards(userAddress).call();
//       setRewardBalance(web3.utils.fromWei(reward, 'ether'));
//     } catch (error) {
//       console.error("Error fetching reward balance:", error);
//     }
//   };

//   const handleTriggerPriceCheck = async () => {
//     if (!InsuranceContract || !window.ethereum) {
//       alert("Please connect to MetaMask and ensure the contract is loaded.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const web3 = new Web3(window.ethereum);
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const accounts = await web3.eth.getAccounts();

//       const transaction = await InsuranceContract.methods.triggerPriceCheck().send({
//         from: accounts[0],
//       });

//       console.log("Price check triggered:", transaction);
//       setLastTriggerTime(new Date());
//       alert(`Price check triggered successfully! You've earned a reward.`);

//       // Fetch updated reward balance
//       await fetchRewardBalance();
//     } catch (error) {
//       console.error("Error triggering price check:", error);
//       alert("Failed to trigger price check. Check console for details.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClaimReward = async () => {
//     if (!InsuranceContract || !window.ethereum) {
//       alert("Please connect to MetaMask and ensure the contract is loaded.");
//       return;
//     }

//     setIsClaimLoading(true);

//     try {
//       const web3 = new Web3(window.ethereum);
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const accounts = await web3.eth.getAccounts();

//       const transaction = await InsuranceContract.methods.claimReward().send({
//         from: accounts[0],
//       });

//       console.log("Reward claimed:", transaction);
//       alert(`Reward claimed successfully!`);

//       // Fetch updated reward balance
//       await fetchRewardBalance();
//     } catch (error) {
//       console.error("Error claiming reward:", error);
//       alert("Failed to claim reward. Check console for details.");
//     } finally {
//       setIsClaimLoading(false);
//     }
//   };

//   return (
//     <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 p-5 rounded-3xl shadow-lg relative overflow-hidden">
//       <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
//       <div className="relative z-10">
//         <h2 className="text-xl font-semibold mb-4 text-blue-300 text-center border-b border-blue-300 pb-2">
//           Price Check and Rewards
//         </h2>
//         <p className="text-sm text-gray-300 mb-4 text-center">
//           Trigger a price check and earn rewards!
//         </p>
//         <button
//           onClick={handleTriggerPriceCheck}
//           disabled={isLoading}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//         >
//           {isLoading ? "Triggering..." : "Trigger Price Check"}
//         </button>
//         {lastTriggerTime && (
//           <p className="text-xs text-gray-400 mt-2 text-center mb-4">
//             Last triggered: {lastTriggerTime.toLocaleString()}
//           </p>
//         )}
//         <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg mb-4">
//           <p className="text-sm text-gray-300 text-center">
//             Your Reward Balance: <span className="font-bold text-blue-300">{rewardBalance} ETH</span>
//           </p>
//         </div>
//         <button
//           onClick={handleClaimReward}
//           disabled={isClaimLoading || parseFloat(rewardBalance) === 0}
//           className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isClaimLoading ? "Claiming..." : "Claim Reward"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TriggerCheckPrice;

"use client";

import React, { useState, useEffect } from "react";
import { useContract } from "../context/ContractContext";
import Web3 from "web3";

const TriggerCheckPrice: React.FC = () => {
  const { InsuranceContract } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [lastTriggerTime, setLastTriggerTime] = useState<Date | null>(null);
  const [rewardBalance, setRewardBalance] = useState<string>("0");
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [timeUntilNextTrigger, setTimeUntilNextTrigger] = useState<string>("");

  useEffect(() => {
    fetchRewardBalance();
    const storedLastTriggerTime = localStorage.getItem("lastTriggerTime");
    if (storedLastTriggerTime) {
      setLastTriggerTime(new Date(storedLastTriggerTime));
    }
  }, [InsuranceContract]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastTriggerTime) {
        const now = new Date();
        const timeDiff = 3600000 - (now.getTime() - lastTriggerTime.getTime());
        if (timeDiff > 0) {
          const minutes = Math.floor(timeDiff / 60000);
          const seconds = Math.floor((timeDiff % 60000) / 1000);
          setTimeUntilNextTrigger(`${minutes}m ${seconds}s`);
        } else {
          setTimeUntilNextTrigger("");
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastTriggerTime]);

  const fetchRewardBalance = async () => {
    if (!InsuranceContract || !window.ethereum) return;

    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      const reward = await InsuranceContract.methods
        .rewards(userAddress)
        .call();
      setRewardBalance(web3.utils.fromWei(reward, "ether"));
    } catch (error) {
      console.error("Error fetching reward balance:", error);
    }
  };

  const handleTriggerPriceCheck = async () => {
    if (!InsuranceContract || !window.ethereum) {
      alert("Please connect to MetaMask and ensure the contract is loaded.");
      return;
    }

    const now = new Date();
    if (
      lastTriggerTime &&
      now.getTime() - lastTriggerTime.getTime() < 3600000
    ) {
      alert("You can only trigger a price check once per hour.");
      return;
    }

    setIsLoading(true);

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();

      const transaction = await InsuranceContract.methods
        .triggerPriceCheck()
        .send({
          from: accounts[0],
        });

      console.log("Price check triggered:", transaction);
      const newTriggerTime = new Date();
      setLastTriggerTime(newTriggerTime);
      localStorage.setItem("lastTriggerTime", newTriggerTime.toISOString());
      alert(`Price check triggered successfully! You've earned a reward.`);

      // Fetch updated reward balance
      await fetchRewardBalance();
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

    setIsClaimLoading(true);

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();

      const transaction = await InsuranceContract.methods.claimReward().send({
        from: accounts[0],
      });

      console.log("Reward claimed:", transaction);
      alert(`Reward claimed successfully!`);

      // Fetch updated reward balance
      await fetchRewardBalance();
    } catch (error) {
      console.error("Error claiming reward:", error);
      alert("Failed to claim reward. Check console for details.");
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
        {lastTriggerTime && (
          <p className="text-xs text-gray-400 mt-2 text-center mb-4">
            Last triggered: {lastTriggerTime.toLocaleString()}
          </p>
        )}
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
