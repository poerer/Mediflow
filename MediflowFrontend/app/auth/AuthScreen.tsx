// app/auth/AuthScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../../utils/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false); // Umschalten zw. Login & Registrierung

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('✅ Registrierung erfolgreich');
        setIsRegister(false); // Zurück zu Login
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('✅ Login erfolgreich');
        router.replace('/'); // Optional: zurück zur Startseite
      }
    } catch (error: any) {
      Alert.alert('Fehler', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Registrieren' : 'Login'}</Text>

      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title={isRegister ? 'Registrieren' : 'Login'} onPress={handleAuth} />

      <Text style={styles.switch} onPress={() => setIsRegister(!isRegister)}>
        {isRegister
          ? '🔒 Bereits registriert? Jetzt einloggen'
          : '📩 Noch keinen Account? Jetzt registrieren'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#f4f6f8' },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center', fontWeight: 'bold' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  switch: {
    marginTop: 14,
    color: '#317AFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
