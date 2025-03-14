import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export function useProducts() {
  const { products, setProducts, setIsLoading, setError } = useApp();

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setIsLoading(false);
    }
  }, [setProducts, setIsLoading, setError]);

  return { 
    products, 
    isLoading: false, 
    error: null,
    refetch: fetchProducts 
  };
} 