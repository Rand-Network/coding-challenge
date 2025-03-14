import React from 'react';
import { View, Text } from 'react-native';
import { useBalance } from '../../hooks/useBalance';
import { styles } from './styles';

export default function Balance() {
  const { balance } = useBalance();
  
  return (
    <View style={styles.balanceContainer}>
      <Text style={styles.label}>Balance</Text>
      <Text style={styles.balance}>€{balance.toFixed(2)}</Text>
    </View>
  );
} 