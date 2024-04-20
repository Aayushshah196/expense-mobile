import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import ExpenseForm from "./components/expense/ExpenseForm";
import ExpenseSummaryList from "./components/expense/ExpenseSummary";
import ExpenseList from "./components/expense/ExpenseList";
import UserList from "./components/UserList";
import LedgerForm from "./components/ledger/LedgerForm";
import Header from "./components/Header";
import ExpenseSummaryChart from "./components/expense/ExpenseChart";
import LedgerList from "./components/ledger/LedgerList";
import LoginPage from "./components/auth/login";
import SignUpPage from "./components/auth/signup";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LedgerDetail from "./components/ledger/LedgerDetails";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Define Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ExpenseForm"
        component={ExpenseForm}
        options={{ tabBarLabel: "Add Expense" }}
      />
      <Tab.Screen
        name="Ledger Form"
        component={LedgerForm}
        options={{ tabBarLabel: "Add Ledger" }}
      />
      <Tab.Screen
        name="Expense Summary"
        component={ExpenseSummaryList}
        options={{ tabBarLabel: "Expense Summary" }}
      />
      <Tab.Screen
        name="Expense List"
        component={ExpenseList}
        options={{ tabBarLabel: "Expense List" }}
      />
    </Tab.Navigator>
  );
}

// Define Home Stack (protected after login)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Expense Summary Chart"
        component={ExpenseSummaryChart}
        options={{ title: "Expense Chart" }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{ title: "Users" }}
      />
      <Stack.Screen
        name="Show Ledgers"
        component={LedgerList}
        options={{ title: "Ledgers" }}
      />
      <Stack.Screen
        name="Ledger Detail"
        component={LedgerDetail}
        options={{ title: "Ledger Detail" }}
      />
    </Stack.Navigator>
  );
}

// Define Login and Signup Stack
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
}

// App component to conditionally render navigation based on authentication status
const Main = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <View style={styles.app}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Drawer.Navigator
            screenOptions={{
              header: ({ navigation }) => <Header navigation={navigation} />,
            }}
          >
            <Drawer.Screen name="HomeScreen" component={HomeStack} />
            <Drawer.Screen name="Users" component={UserList} />
          </Drawer.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </View>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
