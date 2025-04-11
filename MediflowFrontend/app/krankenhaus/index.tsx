// app/krankenhaus/index.tsx

import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

type Card = {
  id: number;
  german: string;
  english: string;
  revealed: boolean;
};

const initialCards: Card[] = [
  { id: 1, german: "Aufnahme", english: "Admission", revealed: false },
  { id: 2, german: "Spritze", english: "Syringe", revealed: false },
  { id: 3, german: "Gips", english: "Plaster", revealed: false },
  { id: 4, german: "Pflaster", english: "Plaster", revealed: false },
  { id: 5, german: "Wo ist Station 3?", english: "Where is station 3?", revealed: false },
];

const KrankenhausScreen: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const revealCard = (id: number) => {
    setCards(prev =>
      prev.map(card => (card.id === id ? { ...card, revealed: true } : card))
    );
  };

  const removeCard = (id: number) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const moveCardToEnd = (id: number) => {
    setCards(prev => {
      const card = prev.find(c => c.id === id);
      const others = prev.filter(c => c.id !== id);
      return card ? [...others, { ...card, revealed: false }] : prev;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Krankenhaus – Vokabeltraining</Text>

      {cards.map(card => (
        <View key={card.id} style={styles.card}>
          <TouchableOpacity onPress={() => revealCard(card.id)}>
            <Text style={styles.english}>{card.english}</Text>
            {card.revealed && <Text style={styles.german}>{card.german}</Text>}
          </TouchableOpacity>

          {card.revealed && (
            <View style={styles.buttons}>
              <Button title="Wusste ich" onPress={() => removeCard(card.id)} />
              <Button title="Wusste ich nicht" onPress={() => moveCardToEnd(card.id)} />
            </View>
          )}
        </View>
      ))}

      {cards.length === 0 && (
        <Text style={styles.success}>Super! Du hast alle Vokabeln geschafft!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#1c1c7c" },
  card: {
    backgroundColor: "#f2f6ff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  english: { fontSize: 18, color: "#317AFF", marginBottom: 8 },
  german: { fontSize: 16, fontWeight: "bold", color: "#000" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  success: {
    marginTop: 30,
    fontSize: 18,
    color: "#0a8f30",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default KrankenhausScreen;