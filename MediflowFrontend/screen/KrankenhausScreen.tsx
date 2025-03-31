import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';


const KrankenhausScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Krankenhaus</Text>
     
            
            <View style={styles.item}>
                <Text style={styles.title}>Aufnahme</Text>
                <Text style={styles.subtitle}>Admission</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.title}>Spritze</Text>
                <Text style={styles.subtitle}>Syringe</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.title}>Gips</Text>
                <Text style={styles.subtitle}>Plaster</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.title}>Pflaster</Text>
                <Text style={styles.subtitle}>Plaster</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.title}>Wo ist Station 3?</Text>
                <Text style={styles.subtitle}>Where is station 3?</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    image: { width: '100%', height: 150, resizeMode: 'contain', marginBottom: 20 },
    item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    title: { fontSize: 16, fontWeight: 'bold' },
    subtitle: { fontSize: 14, color: '#666' }
});

export default KrankenhausScreen;
