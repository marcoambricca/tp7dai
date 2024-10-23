import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getData } from '../../local/data-service.js';
import Header from '../../components/header.jsx';

export default function EventDetail({ route, navigation }) {
    const { event } = route.params;

    if (!event) {
        return <Text>Cargando...</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} title={'Detalles de evento'}/>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{event.name}</Text>
                <Text style={styles.description}>{event.description}</Text>
                <Text style={styles.detail}>Fecha: {new Date(event.start_date).toLocaleDateString()}</Text>
                <Text style={styles.detail}>Capacidad máxima: {event.max_assistance}</Text>
                <Text style={styles.detail}>Precio: ${event.price}</Text>
                <Text style={styles.detail}>Ubicación: {event.event_location.name}</Text>
                <Text style={styles.detail}>Categoría: {event.event_category.name}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        marginBottom: 12,
    },
    detail: {
        fontSize: 14,
        marginBottom: 8,
    },
});
