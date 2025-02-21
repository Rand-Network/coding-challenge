import React, { useState } from 'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useAppStore } from '../hooks/useAppStore'

const { width } = Dimensions.get('window')

export default function ProductCarousel() {
  const { products } = useAppStore() // Load products from Zustand
  const [activeIndex, setActiveIndex] = useState(0)

  const renderItem = ({ item }: { item: { image: string } }) => (
    <View>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    </View>
  )

  return (
    <View style={styles.container}>
      <Carousel
        data={products}
        renderItem={renderItem}
        width={width}
        height={200}
        onProgressChange={(_, index) => setActiveIndex(index)} // Tracks the active index
        loop={false} // Disables infinite loop
      />
      <View style={styles.pagination}>
        {products.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
    width: 10,
    height: 10,
  },
})
