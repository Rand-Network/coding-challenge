import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export function useTransactions() {
  const { 
    transactions, 
    setTransactions, 
    addTransaction, 
    setIsLoading, 
    setError 
  } = useApp();

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch transactions'));
    } finally {
      setIsLoading(false);
    }
  }, [setTransactions, setIsLoading, setError]);

  return { 
    transactions, 
    addTransaction,
    isLoading: false, 
    error: null,
    refetch: fetchTransactions 
  };
}
