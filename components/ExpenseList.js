import React, { useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import { getExpenseList, deleteExpense } from "../requests";
import { useNavigation } from "@react-navigation/native";
import ExpenseForm from "./ExpenseForm";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";

const ExpenseList = () => {
  const [loading, setLoading] = useState(true);
  const [expenseList, setExpenseList] = useState([]);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExpenseList = async () => {
      res = await getExpenseList();
      if (res.success) {
        setExpenseList(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(res.error);
      }
    };

    fetchExpenseList();
  }, []);

  const handleEditExpense = (expense) => {
    console.log("Edit expense", expense);
    navigation.navigate("ExpenseForm", {
      amount: expense.amount,
      date: expense.date,
      remarks: expense.remarks,
      users: expense.users,
      split: expense.split,
      id: expense.id,
    });
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      // Call delete expense API function
      await deleteExpense(expenseId);
      // Update expense list after deletion
      const updatedList = expenseList.filter(
        (expense) => expense.id !== expenseId
      );
      setExpenseList(updatedList);
    } catch (error) {
      Alert.alert("Error", "Failed to delete expense");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={expenseList}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <ExpenseCard
            date={item.date}
            remarks={item.remarks}
            split={item.split}
            amount={item.amount}
            users={item.users}
            onEdit={() => handleEditExpense(item)}
            onDelete={() => handleDeleteExpense(item.id)}
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
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExpenseList;
