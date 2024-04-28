import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import MultiSelect from "react-native-multiple-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getUserList, createExpenseItem, getLedgerList } from "../../requests";
import NoLedgersWarning from "../warnings/NoLedgerWarning";
import { AuthContext } from "../../context/AuthContext";

const ExpenseForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(getDateString());
  const [dateObject, setDateObject] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState("");
  const [error, setError] = useState("");
  const [expenseTypes, setExpenseTypes] = useState([
    "transportation",
    "food",
    "lodging",
    "entertainment",
    "other",
  ]); // State for expense types
  const [selectedExpenseType, setSelectedExpenseType] = useState(""); // State for selected expense type
  const [newExpenseType, setNewExpenseType] = useState(""); // State for new expense type

  // Helper function to format date
  function getDateString(datetimeString = new Date().toISOString()) {
    const datetime = new Date(datetimeString);
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const day = String(datetime.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateObject;
    setShowDatePicker(false);
    setDateObject(currentDate);
    setDate(getDateString(currentDate));
  };

  // Function to add a new expense type
  const addNewExpenseType = () => {
    if (newExpenseType && !expenseTypes.includes(newExpenseType)) {
      setExpenseTypes([...expenseTypes, newExpenseType]);
      setSelectedExpenseType(newExpenseType);
      setNewExpenseType(""); // Reset the new expense type input field
    } else {
      Alert.alert("Error", "Expense type already exists or is empty.");
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setUploading(true);
    try {
      const splitAmount =
        selectedUsers.length > 0 ? amount / selectedUsers.length : 0;
      const newExpense = {
        date: date,
        remarks: remarks,
        amount: amount,
        expense_type: newExpenseType || selectedExpenseType,
        users: selectedUsers,
        split: splitAmount,
        paid_by: currentUser.id,
        ledger_id: selectedLedger,
      };
      console.log("New Expense:", newExpense);
      await createExpenseItem(newExpense);
      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  // Function to reset the form
  const resetForm = () => {
    setDate(getDateString());
    setRemarks("");
    setAmount("");
    setSelectedUsers([]);
    setNewExpenseType("");
  };

  // Fetch data each time the page is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const ledger_id = await fetchLedgers();
          if (ledger_id === "") {
            return;
          }
          await fetchUsers(ledger_id);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [])
  );

  // Function to fetch user data
  const fetchUsers = async (ledger_id = "") => {
    const ledger_to_request = ledger_id || selectedLedger;
    if (!ledger_to_request) {
      console.log("No ledger found to fetch users");
      return;
    }
    const res = await getUserList(ledger_to_request);
    if (res.success) {
      setUsers(res.data);
    } else {
      console.error("Error in fetchUsers:", res.error);
      return Alert.alert("Error", res.error);
      // throw new Error(res.error);
    }
  };

  // Function to fetch ledger data
  const fetchLedgers = async () => {
    const res = await getLedgerList(currentUser?.id);
    if (res.success) {
      setLedgers(res.data);
      if (res.data.length === 0) {
        console.log("No ledgers found");
        return "";
      }
      setSelectedLedger(res.data[0].id || "");
      return res.data[0].id || "";
    } else {
      console.error("Error in fetchLedgers:", res.error);
      return Alert.alert("Error", res.error);
      // throw new Error(res.error);
    }
  };

  if (loading || uploading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {ledgers.length === 0 && <NoLedgersWarning />}
      {ledgers.length > 0 && (
        <View style={styles.container}>
          <View style={styles.datePickerContainer}>
            <Button
              title="Select Date"
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateObject}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <Text style={styles.dateText}>{date}</Text>
          <View style={styles.pickerWrapper}>
            {/* Form label */}
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Select Ledger:</Text>
            </View>

            {/* Picker */}
            <Picker
              selectedValue={selectedLedger}
              onValueChange={(itemValue) => setSelectedLedger(itemValue)}
              style={styles.input}
            >
              {ledgers.map((ledger, index) => (
                <Picker.Item
                  key={index}
                  label={ledger.name}
                  value={ledger.id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            {/* Form label */}
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Select Expense Type:</Text>
            </View>

            <Picker
              selectedValue={selectedExpenseType}
              onValueChange={(itemValue) => setSelectedExpenseType(itemValue)}
              style={styles.input}
            >
              {expenseTypes.map((type, index) => (
                <Picker.Item key={index} label={type} value={type} />
              ))}
            </Picker>
            {selectedExpenseType === "other" && (
              <TextInput
                style={styles.input}
                placeholder="New Expense Type"
                value={newExpenseType}
                onChangeText={(text) => setNewExpenseType(text)}
              />
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={remarks}
            onChangeText={(text) => setRemarks(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
          />

          {users && (
            <MultiSelect
              hideTags
              items={users}
              uniqueKey="id"
              onSelectedItemsChange={setSelectedUsers}
              selectedItems={selectedUsers}
              selectText="Pick Users"
              searchInputPlaceholderText="Search Users..."
              style={styles.input}
            />
          )}
          <Pressable onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </Pressable>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "#007BFF",
    color: "#FFF",
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  newExpenseTypeInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  pickerWrapper: {
    marginBottom: 10, // Space below the picker and above other form fields
  },
  labelContainer: {
    marginBottom: 5, // Space between label and picker
  },
  labelText: {
    fontSize: 16, // Adjust the size of the label text as desired
    fontWeight: "bold", // Adjust the weight of the label text as desired
  },
});

export default ExpenseForm;
