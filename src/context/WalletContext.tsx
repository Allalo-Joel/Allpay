import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
};

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  sendMoney: (to: string, amount: number) => boolean;
  receiveMoney: (from: string, amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const sendMoney = (to: string, amount: number): boolean => {
    if (amount <= 0 || amount > balance) return false;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: -amount,
      description: `Sent to ${to}`,
    };
    setBalance(prev => prev - amount);
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };

  const receiveMoney = (from: string, amount: number): void => {
    if (amount <= 0) return;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: amount,
      description: `Received from ${from}`,
    };
    setBalance(prev => prev + amount);
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, sendMoney, receiveMoney }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};