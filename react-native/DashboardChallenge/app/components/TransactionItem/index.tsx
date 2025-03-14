import React from 'react';
import { View, Text } from 'react-native';
import { Transaction } from '../../types';
import { styles } from './styles';

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{transaction.name}</Text>
        <Text style={styles.date}>{new Date(transaction.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text 
        style={[
          styles.amount,
          { color: transaction.isExpense ? '#e74c3c' : '#2ecc71' }
        ]}
      >
        {transaction.isExpense ? '-' : '+'}€{parseFloat(transaction.amount).toFixed(2)}
      </Text>
    </View>
  );
} 