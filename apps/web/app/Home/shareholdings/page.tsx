'use client'

import { useState, useEffect } from 'react';
import { FaEthereum, FaCoins } from 'react-icons/fa';

export default function ShareholdingsPage() {
  const [totalContributions, setTotalContributions] = useState('0');
  const [userContribution, setUserContribution] = useState('0');
  const [userShare, setUserShare] = useState('0');
  const [unclaimedFunds, setUnclaimedFunds] = useState('0');
  const [memeCoins, setMemeCoins] = useState('0');

  useEffect(() => {
    // Fetch shareholding data from the MultiPartyWallet contract
    // This is mock data for now
    setTotalContributions('100');
    setUserContribution('10');
    setUserShare('10');
    setUnclaimedFunds('0.5');
    setMemeCoins('1000');
  }, []);

  const handleWithdraw = async () => {
    // Implement withdrawal logic here
    console.log('Withdrawing unclaimed funds');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Shareholdings</h1>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Contribution</h2>
          <p className="text-3xl font-bold">
            <FaEthereum className="inline mr-2" />
            {userContribution} ETH
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Share</h2>
          <p className="text-3xl font-bold">{userShare}%</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Wallet Overview</h2>
        <p className="mb-2">Total Contributions: {totalContributions} ETH</p>
        <p className="mb-2">Your Unclaimed Funds: {unclaimedFunds} ETH</p>
        <p>Your MemeCoin Balance: {memeCoins} MEME</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Withdraw Funds</h2>
        <p className="mb-4">You have {unclaimedFunds} ETH available to withdraw.</p>
        <button
          onClick={handleWithdraw}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Withdraw Funds
        </button>
      </div>
    </div>
  );
}