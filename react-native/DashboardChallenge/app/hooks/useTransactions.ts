import { useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { Transaction } from 'app/types';

export function useTransactions() {
  const { 
    transactions, 
    setTransactions, 
    addTransaction, 
    transactionsLoading,
    transactionsError,
    setTransactionsLoading, 
    setTransactionsError 
  } = useApp();

  useEffect(() => {
    storage.getTransactions().then(cached => {
      if (cached.length) {
        setTransactions(cached);
      }
    });
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      setTransactionsLoading(true);
      setTransactionsError(null);
      
      const data = await api.getTransactions();
      setTransactions(data);
      await storage.setTransactions(data);
    } catch (err) {
      const cached = await storage.getTransactions();
      if (cached.length) {
        console.log('Using cached data - Pull to refresh');
        setTransactions(cached);
        setTransactionsError(new Error('Using cached data - Pull to refresh'));
      } else {
        setTransactionsError(err instanceof Error ? err : new Error('Failed to fetch transactions'));
      }
    } finally {
      setTransactionsLoading(false);
    }
  }, [setTransactions, setTransactionsLoading, setTransactionsError]);

  const addTransactionWithCache = useCallback(async (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    try {
      const newTransaction = await api.addTransaction(transaction);
      addTransaction(newTransaction);
      const current = await storage.getTransactions();
      await storage.setTransactions([...current, newTransaction]);
      return newTransaction;
    } catch (error) {
      throw error;
    }
  }, [addTransaction]);

  return { 
    transactions, 
    addTransaction: addTransactionWithCache,
    isLoading: transactionsLoading,
    error: transactionsError,
    refetch: fetchTransactions 
  };
}
