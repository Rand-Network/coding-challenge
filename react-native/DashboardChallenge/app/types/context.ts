import { Transaction, Product } from './index';

export interface AppContextType {
  transactions: Transaction[];
  products: Product[];
  balance: number;
  transactionsLoading: boolean;
  productsLoading: boolean;
  transactionsError: Error | null;
  productsError: Error | null;

  setTransactions: (transactions: Transaction[]) => void;
  setProducts: (products: Product[]) => void;
  addTransaction: (transaction: Transaction) => void;
  setTransactionsLoading: (loading: boolean) => void;
  setProductsLoading: (loading: boolean) => void;
  setTransactionsError: (error: Error | null) => void;
  setProductsError: (error: Error | null) => void;
} 