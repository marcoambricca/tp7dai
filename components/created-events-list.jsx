import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import { apiCall, apiDelete } from '../api/api-controller.js';

export default function CreatedEventsList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const result = await apiCall('event/admin'); // Llama a los eventos creados por el administrador
            setEvents(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (eventId) => {
        Alert.alert(
            "Eliminar evento",
            "¿Estás seguro que deseas eliminar este evento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            await apiDelete(`event/${eventId}`);
                            fetchEvents(); // Actualiza la lista tras eliminar
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView>
            {events.map((event) => (
                <View key={event.id} style={styles.eventCard}>
                    <Text>{event.name}</Text>
                    <Text>{new Date(event.start_date).toLocaleDateString()}</Text>
                    <Button title="Editar" onPress={() => {/* Lógica para editar */}} />
                    <Button title="Eliminar" onPress={() => handleDelete(event.id)} />
                    <Button title="Ver asistentes" onPress={() => {/* Ver asistentes */}} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = {
    eventCard: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
};
