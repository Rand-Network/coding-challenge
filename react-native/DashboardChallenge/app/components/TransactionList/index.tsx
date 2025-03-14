import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { styles } from './styles';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionItem from '../TransactionItem';
import TransactionModal from '../TransactionModal';
import TransactionSkeleton from '../TransactionSkeleton';
import { Transaction } from 'app/types';
import EmptyState from '../EmptyState';

interface Props {
  limit?: number;
}

export default function TransactionList({ limit }: Props) {
  const { transactions, refetch, isLoading, error } = useTransactions();
  const pathname = usePathname();
  const isDashboard = pathname.includes('dashboard');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const displayedTransactions = limit && isDashboard
    ? transactions.slice(0, limit)
    : transactions;

  if (isLoading) {
    return (
      <View style={styles.container}>
        {[...Array(limit || 5)].map((_, index) => (
          <TransactionSkeleton key={index} />
        ))}
      </View>
    );
  }

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
        renderItem={({ item }) => (
          <TransactionItem 
            transaction={item} 
            onPress={() => setSelectedTransaction(item)} 
          />
        )}
        keyExtractor={item => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={
          <EmptyState 
            message={
              error 
                ? "Failed to load transactions. Pull to refresh."
                : "No transactions found."
            }
          />
        }
      />
      <TransactionModal
        transaction={selectedTransaction}
        visible={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
      />
    </View>
  );
} 