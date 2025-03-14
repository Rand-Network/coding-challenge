import React from 'react';
import { View } from 'react-native';
import Skeleton from '../Skeleton';
import { styles } from './styles';

export default function BalanceSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton width={60} height={16} style={styles.label} />
      <Skeleton width={120} height={24} style={styles.amount} />
    </View>
  );
} 