import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Übersetzungen für verschiedene Sprachen
const translations = {
  de: {
    heading: "Ablauf Frühschicht",
    results: "Ergebnisse",
    close: "Schließen",
    switchTo: "Sprache ändern",
    items: [
      {
        title: "Dokumentation",
        time: "11:22",
        image: require("../../assets/images/avatar1.png"),
        description: "Vorbereitung und Sichtung der Patientendaten",
      },
      {
        title: "Vor Arbeitsbeginn",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Start der Frühschicht mit Übersicht zum Tagesablauf",
      },
      {
        title: "Übergabe",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Besprechung mit dem Nachtdienst über besondere Vorkommnisse",
      },
      {
        title: "Visite",
        time: "11:20",
        image: require("../../assets/images/avatar3.png"),
        description: "Ärztliche Visite mit Fallbesprechung und Planung",
      },
    ],
  },
  en: {
    heading: "Morning Shift Routine",
    results: "Results",
    close: "Close",
    switchTo: "Change language",
    items: [
      {
        title: "Documentation",
        time: "11:22",
        image: require("../../assets/images/avatar1.png"),
        description: "Preparation and review of patient data",
      },
      {
        title: "Before Work",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Start of the morning shift with daily overview",
      },
      {
        title: "Handover",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Discussion with night shift about incidents",
      },
      {
        title: "Ward Round",
        time: "11:20",
        image: require("../../assets/images/avatar3.png"),
        description: "Doctor’s round with case review and planning",
      },
    ],
  },
  ro: {
    heading: "Tura de dimineață",
    results: "Rezultate",
    close: "Închide",
    switchTo: "Schimbă limba",
    items: [
      {
        title: "Documentație",
        time: "11:22",
        image: require("../../assets/images/avatar1.png"),
        description: "Pregătirea și revizuirea datelor pacientului",
      },
      {
        title: "Înainte de muncă",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Începerea turei cu prezentare generală",
      },
      {
        title: "Predare",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Discuție cu tura de noapte despre incidente",
      },
      {
        title: "Vizită medicală",
        time: "11:20",
        image: require("../../assets/images/avatar3.png"),
        description: "Rond medical cu evaluare și planificare",
      },
    ],
  },
  el: {
    heading: "Πρωινή Βάρδια",
    results: "Αποτελέσματα",
    close: "Κλείσιμο",
    switchTo: "Αλλαγή γλώσσας",
    items: [
      {
        title: "Τεκμηρίωση",
        time: "11:22",
        image: require("../../assets/images/avatar1.png"),
        description: "Προετοιμασία και ανασκόπηση δεδομένων ασθενών",
      },
      {
        title: "Πριν από τη δουλειά",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Έναρξη βάρδιας με επισκόπηση",
      },
      {
        title: "Παράδοση",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Συζήτηση με τη νυχτερινή βάρδια",
      },
      {
        title: "Ιατρική επίσκεψη",
        time: "11:20",
        image: require("../../assets/images/avatar3.png"),
        description: "Ιατρική επίσκεψη με αξιολόγηση",
      },
    ],
  },
  ru: {
    heading: "Утренняя смена",
    results: "Результаты",
    close: "Закрыть",
    switchTo: "Сменить язык",
    items: [
      {
        title: "Документация",
        time: "11:22",
        image: require("../../assets/images/avatar1.png"),
        description: "Подготовка и просмотр данных пациента",
      },
      {
        title: "Перед началом",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Начало смены с обзором дня",
      },
      {
        title: "Передача",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Обсуждение с ночной сменой",
      },
      {
        title: "Врачебный обход",
        time: "11:20",
        image: require("../../assets/images/avatar3.png"),
        description: "Обход с планированием лечения",
      },
    ],
  },
  tr: {
    heading: "Sabah Vardiyası",
    results: "Sonuçlar",
    close: "Kapat",
    switchTo: "Dil değiştir",
    items: [
      {
        title: "Dokümantasyon",
        time: "11:22",
        image: require("../../assets/images/avatar1.png"),
        description: "Hasta verilerinin hazırlanması ve incelenmesi",
      },
      {
        title: "Çalışma Öncesi",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Sabah vardiyasının başlangıcı",
      },
      {
        title: "Devir Teslim",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Gece vardiyasıyla görüşme",
      },
      {
        title: "Vizit",
        time: "11:20",
        image: require("../../assets/images/avatar3.png"),
        description: "Doktor viziti ve planlama",
      },
    ],
  },
  es: {
    heading: "Turno de mañana",
    results: "Resultados",
    close: "Cerrar",
    switchTo: "Cambiar idioma",
    items: [
      {
        title: "Documentación",
        time: "11:22",
        image: require("../../assets/images/avatar1.png"),
        description: "Preparación y revisión de los datos del paciente",
      },
      {
        title: "Antes del trabajo",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Inicio del turno con resumen diario",
      },
      {
        title: "Entrega",
        time: "11:20",
        image: require("../../assets/images/avatar2.png"),
        description: "Discusión con el turno de noche",
      },
      {
        title: "Ronda médica",
        time: "11:20",
        image: require("../../assets/images/avatar3.png"),
        description: "Ronda con evaluación y planificación",
      },
    ],
  },
};

// Zulässige Sprachen
const availableLanguages = ["de", "en", "ro", "el", "ru", "tr", "es"] as const;
type Language = typeof availableLanguages[number];

const AblaufFruehschichtScreen: React.FC = () => {
  const [language, setLanguage] = useState<Language>("de");
  const [selectedItem, setSelectedItem] = useState<null | typeof translations["de"]["items"][0]>(null);

  const content = translations[language];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.langSwitcherRow}>
        {availableLanguages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.langButton,
              language === lang && { backgroundColor: "#20276F" },
            ]}
            onPress={() => setLanguage(lang)}
          >
            <Text style={styles.langButtonText}>{lang.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>{content.heading}</Text>
      <Text style={styles.subTitle}>
        {content.items.length} {content.results}
      </Text>

      {content.items.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => setSelectedItem(item)}>
          <View style={styles.card}>
            <Image source={item.image} style={styles.avatar} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.right}>
              <Text style={styles.time}>{item.time}</Text>
              <MaterialCommunityIcons name="bookmark-outline" size={22} color="#317AFF" />
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <Modal visible={!!selectedItem} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <Text style={styles.modalText}>{selectedItem?.description}</Text>
            <Pressable style={styles.closeButton} onPress={() => setSelectedItem(null)}>
              <Text style={styles.closeText}>{content.close}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 16, fontWeight: "bold", color: "#20276F", marginBottom: 2 },
  subTitle: { color: "#20276F", marginBottom: 15, fontWeight: "600" },
  langSwitcherRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  langButton: {
    backgroundColor: "#317AFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 4,
    borderRadius: 6,
  },
  langButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#C1BAF5",
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  cardTitle: { fontWeight: "bold", fontSize: 16, marginLeft: 12, flex: 1 },
  time: {
    backgroundColor: "#317AFF20",
    color: "#317AFF",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 4,
  },
  right: { alignItems: "center" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    elevation: 5,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#317AFF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AblaufFruehschichtScreen;
