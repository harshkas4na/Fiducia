"use client";
import React, { useState, useEffect } from 'react';
import { FaEthereum,FaBitcoin } from "react-icons/fa";
import CryptoChart from '../Home/CryptoChart';

export default function PriceDisplay() {
  const [ethPrice, setEthPrice] = useState(0);
  const [BitcoinPrice, setBitcoinPrice] = useState(0);
  

  return (
    <div className="bg-white bg-opacity-5 p-6 rounded-xl shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Price Chart
              </h2>
              <CryptoChart 
                setEthPrice={setEthPrice}
                setBitcoinPrice={setBitcoinPrice}
              />
              <div className="text-2xl flex-col  font-bold mt-4  text-white">
                <div className='flex'>
                  <FaEthereum className="mr-2" />
                  <span > ${ethPrice.toFixed(2)}</span> 
                </div>
                <br />
                <div className='flex'>
                  <FaBitcoin className="mr-2" />
                  <span> ${BitcoinPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
  );
}