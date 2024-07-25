"use client";
import { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import WithdrawButton from "./WithdrawButton";
import { useContract } from "../context/ContractContext";
import { useUser } from "../context/UserContext";
import Web3, { Numbers } from "web3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawFundsSection = () => {
  const { WalletContract, ERC20Contract } = useContract();
  const [memeCoinsBalance, setMemeCoins] = useState<string>("");
  const { account } = useUser();

  useEffect(() => {
    const fetchContractData = async () => {
      if (typeof window.ethereum === "undefined") {
        console.error("Ethereum provider not found.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const memeCoinsBalance: Numbers = await ERC20Contract.methods
          .balanceOf(account)
          .call();
        setMemeCoins(web3.utils.fromWei(memeCoinsBalance, "ether"));
      } catch (error) {
        console.error("Error fetching data from contract:", error);
      }
    };
    fetchContractData();
  }, [ERC20Contract, account]);

  const handleWithdraw = async () => {
    // Implement withdrawal logic here

    try {
      // Connect to the Ethereum provider
      if (!window.ethereum) {
        toast.error("Please install MetaMask or another Ethereum wallet.");
        return;
      }

      if (!account) {
        toast.error("Please connect your Ethereum wallet.");
        return;
      }

      const web3 = new Web3(window.ethereum);

      // Call the contribute function on the contract
      const tx = await WalletContract.methods.leaveShareholding().send({
        from: account,
      });

      // Wait for the transaction receipt
      await web3.eth.getTransactionReceipt(tx.transactionHash);

      toast.error("Contribution successful!");
    } catch (error) {
      console.error("Error contributing:", error);
      toast.error("An error occurred while contributing.");
    }
  };

  return (
    <div className="backdrop-blur-md bg-gray-800 bg-opacity-10 p-6 rounded-3xl shadow-lg w-full max-w-md mx-auto relative overflow-hidden">
      <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center border border-blue-300 rounded-lg py-2">
          Withdraw Shares
        </h2>
        <div className="text-center mb-6">
          <p className="text-sm text-blue-200 mb-2">FIDU Coin Balance</p>
          <p className="text-2xl font-bold text-white">
            <FaCoins className="inline mr-2 text-yellow-400" />
            {memeCoinsBalance} FIDU
          </p>
        </div>
        <div className="flex justify-center">
          <WithdrawButton handleWithdraw={handleWithdraw} />
        </div>
      </div>
    </div>
  );
};

export default WithdrawFundsSection;
