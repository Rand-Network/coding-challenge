import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export function useProducts() {
  const { 
    products, 
    setProducts,
    productsLoading,
    error, 
    setProductsLoading, 
    setError 
  } = useApp();

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setProductsLoading(false);
    }
  }, [setProducts, setProductsLoading, setError]);

  return { 
    products,
    isLoading: productsLoading,
    error,
    refetch: fetchProducts 
  };
} 