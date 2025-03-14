import React, { useEffect } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';
import { styles } from './styles';
import { useProducts } from '../../hooks/useProducts';
import ProductSkeleton from '../ProductSkeleton';
import EmptyState from '../EmptyState';

const { width } = Dimensions.get('window');

export default function ProductsCarousel() {
  const { products, refetch, isLoading, error } = useProducts();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ProductSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={[styles.image, { width: width - 40 }]}
            resizeMode="cover"
          />
        )}
        keyExtractor={item => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={
          <View style={[styles.emptyContainer,{marginLeft: 40}]}>
            <EmptyState 
              message={
                error 
                  ? "Failed to load products. Pull to refresh."
                  : "No products available."
              }
            />
          </View>
        }
      />
    </View>
  );
} 