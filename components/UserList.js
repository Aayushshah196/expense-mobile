// UserList.js

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { getUserList } from "../requests";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("fetching users");
      res = await getUserList();
      if (res.success) {
        setUsers(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(res.error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        User List
      </Text>
      {!error && (
        <FlatList
          data={users}
          renderItem={({ item, index }) => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingVertical: 10,
              }}
            >
              <Text key={index}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default UserList;
