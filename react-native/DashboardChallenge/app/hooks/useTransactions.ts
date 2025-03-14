import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export function useTransactions() {
  const { 
    transactions, 
    setTransactions, 
    addTransaction, 
    transactionsLoading,
    error,
    setTransactionsLoading, 
    setError 
  } = useApp();

  const fetchTransactions = useCallback(async () => {
    try {
      setTransactionsLoading(true);
      setError(null);
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch transactions'));
    } finally {
      setTransactionsLoading(false);
    }
  }, [setTransactions, setTransactionsLoading, setError]);

  return { 
    transactions, 
    addTransaction,
    isLoading: transactionsLoading,
    error,
    refetch: fetchTransactions 
  };
}
