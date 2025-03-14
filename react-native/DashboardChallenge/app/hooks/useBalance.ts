import { useApp } from '../context/AppContext';

export function useBalance() {
  const { balance, isLoading, error } = useApp();
  return { balance, isLoading, error };
}
