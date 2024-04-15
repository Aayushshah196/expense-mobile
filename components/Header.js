import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    // Handle option click action here
    // For example, you can navigate to a new page based on the option selected
    console.log("Option clicked:", option);
    // Open popup if Option 1 is clicked
    if (option === "Option 1") {
      setIsPopupOpen(true);
    } else if (option === "Option 2") {
      // Navigate to UserList page if Option 2 is clicked
      navigation.navigate("UserList");
    } else {
      // Close the menu if other options are clicked
      setIsMenuOpen(false);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleOptionClick("Option 1")}
          >
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleOptionClick("Option 2")}
          >
            <Text>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleOptionClick("Option 3")}
          >
            <Text>Option 3</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={isPopupOpen} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text>This is a popup</Text>
            <Button title="Close" onPress={closePopup} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 40, // Adjust as needed
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Header;
