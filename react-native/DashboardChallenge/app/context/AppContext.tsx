import React, { createContext, useContext, useState } from 'react';
import { Transaction, Product } from '../types';
import { AppContextType } from 'app/types/context';


const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  console.log(transactions);
  const balance = transactions.reduce((acc, transaction) => {
    return transaction.isExpense 
      ? acc - parseFloat(transaction.amount) 
      : acc + parseFloat(transaction.amount);
  }, 0);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <AppContext.Provider 
      value={{
        transactions,
        products,
        balance,
        isLoading,
        error,
        setTransactions,
        setProducts,
        addTransaction,
        setIsLoading,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 