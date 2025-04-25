// app/profile.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { useAuth } from "./contexts/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"profile" | "access" | "settings" | "account">("profile");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDisplayName(data.displayName || "");
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setCountry(data.country || "");
      }
    };

    fetchProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        firstName,
        lastName,
        country,
        email: user.email,
      });

      Alert.alert("Profil gespeichert", "Deine Änderungen wurden übernommen.");
    } catch (error: any) {
      Alert.alert("Fehler beim Speichern", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      router.replace("/auth/AuthScreen");
    } catch (error: any) {
      Alert.alert("Fehler beim Logout", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Profil und Einstellungen</Text>
      <View style={styles.row}>
        {/* 🧭 Sidebar Navigation */}
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={() => setActiveTab("profile")}>
            <Text style={[styles.menuItem, activeTab === "profile" && styles.active]}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("access")}>
            <Text style={[styles.menuItem, activeTab === "access" && styles.active]}>
              Zugang verwalten
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("settings")}>
            <Text style={[styles.menuItem, activeTab === "settings" && styles.active]}>
              Einstellungen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("account")}>
            <Text style={[styles.menuItem, activeTab === "account" && styles.active]}>
              Kontoinformationen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.menuItem, { color: "red" }]}>Ausloggen</Text>
          </TouchableOpacity>
        </View>

        {/* 📝 Form Content */}
        <View style={styles.form}>
          {user?.photoURL && (
            <Image
              source={{ uri: user.photoURL }}
              style={{ width: 60, height: 60, borderRadius: 30, alignSelf: "flex-end", marginBottom: 10 }}
            />
          )}

          {activeTab === "profile" && (
            <>
              <Text style={styles.heading}>Mein Profil</Text>
              <Text style={styles.label}>Anzeigename</Text>
              <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} />
              <Text style={styles.hint}>
                Dein Name auf dieser Plattform und im Online-Unterricht.
              </Text>

              <Text style={styles.label}>Vorname</Text>
              <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
              <Text style={styles.hint}>Muss mindestens 2 Zeichen lang sein</Text>

              <Text style={styles.label}>Nachname</Text>
              <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
              <Text style={styles.hint}>Du kannst dieses Feld leer lassen, wenn du möchtest</Text>

              <Text style={styles.label}>Land</Text>
              <TextInput style={styles.input} value={country} onChangeText={setCountry} />

              <View style={styles.saveBtn}>
                <Button title="Profil speichern" onPress={saveProfile} />
              </View>
            </>
          )}

          {activeTab === "access" && (
            <>
              <Text style={styles.heading}>Zugang verwalten</Text>
              <Text style={styles.label}>Deine E-Mail</Text>
              <TextInput
                style={[styles.input, styles.readonlyInput]}
                value={user?.email ?? ""}
                editable={false}
              />
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>✏️ E-Mail-Adresse ändern</Text>
              </TouchableOpacity>

              <Text style={[styles.label, { marginTop: 20 }]}>Ihr Passwort</Text>
              <TextInput
                style={[styles.input, styles.readonlyInput]}
                value="●●●●●●●"
                editable={false}
                secureTextEntry
              />
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>✏️ Passwort ändern</Text>
              </TouchableOpacity>
            </>
          )}

          {activeTab === "settings" && (
            <Text style={styles.heading}>Einstellungen – kommt noch 😉</Text>
          )}
          {activeTab === "account" && (
            <Text style={styles.heading}>Kontoinformationen – folgt bald!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 16, paddingHorizontal: 20 },
  row: { flexDirection: "row", paddingHorizontal: 20 },
  sidebar: { width: 180, paddingRight: 10 },
  menuItem: { paddingVertical: 10, fontSize: 16, color: "#333" },
  active: { color: "orange", fontWeight: "bold" },
  form: { flex: 1 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  label: { fontWeight: "bold", marginTop: 12 },
  input: {
    backgroundColor: "#F3F2EE",
    borderRadius: 5,
    padding: 10,
    marginTop: 6,
  },
  hint: { fontSize: 12, color: "#666", marginBottom: 10 },
  readonlyInput: {
    color: "#888",
  },
  actionBtn: {
    marginTop: 10,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveBtn: { marginTop: 20 },
});
