"use client";
import React,{useEffect} from 'react'

import Link from "next/link";
import { FaUser, FaEthereum, FaChartLine } from "react-icons/fa";
import { useContract } from '../context/ContractContext';
import { useUser } from '../context/UserContext';
import { Numbers } from 'web3';

interface SidebarProps {
  username: string;
  
}
const Sidebar = ({username}:SidebarProps) => {

  const {Contributed,setContributed,WalletContract}=useContract();
  const {account}=useUser();

  useEffect(() => {
    const getContributed = async () => {
      if (!account) return;
      const totalContributionsInWei = await WalletContract.methods.totalContributions().call();
      if(totalContributionsInWei>0){
      setContributed(true);
      }
      else{
        console.log("Contributed",Contributed);
        setContributed(false);
      }
    };
  
   
      getContributed();
    
  }, [account])

 
  

  return (
    <div className="w-64 bg-gray-600 bg-opacity-10 p-5 relative">
        <Link href="/Home" className="flex cursor-pointer items-center mb-10">
          <FaUser className="text-2xl mr-3" />
          <span className="text-lg font-semibold">{username}</span>
        </Link>
        <nav>
          <Link
            href={Contributed ? "/Home/shareholdings" : "/Home/contribute"}
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
          >
            <FaEthereum className="mr-3" />
            {Contributed ? "Shareholdings" : "Contribute"}
          </Link>
          <Link
            href="/Home/policies"
            className="flex items-center py-2 px-4 mt-2 hover:bg-gray-700 rounded"
          >
            <FaChartLine className="mr-3" />
            Policies
          </Link>
        </nav>
      </div>
  )
}

export default Sidebar