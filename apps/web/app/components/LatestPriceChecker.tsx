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
      const assetAddress = await InsuranceContract.methods.supportedAssetsList(0).call();
      const assetInfo = await InsuranceContract.methods.supportedAssets(assetAddress).call();
      const priceFeedAddress = assetInfo.priceFeed;

      const latestPrice = await InsuranceContract.methods.getLatestPrice(priceFeedAddress).call();
      
      const web3 = new Web3(window.ethereum);
      const price =String(Number(latestPrice));
      
      setLatestPrice(price);
    } catch (error) {
      console.error("Error fetching latest price:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 w-[50%] mb-9 bg-opacity-50 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-blue-300">Check Latest ETH Price</h3>
      <button
        onClick={checkLatestPrice}
        disabled={loading}
        className="w-full bg-transparent border-2 border-blue-400 text-blue-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group"
      >
        {loading ? "Checking..." : "Check Price"}
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