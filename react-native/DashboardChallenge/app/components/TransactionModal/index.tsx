import React, { useEffect } from 'react';
import { Modal, View, Text, Pressable, Animated } from 'react-native';
import { Transaction } from 'app/types';
import { styles } from './styles';

interface Props {
  transaction: Transaction | null;
  visible: boolean;
  onClose: () => void;
}

export default function TransactionModal({ transaction, visible, onClose }: Props) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  if (!transaction) return null;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <Animated.View 
        style={[
          styles.centeredView,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{transaction.name}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Amount:</Text>
            <Text 
              style={[
                styles.amount,
                { color: transaction.isExpense ? '#e74c3c' : '#2ecc71' }
              ]}
            >
              {transaction.isExpense ? '-' : '+'}€{parseFloat(transaction.amount).toFixed(2)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {new Date(transaction.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>
              {transaction.isExpense ? 'Expense' : 'Income'}
            </Text>
          </View>

          <Pressable
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
} 