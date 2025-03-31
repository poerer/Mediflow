import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';


type Term = {
    id: number;
    term: string;
    definition: string;
};

const HomeScreen = () => {
    const [terms, setTerms] = useState<Term[]>([]);
    type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<HomeScreenNavigationProp>();
    
    

    

    useEffect(() => {
        fetch('http://localhost:5001/api/terms')
            .then((response) => response.json())
            .then((data: Term[]) => setTerms(data))
            .catch((error) => console.error('Fehler beim Laden der Begriffe:', error));
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hallo, Jana! 👋</Text>
                <Text style={styles.subtitle}>Was möchtest Du heute lernen?</Text>
            </View>

            {/* Kategorien */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Kategorien</Text>
            </View>

            <View style={styles.grid}>
                {[
                   
                    { title: 'Krankenhaus', icon: 'hospital-building', screen: 'Krankenhaus' },
                    { title: 'Arztbrief', icon: 'palette', screen: 'Arztbrief' },
                    { title: 'Ablauf', icon: 'timeline-clock', screen: 'Ablauf' }
                
                  
                ].map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.categoryBox} 
                        onPress={() => navigation.navigate('Krankenhaus')}

                        
                        
                    >
                        <MaterialCommunityIcons 
                            name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap} 
                            size={22} 
                            color="#317AFF" 
                        />
                        <Text style={styles.categoryText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
    }
});

export default HomeScreen;
