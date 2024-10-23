import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal } from 'react-native';
import { apiCall, apiDelete } from '../api/api-controller.js';
import { getData } from '../local/data-service.js';
import Header from '../components/header.jsx';

export default function AdminPanel({ navigation }) {
    const [events, setEvents] = useState([]);
    const [eventEnrollments, setEventEnrollments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const user = await getData('user');
            if(user){setCurrentUser(user)}
            let result = await apiCall('event', [null, null, null, null], null);
            result = result[0].json_agg;
            console.log('result', result);
            if (result) {
                const filteredEvents = result.filter(event => event.creator_user.id === user.id)
                setEvents(filteredEvents);
            }
        };
        fetchEvents();
    }, []);

    const fetchParticipants = async (eventId) => {
        try {
          const result = await apiCall(`event/${eventId}/enrollment`);
          console.log('Enroll fetch', result);
      
          if (result.success) {
            setEventEnrollments(result);
          } else {
            alert('No enrollments for event')
          }
        } catch (error) {
          console.error('Error fetching enrollments:', error.message);
        }
      };

    const handleDeleteEvent = async (eventId) => {
        const response = await apiDelete(`event/${eventId}`, currentUser.token);
        if (response) {
            setEvents(events.filter(event => event.id !== eventId));
        }
    };

    const openParticipantsModal = (eventId) => {
        fetchParticipants(eventId);
        setSelectedEventId(eventId);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEventEnrollments([]);
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title={'Panel de administrador'}/>
            <ScrollView>
                {events.map(event => (
                    <View key={event.id} style={styles.card}>
                        <Text style={styles.cardTitle}>{event.name}</Text>
                        <Button title="Ver participantes" onPress={() => openParticipantsModal(event.id)} />
                        <Button title="Eliminar evento" onPress={() => handleDeleteEvent(event.id)} color="red" />
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
                >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Participantes</Text>
                    
                    {eventEnrollments.length > 0 ? (
                    eventEnrollments.map((enrollment) => (
                        <View key={enrollment.id_event} style={styles.participant}>
                        <Text>ID Evento: {enrollment.id_event}</Text>
                        <Text>ID Usuario: {enrollment.id_user}</Text>
                        <Text>Descripción: {enrollment.description}</Text>
                        <Text>Fecha de inscripción: {new Date(enrollment.registration_date_time).toLocaleDateString()}</Text>
                        </View>
                    ))
                    ) : (
                    <Text style={styles.noEnrollmentsMessage}>No hay inscripciones a este evento.</Text>
                    )}
                    
                    <Button title="Close" onPress={closeModal} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    participant: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
    },
});
