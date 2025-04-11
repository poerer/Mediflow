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
    title: "Innere Medizin",
    results: "Ergebnisse",
    searchPlaceholder: "Suche...",
    filter: "Filter",
    switchTo: "EN",
    knewIt: "Wusste ich",
    didntKnow: "Wusste ich nicht",
    questions: [
      { question: "Was ist Hypertonie?", answer: "Bluthochdruck" },
      { question: "Was ist Bradykardie?", answer: "Langsamer Herzschlag" },
      { question: "Was ist Tachykardie?", answer: "Schneller Herzschlag" },
      { question: "Was bedeutet Dyspnoe?", answer: "Atemnot" },
      { question: "Was ist eine Anämie?", answer: "Blutarmut" },
      { question: "Was ist ein Ödem?", answer: "Flüssigkeitsansammlung im Gewebe" },
      { question: "Was ist COPD?", answer: "Chronisch obstruktive Lungenerkrankung" },
      { question: "Was ist Asthma bronchiale?", answer: "Entzündliche Erkrankung der Atemwege" },
      { question: "Was bedeutet Diabetes mellitus?", answer: "Zuckerkrankheit" },
      { question: "Was ist eine Leberzirrhose?", answer: "Schrumpfleber durch chronische Schäden" },
      { question: "Was bedeutet Ikterus?", answer: "Gelbsucht" },
      { question: "Was ist ein Herzinfarkt?", answer: "Absterben von Herzmuskelgewebe durch Durchblutungsstörung" },
      { question: "Was ist eine Pneumonie?", answer: "Lungenentzündung" },
      { question: "Was ist ein Ulcus ventriculi?", answer: "Magengeschwür" },
      { question: "Was ist Rheuma?", answer: "Autoimmunerkrankung der Gelenke" },
      { question: "Was ist eine Thrombose?", answer: "Blutgerinnsel in einem Blutgefäß" },
      { question: "Was ist ein Schlaganfall?", answer: "Akute Durchblutungsstörung im Gehirn" },
      { question: "Was ist ein Myom?", answer: "Gutartiger Tumor in der Gebärmutter" },
      { question: "Was ist eine Gastritis?", answer: "Magenschleimhautentzündung" },
      { question: "Was ist eine Gicht?", answer: "Stoffwechselerkrankung mit Gelenkentzündung" },
    ],
  },
  en: {
    title: "Internal Medicine",
    results: "results",
    searchPlaceholder: "Search...",
    filter: "Filter",
    switchTo: "DE",
    knewIt: "I knew it",
    didntKnow: "I didn’t know",
    questions: [
      { question: "What is hypertension?", answer: "High blood pressure" },
      { question: "What is bradycardia?", answer: "Slow heart rate" },
      { question: "What is tachycardia?", answer: "Fast heart rate" },
      { question: "What does dyspnea mean?", answer: "Shortness of breath" },
      { question: "What is anemia?", answer: "Lack of red blood cells" },
      { question: "What is edema?", answer: "Fluid retention in tissue" },
      { question: "What is COPD?", answer: "Chronic obstructive pulmonary disease" },
      { question: "What is bronchial asthma?", answer: "Inflammatory airway disease" },
      { question: "What is diabetes mellitus?", answer: "Metabolic disease of sugar regulation" },
      { question: "What is liver cirrhosis?", answer: "Chronic liver damage with shrinkage" },
      { question: "What is jaundice?", answer: "Yellowing of the skin and eyes" },
      { question: "What is a heart attack?", answer: "Death of heart muscle tissue due to blockage" },
      { question: "What is pneumonia?", answer: "Lung infection" },
      { question: "What is a gastric ulcer?", answer: "Stomach ulcer" },
      { question: "What is rheumatism?", answer: "Autoimmune joint disease" },
      { question: "What is a thrombosis?", answer: "Blood clot in a vessel" },
      { question: "What is a stroke?", answer: "Sudden cerebral blood supply disruption" },
      { question: "What is a myoma?", answer: "Benign tumor in the uterus" },
      { question: "What is gastritis?", answer: "Inflammation of stomach lining" },
      { question: "What is gout?", answer: "Metabolic disorder with joint inflammation" },
    ],
  },
};

const InnereMedizinScreen: React.FC = () => {
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

export default InnereMedizinScreen;
