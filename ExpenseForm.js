import React, { useState, useContext } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ExpenseDataContext } from './context';

const ExpenseForm = () => {
  const { expenseData, addExpense } = useContext(ExpenseDataContext);
  const [remarks, setRemarks] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObject, setDateObject] = useState(new Date());
  const [date, setDate] = useState(getDateString());

  // Function to get date string in the format YYYY-MM-DD
  function getDateString(datetimeString = new Date().toISOString()) {
    const datetime = new Date(datetimeString);
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDateObject(currentDate);
    const dateString = getDateString(currentDate);
    setDate(dateString);
  };

  const handleSubmit = () => {
    addExpense(date, remarks, amount, selectedTeams);
    setDateObject(new Date());
    setRemarks('');
    setAmount('');
    setSelectedTeams([]);
  };

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
      <TextInput
        style={styles.input}
        placeholder="Remarks"
        value={remarks}
        onChangeText={text => setRemarks(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={text => setAmount(text)}
        keyboardType="numeric"
      />
      {expenseData && expenseData.users &&
      <MultiSelect
        hideTags
        items={expenseData?.users.map(user => ({ id: user, name: user }))}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedTeams}
        selectedItems={selectedTeams}
        selectText="Pick Teams"
        searchInputPlaceholderText="Search Teams..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
}
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
    textAlign: 'center',
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ExpenseForm;


// items={[
//   { id: 'Neupane', name: 'Neupane' },
//   { id: 'Kanu', name: 'Kanu' },
//   { id: 'Bashyal', name: 'Bashyal' },
//   { id: 'Lamsal', name: 'Lamsal' },
//   { id: 'Raskin', name: 'Raskin' },
// ]}