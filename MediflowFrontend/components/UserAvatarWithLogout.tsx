import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useAuth } from "../app/contexts/AuthContext";
import { useRouter } from "expo-router";

export const UserAvatarWithLogout = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      router.replace("/auth/AuthScreen");
    } catch (err: any) {
      Alert.alert("Fehler beim Abmelden", err.message);
    }
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        }}
        style={styles.avatar}
      />
      <Text style={styles.email}>{user.email}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Abmelden</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "#317AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
