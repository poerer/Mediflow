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
import { Href, Link, RelativePathString } from "expo-router";


type Term = {
  id: number;
  term: string;
  definition: string;
};

type ModuleCardProps = {
  title: string;
  subtitle: string;
  badge: string;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ badge, title, subtitle }) => (
  <View
    style={{
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      width: "48%",
    }}
  >
    <Text
      style={{
        backgroundColor: "#0026FF",
        color: "#fff",
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
        marginBottom: 10,
        alignSelf: "flex-start",
      }}
    >
      {badge}
    </Text>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 16,
      }}
    >
      {title}
    </Text>
    <Text
      style={{
        color: "#888",
        fontSize: 14,
      }}
    >
      1{subtitle}
    </Text>
  </View>
);

const categories: Array<{ title: string, icon: string, href: Href }> = [
  {
    title: "Krankenhaus",
    icon: "hospital-building",
    href: "/krankenhaus",
  },
  { title: "Arztbrief", icon: "palette", href: "/arztbrief" },
  { title: "Ablauf", icon: "timeline-clock", href: "/ablauf-fruehschicht" },
  { title: "Chirurgie", icon: "needle", href: "/chirurgie" },
  {
    title: "Innere Medizin",
    icon: "heart-pulse",
    href: "/innere-medizin",
  },
  { title: "Orthopädie", icon: "bone", href: "/orthopaedie" },
  { title: "WeChat", icon: "message", href: "/wechat" },
  {
    title: "SmallTalk",
    icon: "comment-processing",
    href: "/smalltalk",
  },
  {
    title: "Test",
    icon: "checkbox-marked-circle-outline",
    href: "/test",
  },
]

const HomeScreen = () => {
  const [terms, setTerms] = useState<Term[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/terms")
      .then((response) => response.json())
      .then((data: Term[]) => setTerms(data))
      .catch((error) =>
        console.error("Fehler beim Laden der Begriffe:", error)
      );
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F6F7FB",
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "#317AFF",
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={styles.greeting}>Hallo, Jana! 👋</Text>
        <Text style={styles.subtitle}>Was möchtest Du heute lernen?</Text>
      </View>

      {/* Teste Dich Sektion */}
      <View style={styles.testSection}>
        <View>
          <Text style={styles.testTitle}>TESTE DICH</Text>
          <TouchableOpacity style={styles.startButton}>
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

      {/* Wichtige Lernmodule */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Wichtige Lernmodule</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>Mehr...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.moduleContainer}>
        <ModuleCard
          badge="Beste Auswahl"
          title="Fachsprache"
          subtitle="18 Einheiten"
        />
        <ModuleCard
          badge="Platzhalter"
          title="Weiteres"
          subtitle="12 Einheiten"
        />
      </View>

      {/* API-Daten (Medizinische Begriffe) */}
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
  greeting: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
  },
  testSection: {
    backgroundColor: "#A9C1FA",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
    alignItems: "center",
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  moreText: {
    color: "#317AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  moduleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  termBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
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
