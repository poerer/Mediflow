import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

// Wichtig für Web-Flow bei Google Auth
WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const router = useRouter(); // Navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "179511557979-fhvrooaatqoet5ncb2jee2lj63md8u7t.apps.googleusercontent.com",
  });

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Erfolgreich eingeloggt");
      router.replace("/"); // Weiterleitung nach Login
    } catch (error: any) {
      Alert.alert("Fehler", error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registrierung erfolgreich");
      router.replace("/"); // Nach Registrierung auch weiterleiten
    } catch (error: any) {
      Alert.alert("Registrierung fehlgeschlagen", error.message);
    }
  };

  // Google Login + Redirect
  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const { accessToken } = response.authentication;
      const credential = GoogleAuthProvider.credential(null, accessToken);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("🎉 Erfolgreich mit Google eingeloggt");
          router.replace("/"); // Nach Login auf Home
        })
        .catch((err) =>
          Alert.alert("Google Login Fehler", err.message)
        );
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="LOGIN" onPress={handleLogin} />

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.link}>
          📩 Noch keinen Account? Jetzt registrieren
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => promptAsync()}
        disabled={!request}
        style={[styles.googleButton, { marginTop: 16 }]}
      >
        <Text style={styles.googleButtonText}>Mit Google einloggen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  link: {
    marginTop: 12,
    color: "#317AFF",
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: "#EA4335",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  googleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
