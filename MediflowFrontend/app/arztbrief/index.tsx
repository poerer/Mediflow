import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Image } from 'expo-image';

const Page: React.FC = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ backgroundColor: "#4C7EFF", padding: 20 }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
        }}>
          Arztbrief
        </Text>
      </View>

      <View style={{ height: 250 }}>
        <Image
          style={{ flex: 1 }}
          source={require('../../assets/images/mountain.jpg')}
          contentFit="cover"
          transition={1000}
        />
      </View>

      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Beispiel-Inhalt:</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>
          Hier soll ein PDF oder Textinhalt mit einem Arztbrief angezeigt werden.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Page;
