'use client'

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    // Implement your wallet connection logic here
    setIsConnected(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <Head>
        <title>Fiducia - Crypto Insurance DApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-6xl font-bold mb-8">Fiducia</h1>
        
        <div className="mb-8">
          {/* Placeholder for 3D minion */}
          <div className="w-64 h-64 bg-yellow-500 rounded-full mx-auto flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
        </div>

        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </main>

      <footer className="mt-8 text-gray-400">
        <p>&copy; 2024 Fiducia. All rights reserved.</p>
      </footer>
    </div>
  );
}