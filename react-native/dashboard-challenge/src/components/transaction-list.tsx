import { memo } from "react"
import { useAppStore } from "../hooks/useAppStore"
import { formatPrices, TTransaction } from "../models/Transaction"
import { FlatList, StyleSheet, Text, View } from "react-native"


export default function TransactioList () {

  const { transactions } = useAppStore()

  const ItemRow = memo(function ItemRow ({ item }: { item: TTransaction }) {
    return (
      <View style={Styles.row}>
        <Text style={[Styles.content, Styles.cellLeft]}>{item.name}</Text>
        <Text style={[, Styles.content, Styles.cellRight]}>{formatPrices(item)}</Text>
      </View>
    )
  })

  return (
    <View style={Styles.container}>
      <View style={Styles.row}>
        <Text style={[Styles.title, Styles.cellTitle]}>Recent transactions</Text>
        <Text style={[Styles.title, Styles.cellRight]}>See all</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <ItemRow item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
  content: {
    fontSize: 18,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 5
  },
  cellTitle: {
    flex: 2,
    flexDirection: 'column',
    textAlignVertical: 'center',
    textAlign: 'left'
  },
  cellLeft: {
    flex: 1,
    flexDirection: 'column',
    textAlignVertical: 'center',
    textAlign: 'left'
  },
  cellRight: {
    flex: 1,
    flexDirection: 'column',
    textAlignVertical: 'center',
    textAlign: 'right'
  },
})