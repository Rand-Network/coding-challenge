import { Transaction, Product } from '../types';
import { axiosInstance } from './axios';

export const api = {
  async getTransactions(): Promise<Transaction[]> {
    return axiosInstance.get('/transactions');
  },

  async getProducts(): Promise<Product[]> {
    return axiosInstance.get('/products');
  },

  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    return axiosInstance.post('/transactions', transaction);
  }
}; 