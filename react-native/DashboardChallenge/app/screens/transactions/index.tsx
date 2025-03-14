import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionList from '../../components/TransactionList';
import { styles } from './styles';

export default function TransactionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TransactionList />
    </SafeAreaView>
  );
} 