// ExpenseList.js
import React, {useEffect, useContext} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ExpenseDataContext } from './context';

const DailyExpenseList = ({expenses}) => {
  // const { expenseData, addExpense } = useContext(ExpenseDataContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Monthly Expense List</Text>
      {expenses && 
      <FlatList
data={expenses}
renderItem={({ item }) => (
  <View style={styles.item}>
    <Text>{item.user} - {item.totalExpense} - ${item.totalPaid}</Text>
  </View>
)}
keyExtractor={(item, index) => index.toString()}
/>
}
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

