import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Product } from '../types';
import { AppContextType } from 'app/types/context';


const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState<Error | null>(null);
  const [productsError, setProductsError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('Transactions updated:', transactions);
  }, [transactions]);

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
        transactionsLoading,
        productsLoading,
        transactionsError,
        productsError,
        setTransactions,
        setProducts,
        addTransaction,
        setTransactionsLoading,
        setProductsLoading,
        setTransactionsError,
        setProductsError,
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