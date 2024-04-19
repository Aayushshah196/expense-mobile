import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import MultiSelect from "react-native-multiple-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  get_user_list,
  create_expense_item,
  getLedgerList,
} from "../../requests";

const ExpenseForm = () => {
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObject, setDateObject] = useState(new Date());
  const [date, setDate] = useState(getDateString());
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [uploading, setUploading] = useState(false);

  function getRandomUser(userList) {
    setCurrentUser(userList[Math.floor(Math.random() * userList.length)].id);
  }

  function getDateString(datetimeString = new Date().toISOString()) {
    const datetime = new Date(datetimeString);
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDateObject(currentDate);
    const dateString = getDateString(currentDate);
    setDate(dateString);
  };

  const handleSubmit = async () => {
    setUploading(true);
    const split_amount =
      selectedUsers.length === 0 ? 0 : amount / selectedUsers.length;

    const newExpense = {
      date: date,
      remarks: remarks,
      amount: amount,
      users: selectedUsers,
      split: split_amount,
      paid_by: currentUser,
      ledger_id: selectedLedger,
    };
    await create_expense_item(newExpense);
    setUploading(false);
    setDateObject(new Date());
    setRemarks("");
    setAmount("");
    setSelectedUsers([]);
  };

  const { params } = useRoute();
  useEffect(() => {
    console.log("params", params);
    setDateObject(params?.date ? new Date(params.date) : new Date());
    setRemarks(params?.remarks || "");
    setAmount(params?.amount || "");
  }, [params]);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("fetching users");
      res = await get_user_list();
      if (res.success) {
        setUsers(res.data);
        getRandomUser(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(res.error);
      }
    };

    fetchUsers();
  }, []);

  const [ledgers, setLedgers] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("fetching users");
      res = await getLedgerList();
      if (res.success) {
        setLedgers(res.data);
        if (res.data.length > 0) {
          setSelectedLedger(res.data[0].id);
        }
        setLoading(false);
      } else {
        setLoading(false);
        setError(res.error);
      }
    };

    fetchUsers();
  }, []);

  if (loading | uploading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
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
      <Text style={styles.paragraph}>{date}</Text>
      <Picker
        selectedValue={selectedLedger}
        onValueChange={(itemValue, itemIndex) => setSelectedLedger(itemValue)}
        style={styles.input}
      >
        {ledgers &&
          ledgers.map((ledger, index) => (
            <Picker.Item key={index} label={ledger.name} value={ledger.id} />
          ))}
      </Picker>
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
        inputMode="numeric"
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
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          style={styles.input}
        />
      )}
      <Pressable title="Add Expense" onPress={handleSubmit} />
      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ExpenseForm;

// 49193853743-cvc6rj0emde1ieeatgmas4hoqr4i8894.apps.googleusercontent.com
// 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
