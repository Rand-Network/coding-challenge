import { useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { storage } from '../services/storage';

export function useProducts() {
  const { 
    products, 
    setProducts,
    productsLoading,
    error, 
    setProductsLoading, 
    setError 
  } = useApp();

  useEffect(() => {
    storage.getProducts().then(cached => {
      if (cached.length) {
        setProducts(cached);
      }
    });
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
      await storage.setProducts(data);
    } catch (err) {
      console.log('Using cached products data - Pull to refresh')
      const cached = await storage.getProducts();
      if (cached.length) {
        setProducts(cached);
        setError(new Error('Using cached products data - Pull to refresh'));
      } else {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      }
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