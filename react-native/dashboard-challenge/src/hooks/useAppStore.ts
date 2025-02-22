import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { parseTransaction, sortTransactions, TTransaction } from '../models/Transaction'
import { parseProduct, TProduct } from '../models/Product'

interface AppState {
  products: TProduct[]
  transactions: TTransaction[]
  setProducts: ({ products }: { products: TProduct[] }) => void
  getBalance (): number,
  getTransactionById: ({ id }: { id: TTransaction['id'] }) => TTransaction | undefined
  setTransactions: ({ transactions }: { transactions: TTransaction[] }) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      totalBalance: 0,
      products: [],
      transactions: [],
      getTransactionById ({ id }) {
        return get().transactions.find((trans) => trans.id === id)
      },
      setProducts: ({ products }) =>
        set(() => {
          const parsedProducts = products.map(parseProduct)
          return { products: parsedProducts }
        }),
      setTransactions: ({ transactions }) =>
        set(() => {
          const parsedTransactions = sortTransactions(transactions.map(parseTransaction))
          return { transactions: parsedTransactions }
        }),
      /**
       * Calulates de account balance
       * @returns Number the calculated balance
       */
      getBalance () {
        return get().transactions.reduce((balance, { amount, isExpense }) => {
          if (isExpense) {
            return balance - Math.round(amount)
          } else {
            return balance + Math.round(amount)
          }
        }, 0)
      },
    }),
    {
      name: 'coding-challenge-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // Where data it's going to store eg. localStorage by default
    },
  ),
)