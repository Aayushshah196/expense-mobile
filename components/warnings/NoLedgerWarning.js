import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const NoLedgersWarning = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>
        {"No ledgers found. Please add a new ledger to get started."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9", // Light background color for the warning area
  },
  warningText: {
    color: "#ff6347", // Use a warning color (tomato) for the text
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50", // Green color for the button
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NoLedgersWarning;
