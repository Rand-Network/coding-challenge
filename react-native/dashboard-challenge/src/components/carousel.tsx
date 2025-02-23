import React, { useState } from 'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useAppStore } from '../hooks/useAppStore'
import { colors, spacing } from '@/src/styles/theme'
import ContentLoader, { Rect } from "react-content-loader/native"
import { useProducts } from '../hooks/useProducts'

const { width } = Dimensions.get('window')
const height = 200

const Loader = () => (
  <ContentLoader
    animate={true}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
  </ContentLoader>
)

export default function ProductCarousel () {
  const { products } = useAppStore()
  const { isFetching } = useProducts()
  const [activeIndex, setActiveIndex] = useState(0)

  if (isFetching) {
    return <Loader />
  }

  const renderItem = ({ item }: { item: { image: string } }) => (
    <View style={styles.container}>
      <Image
        resizeMethod='scale'
        source={{ uri: item.image }}
        style={styles.image} resizeMode="cover" />
    </View>
  )

  return (
    <View>
      <Carousel
        data={products}
        renderItem={renderItem}
        width={width}
        height={height}
        onProgressChange={(_, index) => setActiveIndex(index)} // Tracks the active index
      />
      <View style={styles.pagination}>
        {products.map((_, index) => {

          return (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]} />
          )
        })}
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: height,
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
