import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const translations = {
  de: {
    title: "Chirurgie",
    results: "Ergebnisse",
    searchPlaceholder: "Suche...",
    filter: "Filter",
    switchTo: "EN",
    knewIt: "Wusste ich",
    didntKnow: "Wusste ich nicht",
    questions: [
      {
        question: "Wie nennt man die Entfernung des Blinddarms?",
        answer: "Appendektomie",
      },
      {
        question: "Was versteht man unter einer Laparotomie?",
        answer: "Operative Eröffnung der Bauchhöhle",
      },
      {
        question: "Was ist eine Anastomose?",
        answer: "Verbindung zweier Hohlorgane",
      },
      {
        question: "Was bedeutet aseptisch?",
        answer: "Keimfrei",
      },
    ],
  },
  en: {
    title: "Surgery",
    results: "results",
    searchPlaceholder: "Search...",
    filter: "Filter",
    switchTo: "DE",
    knewIt: "I knew it",
    didntKnow: "I didn’t know",
    questions: [
      {
        question: "What is the medical term for appendix removal?",
        answer: "Appendectomy",
      },
      {
        question: "What is a laparotomy?",
        answer: "Surgical opening of the abdominal cavity",
      },
      {
        question: "What is an anastomosis?",
        answer: "Connection between two hollow organs",
      },
      {
        question: "What does aseptic mean?",
        answer: "Germ-free",
      },
    ],
  },
};

const ChirurgieScreen: React.FC = () => {
  const [language, setLanguage] = useState<"de" | "en">("de");
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [questions, setQuestions] = useState(translations[language].questions);

  const content = translations[language];

  const toggleLanguage = () => {
    const newLang = language === "de" ? "en" : "de";
    setLanguage(newLang);
    setQuestions(translations[newLang].questions);
    setRevealedIndex(null);
  };

  const handleReveal = (index: number) => {
    setRevealedIndex(revealedIndex === index ? null : index);
  };

  const handleKnew = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
    setRevealedIndex(null);
  };

  const handleDidntKnow = (index: number) => {
    const updated = [...questions];
    const [item] = updated.splice(index, 1);
    updated.push(item);
    setQuestions(updated);
    setRevealedIndex(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header: Suche, Filter, Sprache */}
      <View style={styles.topRow}>
        <TextInput
          style={styles.searchInput}
          placeholder={content.searchPlaceholder}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{content.filter}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langSwitch} onPress={toggleLanguage}>
          <Text style={styles.langText}>{content.switchTo}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.subtitle}>{questions.length} {content.results}</Text>

      {questions.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleReveal(index)}>
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>{item.question}</Text>
              {revealedIndex === index && (
                <>
                  <Text style={styles.cardDescription}>{item.answer}</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.knewButton}
                      onPress={() => handleKnew(index)}
                    >
                      <Text style={styles.knewText}>{content.knewIt}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.didntKnowButton}
                      onPress={() => handleDidntKnow(index)}
                    >
                      <Text style={styles.didntKnowText}>{content.didntKnow}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.time}>11:20</Text>
              <MaterialCommunityIcons
                name="bookmark-outline"
                size={24}
                color="#317AFF"
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9F9FC" },
  topRow: {
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
  langSwitch: {
    backgroundColor: "#20276F",
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  langText: {
    color: "#fff",
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
    marginTop: 6,
    marginBottom: 10,
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
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  knewButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  didntKnowButton: {
    backgroundColor: "#f44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  knewText: {
    color: "#fff",
    fontWeight: "600",
  },
  didntKnowText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ChirurgieScreen;
