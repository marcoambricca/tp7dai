import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { apiCall, apiPost } from '../api/api-controller.js';
import { getData } from '../local/data-service.js';

export default function EventDetail({ route, navigation }) {
    const { eventId } = route.params; // Obtiene el ID del evento desde las props
    const [eventDetails, setEventDetails] = useState(null);
    const [isFull, setIsFull] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Carga los detalles del evento y verifica si está lleno
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const result = await apiCall(`event/${eventId}`);
                const user = await getData('user');
                setEventDetails(result);
                setCurrentUser(user);

                // Verifica la capacidad del evento
                const enrollmentResult = await apiCall(`event/${eventId}/enrollment`);
                if (enrollmentResult && enrollmentResult.length >= result.max_assistance) {
                    setIsFull(true); // Si el evento está lleno
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    // Maneja la inscripción
    const handleEnroll = async () => {
        if (isFull) {
            Alert.alert("Evento Completo", "Este evento ha alcanzado su capacidad máxima.");
        } else {
            try {
                const response = await apiPost(`event/${eventId}/enrollment`, {}, currentUser.token);
                if (response) {
                    Alert.alert("Inscripción Exitosa", "Te has inscrito al evento.");
                }
            } catch (error) {
                console.log(error);
                Alert.alert("Error", "Hubo un problema al intentar inscribirte.");
            }
        }
    };

    if (!eventDetails) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View>
            <Text>{eventDetails.name}</Text>
            <Text>{eventDetails.description}</Text>
            <Text>Fecha: {new Date(eventDetails.start_date).toLocaleDateString()}</Text>
            <Text>Capacidad máxima: {eventDetails.max_assistance}</Text>
            <Text>Precio: ${eventDetails.price}</Text>

            <Button
                title={isFull ? "Evento Completo" : "Inscribirme"}
                onPress={handleEnroll}
                disabled={isFull}
            />
        </View>
    );
}
