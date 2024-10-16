import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import { apiCall, apiDelete, apiPut } from '../api/api-controller.js';
import { getData } from '../local/data-service.js'; // Importa la función para obtener datos locales
import EditEventModal from './edit-event-modal.jsx'; // Asegúrate de crear este componente

export default function CreatedEventsList() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Estado para almacenar el usuario actual

    useEffect(() => {
        fetchUser();
    }, []);


    const fetchEvents = async (creatorId) => {
        try {
            const result = await apiCall('event', [null, null, null, null], null); // Llama a todos los eventos
            // Filtra los eventos por id_creator_user
            const filteredEvents = result.filter(event => event.id_creator_user === creatorId);
            setEvents(filteredEvents);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUser = async () => {
        const user = await getData('user'); // Obtiene el usuario actual
        if (user) {
            setCurrentUser(user);
            fetchEvents(user.id); // Llama a fetchEvents con el ID del creador
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
                            fetchEvents(currentUser.id); // Actualiza la lista tras eliminar
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setEditModalVisible(true);
    };

    const handleUpdateEvent = async (updatedEvent) => {
        try {
            const user = await getData('user'); // Asegúrate de tener el token de usuario
            const response = await apiPut(`event`, updatedEvent, user.token);
            if (response) {
                fetchEvents(currentUser.id); // Actualiza la lista tras modificar
                setEditModalVisible(false);
            } else {
                Alert.alert("Error", "No se pudo actualizar el evento.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView>
            {events.map((event, index) => (
                <View key={index} style={styles.eventCard}>
                    <Text>{event.name}</Text>
                    <Text>{new Date(event.start_date).toLocaleDateString()}</Text>
                    <Button title="Editar" onPress={() => handleEdit(event)} />
                    <Button title="Eliminar" onPress={() => handleDelete(event.id)} />
                    <Button title="Ver asistentes" onPress={() => {/* Ver asistentes */}} />
                </View>
            ))}
            {isEditModalVisible && 
                <EditEventModal 
                    visible={isEditModalVisible} 
                    onClose={() => setEditModalVisible(false)} 
                    event={selectedEvent} 
                    onUpdateEvent={handleUpdateEvent}
                />
            }
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
