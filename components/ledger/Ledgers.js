import React from "react";
import { View, StyleSheet } from "react-native";
import Accordion from "../Accordion"; // Assuming the Accordion component is in a separate file

const Ledger = () => {
  return (
    <View style={styles.container}>
      <Accordion title="Parent">
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Ledger;
