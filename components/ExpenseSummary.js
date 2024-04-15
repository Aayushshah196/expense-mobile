import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { getExpenseSummary } from "../requests";

const ExpenseSummaryList = () => {
  const [loading, setLoading] = useState(true);
  const [expenseSummary, setExpenseSummary] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpenseSummary = async () => {
      console.log("fetching expense summary");
      res = await getExpenseSummary();
      if (res.success) {
        setExpenseSummary(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(res.error);
      }
    };

    fetchExpenseSummary();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={expenseSummary}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.userId}>{item.user_id}</Text>
          <Text>Total Paid: {item.total_paid_amount}</Text>
          <Text>Total Expenditure: {item.total_expenditure}</Text>
          <Text
            style={{
              color:
                item.to_pay < 0 ? "green" : item.to_pay > 0 ? "red" : "black",
            }}
          >
            To Pay: {item.to_pay}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  userId: {
    fontWeight: "bold",
  },
});

export default ExpenseSummaryList;
