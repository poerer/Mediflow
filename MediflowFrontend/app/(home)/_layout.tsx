// app/(home)/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, Link, useRouter } from "expo-router";
import { auth } from "../../utils/firebaseConfig"; // 🔐 Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

type Term = {
  id: number;
  term: string;
  definition: string;
};

const categories: Array<{ title: string; icon: string; href: Href }> = [
  { title: "Krankenhaus", icon: "hospital-building", href: "/krankenhaus" },
  { title: "Arztbrief", icon: "palette", href: "/arztbrief" },
  { title: "Ablauf", icon: "timeline-clock", href: "/ablauf-fruehschicht" },
  { title: "Chirurgie", icon: "needle", href: "/chirurgie" },
  { title: "Innere Medizin", icon: "heart-pulse", href: "/innere-medizin" },
  { title: "Orthopädie", icon: "bone", href: "/orthopaedie" },
  { title: "WeChat", icon: "message", href: "/wechat" },
  { title: "SmallTalk", icon: "comment-processing", href: "/smalltalk" },
];

const HomeScreen = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5001/api/terms")
      .then((response) => response.json())
      .then((data: Term[]) => setTerms(data))
      .catch((error) =>
        console.error("Fehler beim Laden der Begriffe:", error)
      );
  }, []);

  // 🔐 Auth state beobachten
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
      {/* 🔝 Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Hallo, Jana! 👋</Text>
        <TouchableOpacity
          onPress={() => router.push("/auth/AuthScreen")}
          style={styles.avatarButton}
        >
          {user ? (
            user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarInitial}>
                <Text style={styles.avatarText}>
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </Text>
              </View>
            )
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={40}
              color="#fff"
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Teste Dich */}
      <View style={styles.testSection}>
        <View>
          <Text style={styles.testTitle}>TESTE DICH</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push("/test")}
          >
            <Text style={styles.startText}>START</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/StartTest_doctor.png")}
          style={styles.testImage}
        />
      </View>

      {/* Kategorien */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Kategorien</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>Mehr...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {categories.map((item, index) => (
          <Link href={item.href} key={index} style={styles.categoryBox}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={22}
                color="#317AFF"
              />
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      {/* API-Daten */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Medizinische Begriffe</Text>
      </View>
      {terms.length > 0 ? (
        terms.map((term) => (
          <View key={term.id} style={styles.termBox}>
            <Text style={styles.termTitle}>{term.term}</Text>
            <Text style={styles.termDefinition}>{term.definition}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.loadingText}>Lade Begriffe...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#317AFF",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  avatarButton: {
    borderRadius: 20,
    backgroundColor: "#317AFF",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarInitial: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#317AFF",
    fontWeight: "bold",
  },
  testSection: {
    backgroundColor: "#A9C1FA",
    borderRadius: 10,
    padding: 20,
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  testTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "#317AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  startText: {
    color: "#fff",
    fontWeight: "bold",
  },
  testImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  moreText: {
    color: "#317AFF",
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  categoryBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 16,
  },
  termBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  termTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  termDefinition: {
    color: "#555",
    fontSize: 14,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default HomeScreen;
