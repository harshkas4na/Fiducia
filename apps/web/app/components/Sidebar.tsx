import React from 'react'

import Link from "next/link";
import { FaUser, FaEthereum, FaChartLine } from "react-icons/fa";

interface SidebarProps {
  username: string;
  hasContributed: boolean;
}
const Sidebar = ({username,hasContributed}:SidebarProps) => {
  return (
    <div className="w-64 bg-gray-600 bg-opacity-10 p-5 relative">
        <Link href="/Home" className="flex cursor-pointer items-center mb-10">
          <FaUser className="text-2xl mr-3" />
          <span className="text-lg font-semibold">{username}</span>
        </Link>
        <nav>
          <Link
            href={hasContributed ? "/home/shareholdings" : "/Home/contribute"}
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
          >
            <FaEthereum className="mr-3" />
            {hasContributed ? "Shareholdings" : "Contribute"}
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