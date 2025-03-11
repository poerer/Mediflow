import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/(tabs)/index';  // Stelle sicher, dass der Pfad korrekt ist!

export default function App() {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
