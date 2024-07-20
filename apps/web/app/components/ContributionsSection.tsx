// components/ContributionsSection.tsx

import {
    FaEthereum,
    FaChartPie,
    FaWallet
  } from "react-icons/fa";

import Web3, { Numbers } from "web3";
import { useEffect, useState } from "react";
import { useContract } from "../context/ContractContext";
import { useUser } from "../context/UserContext";
  

  
  const ContributionsSection: React.FC = () => {

    const {WalletContract}=useContract();
const {account}=useUser();
    const [userContribution, setUserContribution] = useState<string>("");
    const [userShare, setUserShare] = useState<string>("");
    const [totalContributions, setTotalContributions] = useState<string>("");
  
    useEffect(() => {
      const fetchContractData = async () => {
        if (typeof window.ethereum === "undefined") {
          console.error("Ethereum provider not found.");
          return;
        }
  
        try {
          const web3 = new Web3(window.ethereum);

          
  
          // Fetch total contributions
          const totalContributionsInWei:Numbers = await WalletContract.methods.totalContributions().call();
          setTotalContributions(web3.utils.fromWei(totalContributionsInWei, "ether"));
  
          // Fetch user contribution and share
          const userShareholder:any = await WalletContract.methods.shareholders(account).call();
          setUserContribution(web3.utils.fromWei(userShareholder.contribution, "ether"));
          setUserShare(web3.utils.fromWei(userShareholder.share, "ether")); // Adjust if needed
  
        } catch (error) {
          console.error("Error fetching data from contract:", error);
        }
      };
  
      fetchContractData();
    }, []);
  
    return (
      <div className="backdrop-blur-md bg-gray-800 bg-opacity-20 p-6 ml-2 rounded-3xl shadow-lg w-full lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border-b border-blue-300 pb-2">
            Your Contributions
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-blue-200 mb-2">Your Contribution</p>
              <p className="text-2xl font-bold text-white">
                <FaEthereum className="inline mr-2 text-blue-400" />
                {userContribution} ETH
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-blue-200 mb-2">Your Share</p>
              <p className="text-2xl font-bold text-white">
                <FaChartPie className="inline mr-2 text-green-400" />
                {userShare}%
              </p>
            </div>
          </div>
          <div className="text-center mb-6">
            <p className="text-sm text-blue-200 mb-2">Total Contributions</p>
            <p className="text-2xl font-bold text-white">
              <FaWallet className="inline mr-2 text-yellow-400" />
              {totalContributions} ETH
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContributionsSection;