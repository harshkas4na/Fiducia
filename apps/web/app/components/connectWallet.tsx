"use client";
import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { useUser } from "../context/UserContext";

declare global {
  interface Window {
    ethereum: any
  }
}



const ConnectWallet: React.FC= () => {
  
  const {isConnected,setIsConnected,userName,setUserName,account,setAccount}= useUser();
  

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          const accounts = await web3.eth.getAccounts()
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error)
        }
      }
    }

    checkIfWalletIsConnected()
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
    } else {
      alert('Please install MetaMask to use this feature.')
    }
  }

  return (
    <button
      onClick={connectWallet}
      style={{
        animation: "shimmer 3s linear infinite",
        backgroundSize: "200% 200%",
        boxShadow: "0 0 5px #763fff, 0 0 10px #ffffd4",
        textShadow: "0 0 1px #fff, 0 0 1px #fff",
      }}
      className='absolute top-0 right-0 m-4 p-2 '
    >
        
      {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
    </button>
  )
}

export default ConnectWallet
