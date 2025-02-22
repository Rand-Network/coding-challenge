import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '@/src/api/TransactionApi'
import { useEffect } from 'react'
import { useAppStore } from '@/src/hooks/useAppStore'
import { TTransaction } from '@/src/models/Transaction'
import { TProduct } from '@/src/models/Product'
import { getProducts } from '@/src/api/ProductApi'
import ProductCarousel from '@/src/components/carousel'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Balance from '@/src/components/balance'
import TransactioList from '@/src/components/transaction-list'
import { colors, spacing } from '@/src/styles/theme'

export default function Home () {

  const { setTransactions, setProducts } = useAppStore()

  // Query transactions
  const queryTransactions = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  const queryProducts = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  // Store data after fetching
  useEffect(() => {
    if (queryTransactions.data) {
      setTransactions({ transactions: queryTransactions.data as unknown as TTransaction[] })
    }
  }, [queryTransactions.data])

  useEffect(() => {
    if (queryProducts.data) {
      setProducts({ products: queryProducts.data as unknown as TProduct[] })
    }
  }, [queryProducts.data])

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <View>
          <ProductCarousel />
          <Balance />
          <TransactioList />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.sm
  },
})