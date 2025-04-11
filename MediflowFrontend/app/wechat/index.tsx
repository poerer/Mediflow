import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const chatData = [
    {
      de: "Ich habe seit gestern Kopfschmerzen.",
      en: "I've had a headache since yesterday.",
      responses: [
        { de: "Seit wann genau?", en: "Since when exactly?", correct: true },
        { de: "Möchten Sie schlafen?", en: "Do you want to sleep?", correct: false },
      ],
    },
    {
      de: "Mir ist übel und ich kann nichts essen.",
      en: "I feel nauseous and can't eat anything.",
      responses: [
        { de: "Hatten Sie Fieber?", en: "Did you have a fever?", correct: true },
        { de: "Mögen Sie Pizza?", en: "Do you like pizza?", correct: false },
      ],
    },
    {
      de: "Ich habe starke Bauchschmerzen.",
      en: "I have severe abdominal pain.",
      responses: [
        { de: "Wo genau tut es weh?", en: "Where exactly does it hurt?", correct: true },
        { de: "Möchten Sie spazieren gehen?", en: "Would you like to go for a walk?", correct: false },
      ],
    },
    {
      de: "Ich kann mein Bein nicht bewegen.",
      en: "I can't move my leg.",
      responses: [
        { de: "Gab es einen Unfall?", en: "Was there an accident?", correct: true },
        { de: "Trinken Sie genug Wasser?", en: "Do you drink enough water?", correct: false },
      ],
    },
    {
      de: "Ich fühle mich sehr schwach.",
      en: "I feel very weak.",
      responses: [
        { de: "Seit wann fühlen Sie sich so?", en: "How long have you been feeling this way?", correct: true },
        { de: "Haben Sie Hunger?", en: "Are you hungry?", correct: false },
      ],
    },
    {
      de: "Mein Rücken tut weh.",
      en: "My back hurts.",
      responses: [
        { de: "Heben Sie oft schwere Dinge?", en: "Do you often lift heavy objects?", correct: true },
        { de: "War das Frühstück gut?", en: "Was your breakfast good?", correct: false },
      ],
    },
    {
      de: "Ich habe Atemnot beim Treppensteigen.",
      en: "I experience shortness of breath when climbing stairs.",
      responses: [
        { de: "Hatten Sie früher ähnliche Beschwerden?", en: "Have you had similar issues before?", correct: true },
        { de: "Fahren Sie gerne Fahrrad?", en: "Do you enjoy cycling?", correct: false },
      ],
    },
    {
      de: "Ich habe heute früh Blut im Urin bemerkt.",
      en: "I noticed blood in my urine this morning.",
      responses: [
        { de: "Haben Sie Schmerzen beim Wasserlassen?", en: "Do you have pain when urinating?", correct: true },
        { de: "Waren Sie heute einkaufen?", en: "Did you go shopping today?", correct: false },
      ],
    },
    {
      de: "Ich habe ständig Husten.",
      en: "I have a persistent cough.",
      responses: [
        { de: "Seit wann besteht der Husten?", en: "Since when do you have the cough?", correct: true },
        { de: "Haben Sie Haustiere?", en: "Do you have pets?", correct: false },
      ],
    },
    {
      de: "Ich bin gestern gestürzt.",
      en: "I fell yesterday.",
      responses: [
        { de: "Haben Sie sich dabei verletzt?", en: "Did you hurt yourself?", correct: true },
        { de: "War der Boden sauber?", en: "Was the floor clean?", correct: false },
      ],
    },
  ];
  

const WeChatBasic: React.FC = () => {
  const [lang, setLang] = useState<"de" | "en">("de");
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const current = chatData[step];

  const handleAnswer = (correct: boolean) => {
    setFeedback(correct ? "✅ Gut reagiert!" : "❌ Nicht ganz richtig");
    setTimeout(() => {
      setFeedback(null);
      setStep((prev) => (prev + 1 < chatData.length ? prev + 1 : 0));
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.langSwitch}>
        <TouchableOpacity onPress={() => setLang(lang === "de" ? "en" : "de")} style={styles.langButton}>
          <Text style={styles.langText}>{lang === "de" ? "EN" : "DE"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.message}>
        <Text style={styles.messageText}>🗣️ {current[lang]}</Text>
      </View>

      {current.responses.map((r, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleAnswer(r.correct)}
          style={styles.responseButton}
        >
          <Text style={styles.responseText}>{r[lang]}</Text>
        </TouchableOpacity>
      ))}

      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  langSwitch: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  langButton: {
    backgroundColor: "#317AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  langText: {
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    backgroundColor: "#E0E0E0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  responseButton: {
    backgroundColor: "#F0F4FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  responseText: {
    fontSize: 15,
    color: "#20276F",
  },
  feedback: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#317AFF",
    fontWeight: "bold",
  },
});

export default WeChatBasic;
