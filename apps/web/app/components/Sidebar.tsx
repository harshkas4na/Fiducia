"use client";
import React, { useEffect,useState } from "react";

import Link from "next/link";
import { FaUser, FaEthereum, FaChartLine, FaAddressCard } from "react-icons/fa";
import { useContract } from "../context/ContractContext";
import { useUser } from "../context/UserContext";
import { Numbers } from "web3";
import { FaInfo } from "react-icons/fa6";
import Image from "next/image";

interface SidebarProps {
  username: string;
}
const Sidebar = ({ username }: SidebarProps) => {
  const [WalletClosed, setWalletClosed] = useState(false);
  const { Contributed, setContributed, WalletContract } = useContract();
  const { account } = useUser();

  useEffect(() => {
    const getContributed = async () => {
      if (!account) return;
      const totalContributionsInWei = await WalletContract.methods
        .totalContributions()
        .call();
      if (totalContributionsInWei > 0) {
        setContributed(true);
      } else {
        console.log("Contributed", Contributed);
        setContributed(false);
      }
    };

    const checkWalletStatus = async () => {
      if (!account) return;
      const walletStatus = await WalletContract.methods.walletClosed().call();
      setWalletClosed(walletStatus);
    }

    checkWalletStatus();
    getContributed();
  }, [account, WalletContract]);

  

  return (
    <div className="w-64 bg-gray-600 bg-opacity-10 p-5 relative">
      <Link href="/Home" className="flex cursor-pointer items-center mb-10">
      <Image
              src="/logo.png"
              alt="Fiducia"
              width={100}
              height={100}
              className="rounded-[10px]"
            />
      </Link>
      <nav>
        <Link
          href={WalletClosed ? "/Home/shareholdings" : "/Home/contribute"}
          className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
        >
          <FaEthereum className="mr-3" />
          {WalletClosed ? "Shareholdings" : "Contribute"}
        </Link>
        <Link
          href="/Home/policies"
          className="flex items-center py-2 px-4 mt-2 hover:bg-gray-700 rounded"
        >
          <FaChartLine className="mr-3" />
          Policies
        </Link>
        <Link
          href="/Home/about"
          className="flex items-center py-2 px-4 mt-2 hover:bg-gray-700 rounded"
        >
          <FaInfo className="mr-3" />
          About
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
