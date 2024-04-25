import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { getExpenseSummary } from "../../requests";

const ExpenseSummaryList = () => {
  const [loading, setLoading] = useState(true);
  const [expenseSummary, setExpenseSummary] = useState([]);
  const [error, setError] = useState("");
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchExpenseSummary = async () => {
      console.log("fetching expense summary");
      res = await getExpenseSummary(currentUser.id, "", "");
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
          <Text style={styles.userId}>Ledger: {item.ledger.name}</Text>
          <Text>Total Expenditure: {item.total}</Text>
          <Text style={styles.receivables}>Total Receivables: {item.receive}</Text>
          <Text style={styles.payments}>Total Payables: {item.pay}</Text>
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
  payments: {
    color: "red",
  },
  receivables: {
    color: "green",
  },
});

export default ExpenseSummaryList;
