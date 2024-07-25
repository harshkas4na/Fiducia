"use client";

import { useState } from "react";
import { useContract } from "../context/ContractContext";
import { useUser } from "../context/UserContext";
import Web3 from "web3";

const LatestPriceChecker: React.FC = () => {
  const { InsuranceContract } = useContract();
  const { account } = useUser();
  const [latestPrice, setLatestPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkLatestPrice = async () => {
    if (!InsuranceContract) {
      console.error("Contract not loaded");
      return;
    }

    setLoading(true);
    try {
      // Assuming ETH is the first asset in your supportedAssetsList
      const assetAddress = await InsuranceContract.methods
        .supportedAssetsList(0)
        .call();
      const assetInfo = await InsuranceContract.methods
        .supportedAssets(assetAddress)
        .call();
      const priceFeedAddress = assetInfo.priceFeed;

      const latestPrice = await InsuranceContract.methods
        .getLatestPrice(priceFeedAddress)
        .call();

      const web3 = new Web3(window.ethereum);
      const price = String(Number(latestPrice));

      setLatestPrice(price);
    } catch (error) {
      console.error("Error fetching latest price:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 w-[50%] mb-9 bg-opacity-10 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-blue-300">
        Check Latest ETH Price
      </h3>
      <button
        onClick={checkLatestPrice}
        disabled={loading}
        className="w-full bg-transparent border-2 border-purple-200 text-purple-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        <span className="relative z-10 text-slate-50">
          {loading ? "Checking..." : "Check Price"}
        </span>
        <div className="absolute inset-0 bg-purple-800 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(233,215,250,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(233,215,250,0.7)] transition-shadow duration-300"></div>
      </button>

      {latestPrice && (
        <p className="mt-2 text-green-400">
          Latest ETH Price: {latestPrice} ETH
        </p>
      )}
    </div>
  );
};

export default LatestPriceChecker;
