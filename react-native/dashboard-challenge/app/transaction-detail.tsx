import { useAppStore } from '@/src/hooks/useAppStore'
import { formatPrices } from '@/src/models/Transaction'
import { colors, spacing } from '@/src/styles/theme'
import { router, useGlobalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function TransactionDetail () {

  const { transactionId } = useGlobalSearchParams()
  const { getTransactionById } = useAppStore()

  if (Array.isArray(transactionId)) {
    if (router.canGoBack()) {
      router.back()
      return (<></>)
    }
  }

  const transaction = useMemo(() => {
    return getTransactionById({ id: +transactionId })
  }, [transactionId])

  const formattedAmount = useMemo(() => {
    return transaction ? formatPrices(transaction) : ''
  }, [transaction])

  // Transform timestamp to humman readable date
  const formattedDate = useMemo(() => {
    if (!transaction) return ''
    const date = new Date(transaction.createdAt)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ', ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) + 'h'
  }, [transaction])

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{transaction?.name}</Text>
        <Text style={styles.text}>{formattedAmount}</Text>
        <Text style={styles.text}>{formattedDate}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.sm
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    fontSize: 16
  }
})
