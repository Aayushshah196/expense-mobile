// AccordionMenu.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AccordionMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Text style={styles.headerText}>Menu 1</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </View>
      <TouchableOpacity style={styles.header}>
        <Text style={styles.headerText}>Menu 2</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
});

export default AccordionMenu;
