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
    title: "Orthopädie",
    results: "Ergebnisse",
    searchPlaceholder: "Suche...",
    filter: "Filter",
    switchTo: "EN",
    knewIt: "Wusste ich",
    didntKnow: "Wusste ich nicht",
    questions: [
      { question: "Was ist eine Skoliose?", answer: "Seitliche Wirbelsäulenverkrümmung" },
      { question: "Was ist eine Arthrose?", answer: "Gelenkverschleiß" },
      { question: "Was ist ein Bandscheibenvorfall?", answer: "Verschiebung der Bandscheibe mit Nervendruck" },
      { question: "Was ist eine Fraktur?", answer: "Knochenbruch" },
      { question: "Was ist eine Luxation?", answer: "Gelenkausrenkung" },
      { question: "Was ist eine Bursitis?", answer: "Schleimbeutelentzündung" },
      { question: "Was ist ein Meniskusriss?", answer: "Riss im Knorpel des Kniegelenks" },
      { question: "Was ist ein Hallux valgus?", answer: "Schiefstellung der Großzehe" },
      { question: "Was ist Osteoporose?", answer: "Knochenschwund" },
      { question: "Was ist ein Gipsverband?", answer: "Fixierung zur Ruhigstellung von Frakturen" },
      { question: "Was ist eine Pseudarthrose?", answer: "Nicht verheilter Knochenbruch" },
      { question: "Was bedeutet Mobilisation?", answer: "Wiederherstellung der Beweglichkeit" },
      { question: "Was ist ein Orthese?", answer: "Stütz- oder Korrekturhilfe" },
      { question: "Was ist eine Prothese?", answer: "Künstlicher Ersatz eines Körperteils" },
      { question: "Was ist ein Kompartmentsyndrom?", answer: "Druckanstieg im Muskelkompartiment mit Durchblutungsstörung" },
    ],
  },
  en: {
    title: "Orthopedics",
    results: "results",
    searchPlaceholder: "Search...",
    filter: "Filter",
    switchTo: "DE",
    knewIt: "I knew it",
    didntKnow: "I didn’t know",
    questions: [
      { question: "What is scoliosis?", answer: "Sideways curvature of the spine" },
      { question: "What is osteoarthritis?", answer: "Joint wear and tear" },
      { question: "What is a herniated disc?", answer: "Displacement of disc pressing on nerves" },
      { question: "What is a fracture?", answer: "Broken bone" },
      { question: "What is a dislocation?", answer: "Displacement of a joint" },
      { question: "What is bursitis?", answer: "Inflammation of a bursa" },
      { question: "What is a meniscus tear?", answer: "Tear in the knee cartilage" },
      { question: "What is hallux valgus?", answer: "Bunion / Misaligned big toe" },
      { question: "What is osteoporosis?", answer: "Bone density loss" },
      { question: "What is a cast?", answer: "Immobilization for fractures" },
      { question: "What is a pseudarthrosis?", answer: "Non-healing bone fracture" },
      { question: "What is mobilization?", answer: "Restoration of movement" },
      { question: "What is an orthosis?", answer: "Supportive or corrective brace" },
      { question: "What is a prosthesis?", answer: "Artificial body part replacement" },
      { question: "What is a compartment syndrome?", answer: "Pressure increase in muscle compartment affecting circulation" },
    ],
  },
};

const OrthoScreen: React.FC = () => {
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

export default OrthoScreen;
