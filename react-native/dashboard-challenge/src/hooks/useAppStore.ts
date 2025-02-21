import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { parseTransaction, TTransaction } from '../models/Transaction'
import { parseProduct, TProduct } from '../models/Product'


interface AppState {
  products: TProduct[]
  transactions: TTransaction[]
  setProducts: ({ products }: { products: TProduct[]}) => void
  setTransactions: ({ transactions }: { transactions: TTransaction[] }) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      products: [],
      transactions: [],
      setProducts: ({ products }) =>
        set(() => {
            const parsedProducts = products.map(parseProduct)
            return { products: parsedProducts}
        }),
      setTransactions: ({ transactions }) =>
        set(() => {
            const parsedTransactions = transactions.map(parseTransaction)
            return { transactions: parsedTransactions}
        })
    }),
    {
      name: 'coding-challenge-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // Where data it's going to store eg. localStorage by default
    },
  ),
)