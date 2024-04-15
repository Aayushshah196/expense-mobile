import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ExpenseCard = ({
  date,
  remarks,
  split,
  amount,
  users,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.remarks}>{remarks}</Text>
      <Text style={styles.amount}>Amount: {split}</Text>
      <Text style={styles.amount}>Amount: {amount}</Text>
      <Text style={styles.users}>Users: {users.join(", ")}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.button, styles.editButton]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  remarks: {
    marginBottom: 5,
  },
  amount: {
    fontWeight: "bold",
  },
  users: {
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
  },
});

export default ExpenseCard;
