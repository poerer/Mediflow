// app/smalltalk/index.tsx

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";

const SmallTalkScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/mountain.jpg")}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <Text style={styles.title}>SmallTalk</Text>

      {[
        { question: "Wie war dein Wochenende?", answer: "Ganz entspannt!" },
        { question: "Schöner Tag heute, oder?", answer: "Ja, endlich Sonne!" },
        { question: "Wie läuft die Arbeit?", answer: "Alles im grünen Bereich." },
        { question: "Gehst du heute noch raus?", answer: "Vielleicht, wenn es trocken bleibt." },
      ].map((dialogue, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{dialogue.question}</Text>
          <Text style={styles.cardDescription}>{dialogue.answer}</Text>
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

export default SmallTalkScreen;
