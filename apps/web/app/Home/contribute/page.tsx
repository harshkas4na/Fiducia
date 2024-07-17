'use client'

import { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';

export default function ContributePage() {
  const [contribution, setContribution] = useState('');
  const [minimumContribution, setMinimumContribution] = useState('0.1'); // Fetch this from the contract

  const handleContribute = async () => {
    // Implement contribution logic here using the MultiPartyWallet contract
    console.log('Contributing:', contribution, 'ETH');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Contribute to Fiducia</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Make a Contribution</h2>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
            placeholder="Amount in ETH"
            className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
          />
          <span className="bg-gray-600 px-4 py-2 rounded-r-lg">
            <FaEthereum className="inline mr-1" />
            ETH
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Minimum contribution: {minimumContribution} ETH
        </p>
        <button
          onClick={handleContribute}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Contribute
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Contribution Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Become a shareholder in the Fiducia MultiPartyWallet</li>
          <li>Earn a share of the wallet's profits</li>
          <li>Participate in decision-making processes</li>
          <li>Access to exclusive Fiducia features and services</li>
        </ul>
      </div>
    </div>
  );
}