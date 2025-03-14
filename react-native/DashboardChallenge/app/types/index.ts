export interface Transaction {
  id: string;
  name: string;
  amount: string;
  createdAt: string;
  isExpense: boolean;
}

export interface Product {
  id: string;
  image: string;
} 