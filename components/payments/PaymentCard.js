import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PaymentCard = ({ payment, onPay, onNotify }) => {
    useEffect(() => {
        console.log('PaymentCard rendered', payment);
    }, []);
  return (
    <View style={styles.card}>
      <Text style={styles.ledgerName}>{payment.ledgerName}</Text>
      <Text>Expense Date: {payment.date}</Text>
      <Text>{payment.isReceiving ? 'Payment From:' : 'Payment To:'} {payment.user}</Text>
      <Text>Amount: ${payment.amount.toFixed(2)}</Text>

      {/* Render appropriate button */}
      {payment.isReceiving ? (
        <Button title="Notify" onPress={() => onNotify(payment.id)} />
      ) : (
        <Button title="Pay" onPress={() => onPay(payment.id)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  ledgerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default PaymentCard;
