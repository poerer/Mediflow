import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
  Image,
} from "react-native";

type Section = {
  id: string;
  title: string;
  content: string;
  description: string;
};

const sections: Section[] = [
  {
    id: "anamnese",
    title: "Anamnese",
    content: "Anamnese: Keine Beschwerden, keine Morgensteifigkeit...",
    description: "In der Anamnese wird die Vorgeschichte des Patienten dokumentiert.",
  },
  {
    id: "koerper",
    title: "Körperlicher Untersuchungsbefund",
    content: "Gewicht: 51 kg, Größe: 170 cm, guter Allgemeinzustand...",
    description: "Hier werden insbesondere pathologische Befunde des Körpers aufgeführt.",
  },
  {
    id: "resultate",
    title: "Resultate diagnostischer Maßnahmen",
    content: "Entzündungsparameter negativ, Blutbild unauffällig...",
    description: "Hier findet man die Resultate von Blutuntersuchungen oder Laborwerten.",
  },
  {
    id: "therapie",
    title: "Therapieempfehlung",
    content: "Quensyl 200mg 1-0-0, Indometacin 2-2-2...",
    description: "Auflistung der empfohlenen Medikamente mit Dosis und Einnahmehinweis.",
  },
  {
    id: "epikrise",
    title: "Epikrise",
    content: "Die Patientin befindet sich seit 6 Monaten beschwerdefrei...",
    description: "Eine Epikrise fasst die Aufnahmesituation und den Verlauf der Behandlung zusammen.",
  },
];

const ArztbriefScreen: React.FC = () => {
  const [selected, setSelected] = useState<Section | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Beispiel-Arztbrief</Text>

      {sections.map((section, index) => (
        <Pressable key={index} style={styles.card} onPress={() => setSelected(section)}>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.text}>{section.content}</Text>
        </Pressable>
      ))}

      {/* Modal Beschreibung */}
      <Modal visible={!!selected} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selected?.title}</Text>
            <Text style={styles.modalText}>{selected?.description}</Text>
            <Pressable onPress={() => setSelected(null)} style={styles.closeButton}>
              <Text style={styles.closeText}>Schließen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ⬇️ Bild unterhalb der Bereiche */}
      <Text style={styles.header}>Vollständiger Arztbrief (Beispielbild)</Text>
      <Image
        source={require("../../assets/images/arztbrief.png")} // <- stelle sicher, dass das Bild so heißt
        style={styles.image}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9F9FC",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c1c7c",
    marginVertical: 12,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#317AFF",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 600,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default ArztbriefScreen;
