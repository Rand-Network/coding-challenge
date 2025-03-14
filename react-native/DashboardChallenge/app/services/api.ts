import { Transaction, Product } from '../types';
import { MOCK_TRANSACTIONS, MOCK_PRODUCTS } from '../utils/mockData';

export const api = {
  async getTransactions(): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_TRANSACTIONS;
  },

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_PRODUCTS;
  }
}; 