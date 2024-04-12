// App.js
import React, { useState, useEffect, createContext } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import ExpenseForm from './ExpenseForm';
import DailyExpenseList from './ExpenseList';
import MonthlyExpenseList from './TotalExpenseList';
import expense_data from './expense_data';
import { ExpenseDataContext } from './context';


const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (date, remarks, amount, selectedTeams) => {
    let equal_split = selectedTeams.length === 0 ? 0 : amount / selectedTeams.length;
  
    const newExpense = {
      date: date,
      remarks: remarks,
      amount: amount,
      users: selectedTeams,
      split: equal_split,
      paid_by: "Kanu"
    };
  
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };
  
  const [userExpense, setUserExpense] = useState(null);
  const [dailyExpense, setDailyExpense] = useState([]);
  
  useEffect(() => {
    if (!expenseData) return;
  
    const userExpenses = {};
    const today = new Date().toISOString().split('T')[0];
    for (const item of expenseData.users) {
      userExpenses[item] = expenses.filter(expense => expense.users.includes(item) || expense.paid_by === item || expense.date==today   );
    }

    let final_expenses = [];
    for (const user in userExpenses) {
      const _expenses = userExpenses[user];
      let totalExpense = 0;
      let totalPaid = 0;
    
      _expenses.forEach(expense => {
        if (expense.paid_by === user) {
          totalPaid += parseFloat(expense.amount);
        }
        if (expense.users.includes(user)) {
          totalExpense += parseFloat(expense.split);
        }
      });
    
      final_expenses.push({
        user: user,
        totalExpense: totalExpense,
        totalPaid: totalPaid
      });
      console.log("Final Expenses: ", final_expenses);
      setDailyExpense(final_expenses);
    }

  }, [expenses, expenseData]);

  const [expenseData, setExpenseData] = useState(null);

  useEffect(() => {
    setExpenseData(expense_data);
  });


  return (
    <ExpenseDataContext.Provider value={{ expenseData, addExpense }}>
    <View style={styles.app}>
      <Text style={styles.header}>Expense Form</Text>
      <Text style={styles.header}>Expense Form</Text>
      <ExpenseForm addExpense={addExpense} />
      {
        expenseData &&
      
      <>
      <DailyExpenseList expenses={dailyExpense}/>
      {/* <MonthlyExpenseList /> */}
      </>
      }
    </View>
    </ExpenseDataContext.Provider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1, 
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default App;
