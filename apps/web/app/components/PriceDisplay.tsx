"use client";
import React, { useState, useEffect } from 'react';
import { FaEthereum } from "react-icons/fa";
import CryptoChart from '../Home/CryptoChart';

export default function PriceDisplay() {
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    // Fetch ETH price here
    setEthPrice(3000);
  }, []);

  return (
    <div className="bg-white bg-opacity-5 p-6 rounded-xl shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Price Chart
              </h2>
              <CryptoChart />
              <p className="text-3xl font-bold mt-4 flex items-center text-white">
                <FaEthereum className="mr-2" />
                <span>${ethPrice.toFixed(2)}</span>
              </p>
            </div>
  );
}