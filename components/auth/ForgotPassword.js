import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle password reset request
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      // Make the API request to send a password reset email
      // Replace `sendPasswordResetEmail` with your own function to handle the request
      const response = await sendPasswordResetEmail(email);

      if (response.success) {
        // Handle success
        setMessage("Password reset email sent successfully!");
        Alert.alert(
          "Success",
          "Password reset email sent. Please check your inbox."
        );
      } else {
        // Handle error
        throw new Error(response.error);
      }
    } catch (error) {
      // Display error message
      setMessage(`Failed to send password reset email: ${error.message}`);
      Alert.alert(
        "Error",
        `Failed to send password reset email: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button
        title={loading ? "Sending..." : "Send Reset Email"}
        onPress={handlePasswordReset}
        disabled={loading}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  message: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;
