import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const initialLedger = {
  name: "Project Alpha",
  createdDate: "2024-04-19",
  owner: "John Doe",
  numActiveUsers: 3,
  numTotalUsers: 5,
  activeUserList: ["Alice Smith", "Bob Johnson", "Chris Lee"],
  invitedUserList: [
    "Alice Smith",
    "Bob Johnson",
    "Chris Lee",
    "David Wilson",
    "Eve Adams",
  ],
  totalExpense: 2500.0,
  userExpense: 800.0,
};

const LedgerDetail = () => {
  const [ledger, setLedger] = useState(initialLedger);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invitationInput, setInvitationInput] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Add save functionality here (e.g., API call)
    setIsEditing(false);
    console.log("Ledger saved");
  };

  const handleRemoveActiveUser = (index) => {
    const newActiveUserList = [...ledger.activeUserList];
    newActiveUserList.splice(index, 1);
    setLedger((prevLedger) => ({
      ...prevLedger,
      activeUserList: newActiveUserList,
      numActiveUsers: newActiveUserList.length,
    }));
  };

  const handleRemoveInvitedUser = (index) => {
    const newInvitedUserList = [...ledger.invitedUserList];
    newInvitedUserList.splice(index, 1);
    setLedger((prevLedger) => ({
      ...prevLedger,
      invitedUserList: newInvitedUserList,
      numTotalUsers: newInvitedUserList.length,
    }));
  };

  const handleInviteUsers = () => {
    const newUsers = invitationInput.split(",").map((user) => user.trim());
    setLedger((prevLedger) => ({
      ...prevLedger,
      invitedUserList: [...prevLedger.invitedUserList, ...newUsers],
      numTotalUsers: prevLedger.invitedUserList.length + newUsers.length,
    }));
    // Clear the input field and hide the modal
    setInvitationInput("");
    setIsModalVisible(false);
  };

  const renderUserItem = (listType, handleRemove, { item, index }) => (
    <View style={styles.userItem}>
      <Text>{item}</Text>
      {isEditing && (
        <TouchableOpacity
          onPress={() => handleRemove(index)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-bin" size={20} color="#f44336" />
        </TouchableOpacity>
      )}
    </View>
  );

  // Render list header
  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.header}>{ledger.name}</Text>
      <View style={styles.actionButtons}>
        {/* Edit Button */}
        {isEditing ? (
          <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
            <Ionicons name="checkmark" size={24} color="#4caf50" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
            <Ionicons name="pencil" size={24} color="#4caf50" />
          </TouchableOpacity>
        )}
        {/* Invite Users Button */}
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.iconButton}
        >
          <Ionicons name="add-circle" size={24} color="#1976d2" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render list footer
  const renderFooter = () => (
    <View style={styles.card}>
      {/* Ledger details */}
      <Text style={styles.label}>Name:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={ledger.name}
          onChangeText={(text) =>
            setLedger((prevLedger) => ({ ...prevLedger, name: text }))
          }
        />
      ) : (
        <Text style={styles.value}>{ledger.name}</Text>
      )}

      <Text style={styles.label}>Created Date:</Text>
      <Text style={styles.value}>{ledger.createdDate}</Text>

      <Text style={styles.label}>Owner:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={ledger.owner}
          onChangeText={(text) =>
            setLedger((prevLedger) => ({ ...prevLedger, owner: text }))
          }
        />
      ) : (
        <Text style={styles.value}>{ledger.owner}</Text>
      )}

      <Text style={styles.label}>Number of Active Users:</Text>
      <Text style={styles.value}>{ledger.numActiveUsers}</Text>

      <Text style={styles.label}>Number of Total Users:</Text>
      <Text style={styles.value}>{ledger.numTotalUsers}</Text>

      {/* Active User List */}
      <Text style={styles.label}>Active User List:</Text>
      <FlatList
        data={ledger.activeUserList}
        renderItem={(props) =>
          renderUserItem("active", handleRemoveActiveUser, props)
        }
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />

      {/* Invited User List */}
      <Text style={styles.label}>Invited User List:</Text>
      <FlatList
        data={ledger.invitedUserList}
        renderItem={(props) =>
          renderUserItem("invited", handleRemoveInvitedUser, props)
        }
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />

      {/* Total Expense */}
      <Text style={styles.label}>Total Expense in Ledger:</Text>
      <Text style={styles.value}>${ledger.totalExpense.toFixed(2)}</Text>

      {/* User's Total Expense */}
      <Text style={styles.label}>User's Total Expense in Ledger:</Text>
      <Text style={styles.value}>${ledger.userExpense.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={() => "key"}
        renderItem={() => null}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        style={styles.container}
      />

      {/* Modal for inviting users */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite Users</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter user emails or names (comma-separated)"
              value={invitationInput}
              onChangeText={setInvitationInput}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Invite" onPress={handleInviteUsers} />
              <Button
                title="Cancel"
                color="red"
                onPress={() => setIsModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: "#e3e3e3",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    marginBottom: 12,
  },
  list: {
    marginBottom: 12,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteButton: {
    padding: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LedgerDetail;
