import { useMemo } from "react"
import { useAppStore } from "../hooks/useAppStore"
import { StyleSheet, Text, View } from "react-native"

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
    <View style={Styles.row}>
      <Text style={Styles.cell}>Balance</Text>
      <Text style={[Styles.cell, { textAlign: "right" }]}>{formatBalance}</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingBlock: 25,
    backgroundColor: 'lightblue'
  },
  cell: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 20,
    textAlignVertical: 'center',
    marginHorizontal: 10
  },
})