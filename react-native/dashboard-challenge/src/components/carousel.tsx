import React, { useState } from 'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useAppStore } from '../hooks/useAppStore'
import { colors, spacing } from '@/src/styles/theme'

const { width } = Dimensions.get('window')

export default function ProductCarousel () {
  const { products } = useAppStore() // Load products from Zustand
  const [activeIndex, setActiveIndex] = useState(0)

  const renderItem = ({ item }: { item: { image: string } }) => (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    </View>
  )

  return (
    <View style={styles.wrapper}>
      <Carousel
        data={products}
        renderItem={renderItem}
        width={width - (spacing.sm * 2)} // Match container width
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

export const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: -spacing.sm, // Compensate for parent padding
    marginBottom: spacing.md
  },
  container: {
    height: 200,
  },
  image: {
    width: width,
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: spacing.sm,
    width: '100%'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.text.secondary,
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: colors.accent,
    width: 10,
    height: 10
  }
})
