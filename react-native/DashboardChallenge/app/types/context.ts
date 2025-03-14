import { Transaction, Product } from './index';

export interface AppContextType {
  transactions: Transaction[];
  products: Product[];
  balance: number;
  transactionsLoading: boolean;
  productsLoading: boolean;
  error: Error | null;

  setTransactions: (transactions: Transaction[]) => void;
  setProducts: (products: Product[]) => void;
  addTransaction: (transaction: Transaction) => void;
  setTransactionsLoading: (loading: boolean) => void;
  setProductsLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
} 