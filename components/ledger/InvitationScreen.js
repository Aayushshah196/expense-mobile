import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  getInvitations,
  acceptInvitation,
  rejectInvitation,
} from "../../requests";
import { AuthContext } from "../../context/AuthContext";

const InvitationCard = ({ invitation, onAccept, onReject }) => {
  return (
    <View style={styles.card}>
      {/* Display ledger name */}
      <Text style={styles.ledgerName}>{invitation.name}</Text>

      {/* Accept and Reject buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Accept"
          onPress={() =>
            onAccept(invitation.id, invitation.user_id, invitation.ledger_id)
          }
        />
        <Button
          title="Reject"
          onPress={() =>
            onReject(invitation.id, invitation.user_id, invitation.ledger_id)
          }
          style={styles.rejectButton}
        />
      </View>
    </View>
  );
};

const InvitationsList = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await getInvitations(currentUser?.id);
        if (res.success) {
          setInvitations(res.data);
        } else {
          setError(res.error);
        }
      } catch (err) {
        setError("Failed to fetch invitations.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  const handleAccept = async (invitationId, user_id, ledger_id) => {
    try {
      const res = await acceptInvitation(invitationId, user_id, ledger_id);
      if (res.success) {
        Alert.alert("Success", "Invitation accepted successfully.");
        setInvitations(invitations.filter((inv) => inv.id !== invitationId));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to accept invitation.");
    }
  };

  const handleReject = async (invitationId, user_id, ledger_id) => {
    try {
      const res = await rejectInvitation(invitationId, user_id, ledger_id);
      if (res.success) {
        Alert.alert("Success", "Invitation rejected successfully.");
        setInvitations(invitations.filter((inv) => inv.id !== invitationId));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to reject invitation.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Invitations list */}
      <FlatList
        data={invitations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InvitationCard
            invitation={item}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
  },
  ledgerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rejectButton: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InvitationsList;
