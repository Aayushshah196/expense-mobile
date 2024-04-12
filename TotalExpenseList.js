// ExpenseList.js
import React, {useEffect, useContext} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ExpenseDataContext } from './context';

const DailyExpenseList = () => {
  const { expenseData, addExpense } = useContext(ExpenseDataContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Monthly Expense List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 5,
  },
});

export default DailyExpenseList;

{/* <FlatList
data={expenses}
renderItem={({ item }) => (
  <View style={styles.item}>
    <Text>{item.date}: {item.remarks} - ${item.amount}</Text>
  </View>
)}
keyExtractor={(item, index) => index.toString()}
/> */}