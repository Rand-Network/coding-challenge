import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
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

  const { data: productsData, isError: productsIsError, dataUpdatedAt: productsDataUpdatedAt } = useProducts()
  const { data: transactionsData, isError: transactionsIsError } = useTransactions()
  const { setTransactions, setProducts } = useAppStore()

  // Store data after fetching
  useEffect(() => {
    if (productsIsError) {
      console.log('Products error')
      setProducts({ products: [] })
      return
    }
    if (productsData?.data && Array.isArray(productsData.data)) {
      console.log('updateProducts')
      setProducts({ products: productsData.data as unknown as TProduct[] })
    }
  }, [productsDataUpdatedAt, productsIsError])

  useEffect(() => {
    if (transactionsIsError) {
      setTransactions({ transactions: [] })
      return
    }
    if (transactionsData?.data && Array.isArray(transactionsData.data)) {
      console.log('Update trans')
      setTransactions({ transactions: transactionsData.data as unknown as TTransaction[] })
    }
  }, [transactionsData, transactionsIsError])

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