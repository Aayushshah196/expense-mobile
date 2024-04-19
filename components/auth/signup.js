import React, { useState } from "react";
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
import { createNewUser } from "../../requests";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Perform signup operation here
    // After successful signup, navigate to the login page
    console.log("Sign up clicked");
    console.log("Email:", email);
    console.log("UserName:", userName);
    console.log("Password: ", password);
    console.log("Confirm Password: ", confirmPassword);
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    }

    const formData = {
      email: email,
      name: userName,
      password: password,
      confirm_password: confirmPassword,
    };
    setLoading(true);
    const res = await createNewUser(formData);
    if (res.success) {
      Alert.alert("Success", "User created successfully");
      setEmail("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      navigation.navigate("LoginPage");
      return;
    }
    setLoading(false);
    Alert.alert("Error", res.error);
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
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="UserName"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate("LoginPage")}
      >
        Already have an account? Login here
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

export default SignUpPage;
