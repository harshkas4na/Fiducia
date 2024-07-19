"use client";

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NameModal: React.FC<NameModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const { setUserName } = useUser();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name);
      onClose();
      router.push('/Home');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-white">Welcome to Fiducia</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;