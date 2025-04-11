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

const items = [
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
];

const AblaufFruehschichtScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<null | typeof items[0]>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ablauf Frühschicht</Text>
      <Text style={styles.subTitle}>{items.length} Ergebnisse</Text>

      {items.map((item, index) => (
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
              <Text style={styles.closeText}>Schließen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20276F",
    marginBottom: 2,
  },
  subTitle: {
    color: "#20276F",
    marginBottom: 15,
    fontWeight: "600",
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
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
  right: {
    alignItems: "center",
  },
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