// app/test/index.tsx

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";

const TestScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/mountain.jpg")}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <Text style={styles.title}>Testbereich</Text>

      {[
        {
          question: "Wie sagt man 'Pflaster' auf Englisch?",
          options: ["Bandage", "Plaster", "Patch"],
          answer: "Plaster",
        },
        {
          question: "Was bedeutet 'Admission'?",
          options: ["Entlassung", "Aufnahme", "Verlauf"],
          answer: "Aufnahme",
        },
        {
          question: "Wie nennt man 'Spritze' auf Englisch?",
          options: ["Injection", "Syringe", "Needle"],
          answer: "Syringe",
        },
      ].map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardQuestion}>{item.question}</Text>
          <Text style={styles.cardAnswer}>Richtige Antwort: {item.answer}</Text>
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
  cardQuestion: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardAnswer: {
    fontSize: 14,
    color: "#666",
  },
});

export default TestScreen;
