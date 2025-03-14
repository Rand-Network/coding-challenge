import { useApp } from '../context/AppContext';

export function useBalance() {
  const { balance, transactionsLoading, error } = useApp();
  return { balance, isLoading: transactionsLoading, error };
}
