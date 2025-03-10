import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
    const [terms, setTerms] = useState([]);  // State für API-Daten

    useEffect(() => {
        fetch('http://localhost:5001/api/terms')  // API-Call
            .then((response) => response.json())
            .then((data) => setTerms(data))  // Daten speichern
            .catch((error) => console.error('Fehler beim Laden der Begriffe:', error));
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
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
                <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.testImage} />
            </View>

            {/* Kategorien */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Kategorien</Text>
                <TouchableOpacity>
                    <Text style={styles.moreText}>Mehr...</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.grid}>
                {[
                    { title: 'Krankenhaus', icon: 'hospital-building' },
                    { title: 'Arztbrief', icon: 'palette' },
                    { title: 'Ablauf', icon: 'timeline-clock' },
                    { title: 'Chirurgie', icon: 'needle' },
                    { title: 'Innere Medizin', icon: 'heart-pulse' },
                    { title: 'Orthopädie', icon: 'bone' },
                    { title: 'WeChat', icon: 'message' },
                    { title: 'SmallTalk', icon: 'comment-processing' },
                    { title: 'Test', icon: 'checkbox-marked-circle-outline' }
                ].map((item, index) => (
                    <View key={index} style={styles.categoryBox}>
                        <MaterialCommunityIcons name={item.icon} size={22} color="#317AFF" />
                        <Text style={styles.categoryText}>{item.title}</Text>
                    </View>
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
                {/* Fachsprache mit Badge */}
                <View style={styles.moduleCard}>
                    <Text style={styles.moduleBadge}>Beste Auswahl</Text>
                    <Text style={styles.moduleTitle}>Fachsprache</Text>
                    <Text style={styles.moduleSubtitle}>18 Einheiten</Text>
                </View>

                {/* Weiteres mit Platzhalter-Badge für gleichen Abstand */}
                <View style={styles.moduleCard}>
                    <Text style={[styles.moduleBadge, { opacity: 0 }]}>Platzhalter</Text>  
                    <Text style={styles.moduleTitle}>Weiteres</Text>
                    <Text style={styles.moduleSubtitle}>12 Einheiten</Text>
                </View>
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
    container: {
        flex: 1,
        backgroundColor: '#F6F7FB',
        paddingHorizontal: 16
    },
    header: {
        backgroundColor: '#317AFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20
    },
    greeting: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#fff',
        fontSize: 14
    },
    testSection: {
        backgroundColor: '#A9C1FA',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    testTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    startButton: {
        backgroundColor: '#317AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5
    },
    startText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    testImage: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    moreText: {
        color: '#317AFF',
        fontSize: 16,
        fontWeight: '500'
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    categoryBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    categoryText: {
        marginLeft: 10,
        fontSize: 16
    },
    moduleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    moduleCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '48%'
    },
    moduleBadge: {
        backgroundColor: '#0026FF',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
        marginBottom: 10,
        alignSelf: 'flex-start'
    },
    moduleTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    moduleSubtitle: {
        color: '#888',
        fontSize: 14
    },
    termBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    termTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    termDefinition: {
        color: '#555',
        fontSize: 14
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10
    }
});

export default HomeScreen;
