import { useMemo } from "react"
import { useAppStore } from "../hooks/useAppStore"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { colors, spacing } from "../styles/theme"
import ContentLoader, { Rect } from "react-content-loader/native"
import { useTransactions } from "../hooks/useTransactions"

const { width } = Dimensions.get('window')
const height = 83

const Loader = () => (
  <ContentLoader
    style={styles.container}
    animate={true}
    width={width}
    height={height}
    viewBox={`5 5 ${width} ${height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#bfbfbf"
  >
    <Rect x="4%" y="16" rx="5" ry="5" width={60} height={16} />
    <Rect x="50%" y="40" rx="5" ry="5" width={145} height={24} />
  </ContentLoader>
)

export default function Balance () {
  const { transactions, getBalance } = useAppStore()
  const { isFetching } = useTransactions()

  const formatBalance = useMemo(
    () =>
      new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(getBalance() / 100) + "€"
    ,
    [transactions]
  )

  if (isFetching) {
    return <Loader />
  }

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