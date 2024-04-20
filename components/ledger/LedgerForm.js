import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { createLedger } from "../../requests";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const LedgerForm = () => {
  const [ledgerName, setLedgerName] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  // Use AuthContext for currentUser
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async () => {
    console.log("Creating New Ledger");
    const formData = {
      name: ledgerName,
      owner: currentUser.id, // Use currentUser from AuthContext
      live_users: [currentUser.id],
    };

    setUploading(true);
    try {
      const res = await createLedger(formData);
      if (res.success) {
        setLedgerName("");
        navigation.navigate("Show Ledgers");
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error creating ledger:", error.message);
    } finally {
      setUploading(false);
    }
  };

  if (uploading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ledger Name"
        value={ledgerName}
        onChangeText={setLedgerName}
      />
      <Button title="Add Ledger" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LedgerForm;
