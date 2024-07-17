// app/home/layout.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaEthereum, FaChartLine } from 'react-icons/fa';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [username, setUsername] = useState('John Doe'); // Replace with actual user data
  const [hasContributed, setHasContributed] = useState(false); // Replace with actual user status

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5">
        <div className="flex items-center mb-10">
          <FaUser className="text-2xl mr-3" />
          <span className="text-lg font-semibold">{username}</span>
        </div>
        <nav>
          <Link href={hasContributed ? "/home/shareholdings" : "/Home/contribute"} 
                className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
            <FaEthereum className="mr-3" />
            {hasContributed ? 'Shareholdings' : 'Contribute'}
          </Link>
          <Link href="/Home/policies" 
                className="flex items-center py-2 px-4 mt-2 hover:bg-gray-700 rounded">
            <FaChartLine className="mr-3" />
            Policies
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}