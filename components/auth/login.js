import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { authenticateUser } from "../../requests";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Get access to AuthContext
  const { setIsAuthenticated, setCurrentUser } = useContext(AuthContext);

  // Function to handle the login process
  const handleLogin = async () => {
    setLoading(true);
    const formData = {
      email,
      password,
    };

    try {
      const res = await authenticateUser(formData);
      if (res.success) {
        setIsAuthenticated(true);
        setCurrentUser(res.data);
        setLoading(false);
        // Navigate to the desired page after successful login
        // navigation.navigate("HomeScreen", { screen: "Home" });
      } else {
        Alert.alert("Login Failed", res.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  // Loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render the login form
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
