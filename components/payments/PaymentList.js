import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PaymentCard from './PaymentCard';
// import { getPaymentsToReceive, notifyPayment } from '../../requests';

const paymentsToPay = [
    {
      id: 4,
      date: '2024-04-15',
      user: 'Alice Smith',
      ledgerName: 'Project Alpha',
      amount: 150.0,
      status: 'pending', // Status can be 'pending', 'paid', or 'overdue'
      isReceiving: false,
    },
    {
      id: 5,
      date: '2024-04-18',
      user: 'Bob Johnson',
      ledgerName: 'Project Beta',
      amount: 200.0,
      status: 'pending',
      isReceiving: false,

    },
    {
      id: 6,
      date: '2024-04-20',
      user: 'Chris Lee',
      ledgerName: 'Project Gamma',
      amount: 75.0,
      isReceiving: false,
      status: 'paid',
    },
  ];

  
  const paymentsToReceive = [
    {
      id: 1,
      date: '2024-04-12',
      user: 'David Wilson',
      ledgerName: 'Project Alpha',
      amount: 100.0,
      isReceiving: true,
      status: 'pending', // Status can be 'pending', 'received', or 'overdue'
    },
    {
      id: 2,
      date: '2024-04-17',
      user: 'Eve Adams',
      ledgerName: 'Project Beta',
      amount: 50.0,
      status: 'pending',
      isReceiving: true,
    },
    {
      id: 3,
      date: '2024-04-20',
      user: 'Bob Johnson',
      ledgerName: 'Project Delta',
      amount: 125.0,
      status: 'received',
      isReceiving: true,
    },
  ];
  

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (option) => {
    console.log("Filter changed to:", option)
    setFilter(option);
  };

  useEffect(() => {
    // const fetchPayments = async () => {
    //   try {
    //     const res = await getPaymentsToReceive();
    //     if (res.success) {
    //       setPayments(res.data);
    //     } else {
    //       Alert.alert('Error', res.error);
    //     }
    //   } catch (error) {
    //     Alert.alert('Error', 'Failed to fetch payments to receive.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchPayments = () => {
        if (filter === 'to pay') {
          setPayments(paymentsToPay);
        }
        else if (filter === 'to receive') {
          setPayments(paymentsToReceive);
        }
        else {
          setPayments([...paymentsToPay, ...paymentsToReceive]);
        }
        setLoading(false);
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    setPayments(getFilteredPayments());
    }, [filter]);

  const getFilteredPayments = () => {
    if (filter === 'to pay') {
        console.log("To pay payments", paymentsToPay)
      return paymentsToPay;
    } else if (filter === 'to receive') {
        console.log("To receive payments", paymentsToReceive)
      return paymentsToReceive;
    } else {
      // If the filter is "all," combine both lists of payments
      console.log("All payments", [...paymentsToPay, ...paymentsToReceive])
      return [...paymentsToPay, ...paymentsToReceive];
    }
  };

  const handleNotify = async (paymentId) => {
    try {
      await notifyPayment(paymentId);
      Alert.alert('Success', 'Notification sent successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        {/* Radio options for filter */}
      <View style={styles.radioContainer}>
        {['all', 'to pay', 'to receive'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.radioOption,
              filter === option && styles.selectedOption,
            ]}
            onPress={() => handleFilterChange(option)}
          >
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Render the list of payments based on the selected filter */}
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PaymentCard
            type={filter}
            payment={{ ...item }}
            onNotify={handleNotify}
            onPay={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioOption: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#ddd',
    borderColor: '#007bff',
  },
  radioText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentList;
