import React, { useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import { getExpenseList, deleteExpense } from "../../requests";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
  TextInput,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ExpenseList = () => {
  const [loading, setLoading] = useState(true);
  const [expenseList, setExpenseList] = useState([]);
  const [filteredExpenseList, setFilteredExpenseList] = useState([]);
  const [error, setError] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isFilterSectionVisible, setFilterSectionVisible] = useState(false);
  const [filters, setFilters] = useState({
    startDate: getDateString(getDateBasedOnOffset(7)),
    endDate: getDateString(),
    numberOfDays: 7,
    live: null,
    ledger: null,
  });
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

  useEffect(() => {
    function handleNumberOfDaysChange() {
      console.log("numberOfDays changed:", filters.numberOfDays);
      // Perform any action you want to take when numberOfDays changes
      // For example, you might want to update other parts of the state based on the new numberOfDays
      // Adjust the startDate and endDate based on the new numberOfDays
      console.log(
        "startDate:",
        getDateString(getDateBasedOnOffset(filters.numberOfDays))
      );
      console.log("endDate:", getDateString());
      setFilters((prevFilters) => ({
        ...prevFilters,
        startDate: getDateString(getDateBasedOnOffset(filters.numberOfDays)),
        endDate: getDateString(),
      }));
    }

    // Call the function when numberOfDays changes
    handleNumberOfDaysChange();
  }, [filters.numberOfDays]); // Dependencies array with numberOfDays

  useEffect(() => {
    applyFilters();
  }, [expenseList, filters]);

  const applyFilters = () => {
    let filtered = expenseList;
    console.log("Applying filters:", filters);
    console.log("Expense list:", expenseList);

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      console.log(
        "Filtering by date range:",
        filters.startDate,
        filters.endDate
      );
      filtered = filtered.filter(
        (expense) =>
          new Date(expense.date) >= new Date(filters.startDate) &&
          new Date(expense.date) <= new Date(filters.endDate)
      );
    }

    // Filter by expense status (live or not)
    if (filters.live !== null) {
      filtered = filtered.filter((expense) => expense.live === filters.live);
    }

    // Filter by ledger
    if (filters.ledger) {
      filtered = filtered.filter(
        (expense) => expense.ledger === filters.ledger
      );
    }

    setFilteredExpenseList(filtered);
  };

  const handleEditExpense = (expense) => {
    console.log("Edit expense", expense);
    navigation.navigate("ExpenseForm", {
      ledger_id: expense?.ledger_id || "",
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
      Alert.alert("Success", "Expense deleted successfully.");
      // Update expense list after deletion
      const updatedList = expenseList.filter(
        (expense) => expense.id !== expenseId
      );
      setExpenseList(updatedList);
      // Apply filters again to reflect the changes
      applyFilters();
    } catch (error) {
      Alert.alert("Error", "Failed to delete expense");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  function getDateBasedOnOffset(offset) {
    const today = new Date();
    today.setDate(today.getDate() - offset);
    return today;
  }

  function getDateString(datetimeString = new Date().toISOString()) {
    const datetime = new Date(datetimeString);
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const day = String(datetime.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    let currentDate = getDateString(selectedDate);
    currentDate = currentDate || filters?.startDate || "";
    setFilters({ ...filters, startDate: currentDate });
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    let currentDate = getDateString(selectedDate);
    currentDate = currentDate || filters?.endDate || "";
    setFilters({ ...filters, endDate: currentDate });
  };

  const handleNumberOfDaysChange = (value) => {
    setFilters({ ...filters, numberOfDays: Number(value) });
  };

  const handleLiveChange = (value) => {
    setFilters({ ...filters, live: value });
  };

  const handleLedgerChange = (value) => {
    setFilters({ ...filters, ledger: value });
  };

  return (
    <View style={styles.container}>
      <Button
        title={isFilterSectionVisible ? "Hide Filters" : "Show Filters"}
        onPress={() => setFilterSectionVisible(!isFilterSectionVisible)}
      />
      {/* Filter section */}
      {isFilterSectionVisible && (
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filters</Text>

          {/* Date range filters */}
          <View style={styles.filterGroup}>
            <Text>Start Date: {filters?.startDate || ""}</Text>

            <Button
              title="Select Start Date"
              onPress={() => setShowStartDatePicker(true)}
            />
            {showStartDatePicker && (
              <DateTimePicker
                value={
                  filters.startDate ? new Date(filters.startDate) : new Date()
                }
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}

            <Text>End Date: {filters?.endDate}</Text>

            <Button
              title="Select Start Date"
              onPress={() => setShowEndDatePicker(true)}
            />
            {showEndDatePicker && (
              <DateTimePicker
                value={filters.endDate ? new Date(filters.endDate) : new Date()}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
          </View>

          {/* Number of days filter */}
          <View style={styles.filterGroup}>
            <Text>Number of Days:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={
                filters.numberOfDays ? filters.numberOfDays.toString() : ""
              }
              onChangeText={handleNumberOfDaysChange}
            />
          </View>

          {/* Expense status filter (live or not) */}
          <View style={styles.filterGroup}>
            <Text>Live Expenses:</Text>
            <Button
              title={
                filters.live === null ? "All" : filters.live ? "Yes" : "No"
              }
              onPress={() =>
                handleLiveChange(filters.live === null ? true : !filters.live)
              }
            />
          </View>

          {/* Ledger filter */}
          <View style={styles.filterGroup}>
            <Text>Ledger:</Text>
            <TextInput
              style={styles.input}
              value={filters.ledger ? filters.ledger : ""}
              onChangeText={handleLedgerChange}
            />
          </View>

          {/* Apply filters button */}
          <Button title="Apply Filters" onPress={applyFilters} />
        </View>
      )}

      {/* Expense list */}
      <FlatList
        data={filteredExpenseList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ExpenseCard
            ledger_id={item?.ledger_id || ""}
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterSection: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#e3e3e3",
    borderRadius: 8,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  filterGroup: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
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
