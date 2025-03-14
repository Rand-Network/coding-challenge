import React from 'react';
import { View } from 'react-native';
import Skeleton from '../Skeleton';
import { styles } from './styles';

export default function TransactionSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Skeleton width={150} height={16} style={styles.title} />
        <Skeleton width={100} height={14} />
      </View>
      <Skeleton width={80} height={16} />
    </View>
  );
} 