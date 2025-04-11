// app/chirurgie/index.tsx

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";

const ChirurgieScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/mountain.jpg")} // Platzhalterbild
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <Text style={styles.title}>Chirurgie</Text>

      {["Frage 1", "Frage 2", "Frage 3", "Frage 4"].map((question, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{question}</Text>
          <Text style={styles.cardDescription}>eine Beschreibung</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 250,
  },
  image: {
    flex: 1,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default ChirurgieScreen;
