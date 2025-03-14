import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Transaction } from '../../types';
import { styles } from './styles';

interface Props {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

export default function TransactionItem({ transaction, onPress }: Props) {
  return (
    <Pressable 
      style={styles.container}
      onPress={() => onPress(transaction)}
    >
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
    </Pressable>
  );
} 