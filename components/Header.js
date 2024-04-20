import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const Header = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { performLogout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    if (option === "Popup Modal") {
      setIsPopupOpen(true);
    } else if (option === "Logout") {
      const status = performLogout();
    } else {
      navigation.navigate(option);
    }

    // Close the menu after an option is clicked
    setIsMenuOpen(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={30} color="black" />
      </TouchableOpacity>

      {/* Invisible touchable to close menu when clicked outside */}
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {isMenuOpen && (
        <View style={styles.menuContainer}>
          <MenuItem
            text="Popup Modal"
            onPress={() => handleOptionClick("Popup Modal")}
          />
          <MenuItem
            text="UserList"
            onPress={() => handleOptionClick("UserList")}
          />
          <MenuItem
            text="Ledgers List"
            onPress={() => handleOptionClick("Show Ledgers")}
          />
          <MenuItem
            text="Expense Analytics"
            onPress={() => handleOptionClick("Expense Summary Chart")}
          />
          <MenuItem text="Logout" onPress={() => handleOptionClick("Logout")} />
        </View>
      )}

      {/* Popup Modal */}
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

// MenuItem component for better separation of concerns
const MenuItem = ({ text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    marginTop: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  menuContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
