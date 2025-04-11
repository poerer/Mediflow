// app/test/index.tsx

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const questions = [
  {
    category: "Chirurgie",
    question: "Wie nennt man die Entfernung des Blinddarms?",
    options: ["Appendektomie", "Cholezystektomie", "Gastrektomie"],
    answer: "Appendektomie",
  },
  {
    category: "Innere Medizin",
    question: "Was bedeutet 'Dyspnoe'?",
    options: ["Atemnot", "Herzrasen", "Fieber"],
    answer: "Atemnot",
  },
  {
    category: "Orthopädie",
    question: "Was ist eine Gonarthrose?",
    options: [
      "Verschleiß des Kniegelenks",
      "Entzündung des Ellenbogens",
      "Bruch des Oberschenkels",
    ],
    answer: "Verschleiß des Kniegelenks",
  },
  {
    category: "Smalltalk",
    question: "Wie war dein Wochenende?",
    options: ["Ganz entspannt!", "Ich habe gearbeitet.", "Nicht so gut."],
    answer: "Ganz entspannt!",
  },
  {
    category: "Englisch",
    question: "Was bedeutet 'Plaster' auf Deutsch?",
    options: ["Pflaster", "Gips", "Verbandsmaterial"],
    answer: "Pflaster",
  },
];

const TestScreen: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<
    { question: string; correct: string }[]
  >([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const handleAnswer = (option: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].answer;

    if (option === "") {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          question: questions[currentQuestion].question,
          correct: questions[currentQuestion].answer,
        },
      ]);
    } else if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          question: questions[currentQuestion].question,
          correct: questions[currentQuestion].answer,
        },
      ]);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption("");
        setTimeLeft(20);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  useEffect(() => {
    setSelectedOption("");
    setTimeLeft(20);

    // 1. Haupttimer für automatische Antwort
    timerRef.current = setTimeout(() => {
      handleAnswer("");
    }, 20000);

    // 2. Countdown anzeigen
    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [currentQuestion]);

  const getLanguageLevel = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 90) return "C2";
    if (percentage >= 75) return "C1";
    if (percentage >= 60) return "B2";
    if (percentage >= 45) return "B1";
    if (percentage >= 30) return "A2";
    return "A1";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧠 Medizinischer Test</Text>
      {!showResult ? (
        <View style={styles.quizContainer}>
          <Text style={styles.category}>
            Kategorie: {questions[currentQuestion].category}
          </Text>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>

          <Text style={styles.timer}>⏱ {timeLeft} Sekunden</Text>

          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => handleAnswer(option)}
              disabled={selectedOption !== ""}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Ergebnis</Text>
          <Text style={styles.resultText}>
            ✅ Richtige Antworten: {correctAnswers} / {questions.length}
          </Text>
          <Text style={styles.resultText}>
            ❌ Fehler: {questions.length - correctAnswers}
          </Text>
          <Text style={styles.resultText}>
            🎓 Sprachniveau: {getLanguageLevel()}
          </Text>

          {incorrectAnswers.length > 0 && (
            <View style={styles.errorList}>
              <Text style={styles.errorTitle}>❗ Fehlerübersicht:</Text>
              {incorrectAnswers.map((item, index) => (
                <View key={index} style={styles.errorItem}>
                  <Text style={styles.errorQuestion}>Frage: {item.question}</Text>
                  <Text style={styles.errorAnswer}>➤ Richtig: {item.correct}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f4f7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  quizContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff3d00",
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#d0e8ff",
  },
  optionText: {
    fontSize: 16,
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorList: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  errorTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#d32f2f",
  },
  errorItem: {
    marginBottom: 10,
  },
  errorQuestion: {
    fontSize: 15,
    fontWeight: "600",
  },
  errorAnswer: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
  },
});

export default TestScreen;
