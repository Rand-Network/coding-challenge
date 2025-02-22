import { useMemo } from "react"
import { useAppStore } from "../hooks/useAppStore"
import { StyleSheet, Text, View } from "react-native"
import { colors, spacing } from "../styles/theme"

export default function Balance () {
  const { transactions, getBalance } = useAppStore() // Load products from Zustand

  const formatBalance = useMemo(
    () =>
      new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(getBalance() / 100) + "€"
    ,
    [transactions]
  )

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Balance</Text>
      <Text style={styles.amount}>{formatBalance}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
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
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text.secondary
  },
  amount: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'right'
  }
})