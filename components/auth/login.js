import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { authenticateUser } from "../../requests";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } =
    useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    const formData = {
      email: email,
      password: password,
    };
    const res = await authenticateUser(formData);
    if (res.success) {
      setIsAuthenticated(true);
      setCurrentUser(res.data);
      setLoading(false);
      return;
    }
    setError(true);
    Alert.alert("Error", res.error);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate("SignUpPage")}
      >
        Don't have an account? Sign up here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  linkText: {
    marginTop: 16,
    textAlign: "center",
    color: "blue",
  },
});

export default LoginPage;
