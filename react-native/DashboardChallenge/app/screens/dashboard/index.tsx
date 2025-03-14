import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balance from '../../components/Balance';
import TransactionList from '../../components/TransactionList';
import ProductsCarousel from '../../components/ProductsCarousel';
import { styles } from './styles';
import { ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ProductsCarousel />
      <Balance />
      <TransactionList limit={5} />
    </SafeAreaView>
  );
} 