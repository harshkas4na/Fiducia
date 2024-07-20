"use client";

import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
  userName: string;
  isConnected: boolean;
  account: string;
  setAccount: (account: string) => void;
  setIsConnected: (isConnected: boolean) => void;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  return (
    <UserContext.Provider value={{ userName,isConnected,setIsConnected, setUserName,account,setAccount }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};