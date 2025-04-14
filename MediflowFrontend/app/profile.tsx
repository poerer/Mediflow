import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { useAuth } from "../app/contexts/AuthContext"; // ✅ Richtiger Pfad zum Kontext
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);      // Firebase ausloggen
      logout();                 // Kontext-User leeren
      router.replace("/auth/AuthScreen"); // Weiterleitung zum Login-Screen
    } catch (error: any) {
      Alert.alert("Fehler beim Logout", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user?.photoURL && (
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
      )}
      <Text style={styles.email}>{user?.email}</Text>
      <Button title="Logout" color="#e53935" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  email: { fontSize: 16, fontWeight: "bold", marginBottom: 40 },
});
