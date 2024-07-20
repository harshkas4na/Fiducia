"use client";

import React, { createContext, useState, useContext } from 'react';

interface ContractContextType {
  WalletContract: any;
  InsuranceContract: any;
  setWalletContract: (contract: any) => void;
  setInsuranceContract: (contract: any) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [WalletContract, setWalletContract] = useState('');
  const [InsuranceContract, setInsuranceContract] = useState('');

  return (
    <ContractContext.Provider value={{ WalletContract,setInsuranceContract,InsuranceContract,setWalletContract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};