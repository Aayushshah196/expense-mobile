// DrawerContent.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.header}>
          <Text style={styles.headerText}>Menu 1</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <TouchableOpacity style={styles.item}>
            <Text>Item 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Item 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Item 3</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.header}>
          <Text style={styles.headerText}>Menu 2</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <TouchableOpacity style={styles.item}>
            <Text>Item 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Item 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Item 3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  item: {
    paddingVertical: 8,
  },
});

export default DrawerContent;
