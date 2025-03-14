import React from 'react';
import { View, Dimensions } from 'react-native';
import Skeleton from '../Skeleton';
import { styles } from './styles';

const { width } = Dimensions.get('window');

export default function ProductSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton 
        width={width - 40} 
        height={200} 
        style={styles.skeleton}
      />
    </View>
  );
} 