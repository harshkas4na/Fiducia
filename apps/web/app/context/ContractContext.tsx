"use client";

import React, { createContext, useState, useContext } from 'react';

interface ContractContextType {
  WalletContract: any;
  InsuranceContract: any;
  Contributed: boolean;
  ERC20Contract: any;
  setERC20Contract: (contract: any) => void;
  setContributed: (contributed: boolean) => void;
  setWalletContract: (contract: any) => void;
  setInsuranceContract: (contract: any) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [WalletContract, setWalletContract] = useState('');
  const [InsuranceContract, setInsuranceContract] = useState('');
  const [ERC20Contract, setERC20Contract] = useState('');
  const [Contributed, setContributed] = useState<boolean>(false);

  return (
    <ContractContext.Provider value={{ERC20Contract,setERC20Contract, WalletContract,setInsuranceContract,InsuranceContract,setWalletContract,Contributed ,setContributed}}>
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