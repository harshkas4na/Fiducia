"use client";

import { useState } from "react";
import Head from "next/head";
import Spline from "@splinetool/react-spline/next";

const Home: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWallet = async (): Promise<void> => {
    // Implement your wallet connection logic here
    setIsConnected(true);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col text-white overflow-hidden relative">
      <Head>
        <title>Fiducia - Crypto Insurance DApp</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          ::-webkit-scrollbar {
            display: none;
          }
          html, body {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          @keyframes shimmer {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>
      </Head>

      <main className="flex-grow flex items-center justify-center w-full">
        <Spline scene="https://prod.spline.design/fInhCGXNhH2TQe16/scene.splinecode" />
      </main>

      <button
        onClick={connectWallet}
        className="absolute top-4 right-20 z-20 bg-gradient-to-r from-orange-600 to-orange-300 text-white font-bold py-2 px-1 rounded-xl transform transition duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
        style={{
          animation: "shimmer 3s linear infinite",
          backgroundSize: "200% 200%",
          boxShadow: "0 0 5px #763fff, 0 0 10px #ffffd4",
          textShadow: "0 0 1px #fff, 0 0 1px #fff",
        }}
      >
        {isConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>

      <footer className="absolute bottom-0 w-full p-4 text-center text-gray-200 bg-gray-800 bg-opacity-10">
        <p>&copy; 2024 Fiducia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
