// app/chirurgie/index.tsx

import React from "react";
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

const ChirurgieScreen: React.FC = () => {
  const data = [
    { title: "Frage 1", description: "eine Beschreibung", time: "11:20" },
    { title: "Frage 2", description: "eine Beschreibung", time: "11:20" },
    { title: "Frage 3", description: "eine Beschreibung", time: "11:20" },
    { title: "Frage 4", description: "eine Beschreibung", time: "11:20" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.searchRow}>
        <TextInput style={styles.searchInput} placeholder="Suche..." />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Chirurgie</Text>
      <Text style={styles.subtitle}>4 Ergebnisse</Text>

      {/* Ergebnis-Karten */}
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.time}>{item.time}</Text>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color="#317AFF" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9F9FC" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: "#317AFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderRadius: 10,
  },
  filterText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c1c7c",
    marginBottom: 6,
  },
  subtitle: {
    color: "#444",
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  cardDescription: {
    color: "#555",
    fontSize: 14,
  },
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 45,
  },
  time: {
    backgroundColor: "#E4EEFF",
    color: "#317AFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default ChirurgieScreen;
