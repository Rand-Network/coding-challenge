import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
} 