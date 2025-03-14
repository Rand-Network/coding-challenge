import React, { useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { styles } from './styles';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionItem from '../TransactionItem';

interface Props {
  limit?: number;
}

export default function TransactionList({ limit }: Props) {
  const { transactions, refetch, isLoading } = useTransactions();
  const pathname = usePathname();
  const isDashboard = pathname.includes('dashboard');

  useEffect(() => {
    refetch();
  }, [refetch]);

  const displayedTransactions = limit && isDashboard
    ? transactions.slice(0, limit)
    : transactions;

  return ( 
    <View style={styles.container}>
      {isDashboard && (
        <View style={styles.header}>
          <Text style={styles.title}>Recent transactions</Text>
          <Link href="/screens/transactions" asChild>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </Link>
        </View>
      )}
      <FlatList
        data={displayedTransactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={item => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
} 