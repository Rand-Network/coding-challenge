import { Link } from 'expo-router'
import { ScrollView, StyleSheet, Text } from 'react-native'
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
      <GestureHandlerRootView>
        <ScrollView>
          <ProductCarousel />
          <Text style={styles.title}>Summary</Text>
          <Balance />
          <TransactioList />
          <Text>Recent transactions + see all + modal</Text>
          <Link href="/modal" style={styles.link}>
            Open modal
          </Link>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25
  },
  container: {
    flex: 1,
    margin: 20
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
})
