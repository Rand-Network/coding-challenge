import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
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
          <Text>Recent transactions + see all + modal</Text>
          <Link href="/modal">
            Open modal
          </Link>
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
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }
})