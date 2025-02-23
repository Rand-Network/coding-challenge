import { RefreshControl, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useEffect, useState } from 'react'
import { useAppStore } from '@/src/hooks/useAppStore'
import { TTransaction } from '@/src/models/Transaction'
import ProductCarousel from '@/src/components/carousel'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Balance from '@/src/components/balance'
import TransactioList from '@/src/components/transaction-list'
import { colors, spacing } from '@/src/styles/theme'
import { useTransactions } from '@/src/hooks/useTransactions'
import { useProducts } from '@/src/hooks/useProducts'
import { TProduct } from '@/src/models/Product'

export default function Home () {

  const { data: productsData, isError: productsIsError, dataUpdatedAt: productsDataUpdatedAt, refetch: refetchProducts } = useProducts()
  const { data: transactionsData, isError: transactionsIsError, refetch: refetchTransactions } = useTransactions()
  const { setTransactions, setProducts } = useAppStore()

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    Promise.all([refetchProducts(), refetchTransactions()])
      .then(() => setRefreshing(false))
  }, [])

  // Store data after fetching
  useEffect(() => {
    if (productsIsError) {
      setProducts({ products: [] })
      return
    }
    if (productsData?.data && Array.isArray(productsData.data)) {
      setProducts({ products: productsData.data as unknown as TProduct[] })
    }
  }, [productsDataUpdatedAt, productsIsError])

  useEffect(() => {
    if (transactionsIsError) {
      setTransactions({ transactions: [] })
      return
    }
    if (transactionsData?.data && Array.isArray(transactionsData.data)) {
      setTransactions({ transactions: transactionsData.data as unknown as TTransaction[] })
    }
  }, [transactionsData, transactionsIsError])

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <ProductCarousel />
          <Balance />
          <TransactioList />
        </ScrollView>
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