// app/ablauf-fruehschicht/index.tsx

import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

const AblaufFruehschichtScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ablauf Frühschicht</Text>
      </View>

      <Image
        style={styles.image}
        source={require("../../assets/images/mountain.jpg")} // ← Füge passendes Bild hinzu
        contentFit="cover"
        transition={300}
      />

      <View style={styles.item}>
        <Text style={styles.title}>1. Dokumentation</Text>
        <Text style={styles.subtitle}>Vorbereitung und Sichtung der Patientendaten</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.title}>2. Arbeitsbeginn</Text>
        <Text style={styles.subtitle}>Start der Frühschicht – Überblick über den aktuellen Stand</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.title}>3. Übergabe</Text>
        <Text style={styles.subtitle}>Besprechung mit dem Nachtdienst über besondere Vorkommnisse</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.title}>4. Visite</Text>
        <Text style={styles.subtitle}>Ärztliche Visite mit Fallbesprechung und Planung</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#4278c4", padding: 20 },
  headerText: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white" },
  image: { height: 250 },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666" },
});

export default AblaufFruehschichtScreen;
