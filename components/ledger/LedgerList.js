import React, { useState, useEffect } from "react";
import LedgerCard from "./LedgerCard";
import { getLedgerList, deleteLedger } from "../../requests";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";

const LedgerList = () => {
  const [loading, setLoading] = useState(true);
  const [ledgerList, setLedgerList] = useState([]);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLedgerList = async () => {
      res = await getLedgerList();
      if (res.success) {
        setLedgerList(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(res.error);
      }
    };

    fetchLedgerList();
  }, []);

  const handleEditExpense = (expense) => {
    console.log("Edit Ledger", ledger);
  };

  const handleDeleteExpense = async (ledgerId) => {
    try {
      // Call delete expense API function
      await deleteLedger(ledgerId);
      Alert.alert("Error", "deleted ledger");
      // Update expense list after deletion
      const updatedList = ledgerList.filter((ledger) => ledger.id !== ledgerId);
      setLedgerList(updatedList);
    } catch (error) {
      Alert.alert("Error", "Failed to delete ledger");
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
        data={ledgerList}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <LedgerCard
            ledgerName={item.name}
            activeUsers={item.live_users}
            invitedUsers={item.invited_users}
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

export default LedgerList;
