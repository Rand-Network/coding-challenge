import { memo, useState } from "react"
import { useAppStore } from "../hooks/useAppStore"
import { formatPrices, TTransaction } from "../models/Transaction"
import { StyleSheet, Text, View } from "react-native"
import { colors, spacing } from "../styles/theme"
import { router } from "expo-router"

export default function TransactioList () {
  const { transactions } = useAppStore()
  const [seeAll, setSeeAll] = useState(false)

  const displayedTransactions = seeAll ? transactions : transactions.slice(0, 3)

  function navigate ({ id }: { id: TTransaction['id'] }) {
    router.push({
      pathname: '/transaction-detail',
      params: {
        transactionId: id.toString()
      }
    })
  }

  const ItemRow = memo(function ItemRow ({ item }: { item: TTransaction }) {
    return (
      <View style={styles.item}>
        <Text
          style={styles.transactionName}
          onPress={() => navigate({ id: item.id })}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.amount,
            item.isExpense ? styles.negative : styles.positive
          ]}
          onPress={() => navigate({ id: item.id })}>
          {formatPrices(item)}</Text>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent transactions</Text>
        <Text
          style={styles.seeAll}
          onPress={() => setSeeAll((state) => !state)}>
          {seeAll ? 'See less' : 'See all'}
        </Text>
      </View>
      {displayedTransactions.map(item => (
        <ItemRow key={item.id.toString()} item={item} />
      ))}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.md
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  seeAll: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.accent
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: spacing.md
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '400'
  },
  amount: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'right'
  },
  positive: {
    color: colors.text.positive
  },
  negative: {
    color: colors.text.negative
  }
})
