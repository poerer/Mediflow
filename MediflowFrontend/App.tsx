import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import KrankenhausScreen from './screen/KrankenhausScreen';
import { RootStackParamList } from './type';

const Stack = createStackNavigator<RootStackParamList>();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Krankenhaus" component={KrankenhausScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
