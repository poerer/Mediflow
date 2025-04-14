// components/ProfileDropdown.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

interface Props {
  user: any;
}

export const ProfileDropdown = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/AuthScreen");
    } catch (err: any) {
      Alert.alert("Fehler beim Logout", err.message);
    }
  };

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.initial}>
              {user?.email?.charAt(0).toUpperCase() ?? "U"}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setOpen(false);
              router.push("/profile");
            }}
          >
            <Text style={styles.text}>👤 Profil und Einstellungen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setOpen(false);
              handleLogout();
            }}
          >
            <Text style={styles.text}>🚪 Ausloggen</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    color: "#317AFF",
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    width: 220,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    zIndex: 99,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});
