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
import { get_user_list, create_ledger } from "../../requests";
import { useNavigation } from "@react-navigation/native";

const LedgerForm = () => {
  const [ledgerName, setLedgerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  function getRandomUser(userList) {
    setCurrentUser(userList[Math.floor(Math.random() * userList.length)].id);
  }

  const handleSubmit = async () => {
    console.log("Creating New Ledger");
    const formdata = {
      name: ledgerName,
      owner: currentUser,
      live_users: [currentUser],
    };
    await create_ledger(formdata);
    setLedgerName("");
    navigation.navigate("Show Ledgers");
  };

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

  if (loading | uploading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        onChangeText={(text) => setLedgerName(text)}
      />
      <Pressable title="Add Ledger" onPress={handleSubmit} />
      <Button title="Add Ledger" onPress={handleSubmit} />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LedgerForm;
