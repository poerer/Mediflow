import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Image } from 'expo-image';

interface ItemProps {
    title: string;
    subtitle: string;
}

const Item: React.FC<ItemProps> = ({ title, subtitle }) => (
    <View style={{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{subtitle}</Text>
    </View>
)

const Page: React.FC = () => {
  return (
    <ScrollView style={{ display: 'flex', backgroundColor: "#fff" }}>
      <View
        style={{ backgroundColor: "#4278c4", paddingTop: 20, paddingBottom: 10 }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            marginBottom: 10,
          }}
        >
          Krankenhaus
        </Text>
      </View>
      <View style={{ height: 300 }}>
        <Image
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#0553',
          }}
          source={require('../../assets/images/mountain.jpg')}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <Item title="Krankenhaus" subtitle="Hospital" />
      <Item title="Arzt" subtitle="Doctor" />
    </ScrollView>
  );
};

export default Page;
