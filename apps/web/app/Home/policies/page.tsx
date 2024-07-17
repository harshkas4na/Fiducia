'use client'

import { useState, useEffect } from 'react';
import { FaShieldAlt, FaCoins, FaChartLine } from 'react-icons/fa';

const insuranceTypes = [
  { id: 'LOAN', name: 'Loan Insurance', icon: FaCoins },
  { id: 'THRESHOLD', name: 'Threshold Insurance', icon: FaShieldAlt },
  { id: 'SUDDEN_DROP', name: 'Sudden Drop Insurance', icon: FaChartLine },
];

export default function PoliciesPage() {
  const [activePolicies, setActivePolicies] = useState<Array<{
    id: number;
    asset: string;
    type: string;
    coverage: string;
    triggerPrice: string;
    endTime: string;
  }>>([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [triggerPrice, setTriggerPrice] = useState('');

  useEffect(() => {
    // Fetch active policies from the ImprovedCryptoInsurance contract
    // This is mock data for now
    setActivePolicies([
      { id: 1, asset: 'ETH', type: 'LOAN', coverage: '5', triggerPrice: '2000', endTime: '2024-08-01' },
      { id: 2, asset: 'BTC', type: 'SUDDEN_DROP', coverage: '0.1', triggerPrice: '30000', endTime: '2024-09-15' },
    ]);
  }, []);

  const handleCreatePolicy = async () => {
    // Implement policy creation logic here
    console.log('Creating policy:', { selectedAsset, selectedType, coverageAmount, triggerPrice });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crypto Insurance Policies</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Policy</h2>
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
          >
            <option value="">Select Asset</option>
            <option value="ETH">Ethereum</option>
            <option value="BTC">Bitcoin</option>
            {/* Add more assets as needed */}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
          >
            <option value="">Select Insurance Type</option>
            {insuranceTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            placeholder="Coverage Amount"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
          />
          <input
            type="number"
            value={triggerPrice}
            onChange={(e) => setTriggerPrice(e.target.value)}
            placeholder="Trigger Price"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
          />
          <button
            onClick={handleCreatePolicy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Create Policy
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Active Policies</h2>
          {activePolicies.length > 0 ? (
            <ul className="space-y-4">
              {activePolicies.map((policy) => (
                <li key={policy.id} className="bg-gray-700 p-4 rounded">
                  <p className="font-semibold">
                    {policy.asset} - {insuranceTypes.find(t => t.id === policy.type)?.name || 'Unknown Type'}
                  </p>
                  <p>Coverage: {policy.coverage} {policy.asset}</p>
                  <p>Trigger Price: ${policy.triggerPrice}</p>
                  <p>Expires: {new Date(policy.endTime).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No active policies</p>
          )}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Insurance Types Explained</h2>
        <ul className="space-y-4">
          {insuranceTypes.map((type) => (
            <li key={type.id} className="flex items-start">
              <type.icon className="text-2xl mr-3 mt-1" />
              <div>
                <h3 className="font-semibold">{type.name}</h3>
                <p className="text-gray-400">
                  {type.id === 'LOAN' && 'Protects against price drops below a specified loan threshold.'}
                  {type.id === 'THRESHOLD' && 'Triggers when the asset price falls below a set threshold.'}
                  {type.id === 'SUDDEN_DROP' && 'Activates if there\'s a sudden significant price drop within 24 hours.'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}