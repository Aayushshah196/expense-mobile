// App.js
import React, { useState, useEffect, createContext } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import ExpenseForm from "./components/expense/ExpenseForm";
import ExpenseSummaryList from "./components/expense/ExpenseSummary";
import ExpenseList from "./components/expense/ExpenseList";
import UserList from "./components/UserList";
import LedgerForm from "./components/ledger/LedgerForm";
import Header from "./components/Header";
// import GoogleAuthComponent from "./Auth";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ExpenseSummaryChart from "./components/expense/ExpenseChart";
import LedgerList from "./components/ledger/LedgerList";
// import Ledger from "./components/Ledgers";
// import AccordionMenu from "./components/AccordianMenu";
// import DrawerContent from "./components/DrawerContent";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ExpenseForm"
        component={ExpenseForm}
        options={{
          tabBarLabel: "Add Expense",
        }}
      />
      <Tab.Screen
        name="Expense Summary"
        component={ExpenseSummaryList}
        options={{
          tabBarLabel: "Show Expense Summary",
        }}
      />
      <Tab.Screen
        name="Expense List"
        component={ExpenseList}
        options={{
          tabBarLabel: "Show Expense List",
        }}
      />
      <Tab.Screen
        name="Ledger Form"
        component={LedgerForm}
        options={{
          tabBarLabel: "Add New Ledger",
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Expense Summary Chart"
        component={ExpenseSummaryChart}
        options={{
          tabBarLabel: "Show Expense Analysis",
        }}
      />
      <Tab.Screen
        name="UserList"
        component={UserList}
        options={{
          tabBarLabel: "Show Users",
        }}
      />
      <Tab.Screen
        name="Show Ledgers"
        component={LedgerList}
        options={{
          tabBarLabel: "Show Ledgers",
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <View style={styles.app}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            header: ({ navigation }) => <Header navigation={navigation} />,
          }}
        >
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="Users" component={UserList} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default App;
