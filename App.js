// App.js
import React, { useState, useEffect, createContext } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummaryList from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import UserList from "./components/UserList";
import Header from "./components/Header";
// import GoogleAuthComponent from "./Auth";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpenseSummaryChart from "./components/ExpenseChart";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
        name="UserList"
        component={UserList}
        options={{
          tabBarLabel: "Show Users",
        }}
      />
      <Tab.Screen
        name="Expense Summary Chart"
        component={ExpenseSummaryChart}
        options={{
          tabBarLabel: "Show Expense Analysis",
        }}
      />
    </Tab.Navigator>
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
          <Drawer.Screen name="Home" component={TabNavigator} />
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
