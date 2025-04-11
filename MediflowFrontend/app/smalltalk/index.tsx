import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const topics = [
  {
    title: "Wetter",
    dialogue: {
      question: "Wie ist das Wetter heute?",
      answer: "Es ist sonnig und warm – perfektes Frühlingswetter.",
    },
  },
  {
    title: "Feiertage",
    dialogue: {
      question: "Gibt es bald einen Feiertag?",
      answer: "Ja, nächste Woche ist Christi Himmelfahrt.",
    },
  },
  {
    title: "Anfahrt",
    dialogue: {
      question: "War die Anfahrt in Ordnung?",
      answer: "Ja, es gab kaum Verkehr heute Morgen.",
    },
  },
  {
    title: "Freizeit",
    dialogue: {
      question: "Was machen Sie gerne in Ihrer Freizeit?",
      answer: "Ich lese gerne Krimis und gehe spazieren.",
    },
  },
  {
    title: "Sport",
    dialogue: {
      question: "Treiben Sie Sport?",
      answer: "Ja, ich spiele Tennis und gehe regelmäßig schwimmen.",
    },
  },
];

const SmallTalkScreen: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const handleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const markUnderstood = (index: number) => {
    setCompleted((prev) => [...prev, index]);
    setExpandedIndex(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Small Talk</Text>
      </View>

      {topics.map((topic, index) => {
        const isExpanded = expandedIndex === index;
        const isDone = completed.includes(index);

        return (
          <TouchableOpacity key={index} onPress={() => handleExpand(index)}>
            <View style={styles.card}>
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name={
                    isDone
                      ? "checkbox-marked-outline"
                      : "checkbox-blank-outline"
                  }
                  size={28}
                  color={isDone ? "#317AFF" : "#ccc"}
                />
                <Text
                  style={[
                    styles.cardTitle,
                    isDone && {
                      textDecorationLine: "line-through",
                      color: "#999",
                    },
                  ]}
                >
                  {topic.title}
                </Text>
              </View>

              {isExpanded && !isDone && (
                <View style={styles.dialogueBox}>
                  <Text style={styles.q}>🗣️ {topic.dialogue.question}</Text>
                  <Text style={styles.a}>💬 {topic.dialogue.answer}</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.buttonYes}
                      onPress={() => markUnderstood(index)}
                    >
                      <Text style={styles.buttonText}>Verstanden</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonNo}
                      onPress={() => setExpandedIndex(null)}
                    >
                      <Text style={styles.buttonText}>Noch üben</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#317AFF",
    padding: 16,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  card: {
    padding: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  dialogueBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#F0F4FF",
    borderRadius: 10,
  },
  q: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  a: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonYes: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonNo: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SmallTalkScreen;
