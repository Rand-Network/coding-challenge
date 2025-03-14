import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, Product } from '../types';

const KEYS = {
  TRANSACTIONS: '@app_transactions',
  PRODUCTS: '@app_products',
  LAST_FETCH: '@app_last_fetch',
};

export const storage = {
  async getTransactions(): Promise<Transaction[]> {
    const data = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  async setTransactions(transactions: Transaction[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
    await AsyncStorage.setItem(KEYS.LAST_FETCH, new Date().toISOString());
  },

  async getProducts(): Promise<Product[]> {
    const data = await AsyncStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  async setProducts(products: Product[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  async getLastFetch(): Promise<Date | null> {
    const date = await AsyncStorage.getItem(KEYS.LAST_FETCH);
    return date ? new Date(date) : null;
  }
}; 