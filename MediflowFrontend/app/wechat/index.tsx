// app/wechat/index.tsx

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";

const WeChatScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/mountain.jpg")}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <Text style={styles.title}>WeChat</Text>

      {["Nachricht 1", "Nachricht 2", "Nachricht 3", "Nachricht 4"].map(
        (msg, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{msg}</Text>
            <Text style={styles.cardDescription}>
              Beispiel für eine Kommunikation
            </Text>
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 250,
  },
  image: {
    flex: 1,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default WeChatScreen;
