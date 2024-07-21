"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useUser } from "../context/UserContext";

declare global {
  interface Window {
    ethereum: any;
  }
}

const ConnectWallet: React.FC = () => {
  const {
    isConnected,
    setIsConnected,
    userName,
    setUserName,
    account,
    setAccount,
  } = useUser();

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <>
      <button
        onClick={connectWallet}
        className="absolute top-0 right-0 m-4 p-2 bg-transparent border-2 border-gray-200 text-gray-200 font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm overflow-hidden group"
      >
        <span className="relative z-10">
          {isConnected ? "Wallet Connected" : "Connect Wallet"}
        </span>
        <div className="absolute inset-0 bg-gray-800 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(229,231,235,0.4)] group-hover:shadow-[inset_0_0_15px_rgba(229,231,235,0.7)] transition-shadow duration-300"></div>
      </button>
    </>
  );
};

export default ConnectWallet;
