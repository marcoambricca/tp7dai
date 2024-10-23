import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
import { apiCall, apiDelete, apiPost } from '../api/api-controller.js';
import { getData } from '../local/data-service.js';

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
            setEventEnrollments(result); // Set state only if successful
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
            <Text style={styles.title}>Admin Panel</Text>
            <ScrollView>
                {events.map(event => (
                    <View key={event.id} style={styles.card}>
                        <Text style={styles.cardTitle}>{event.name}</Text>
                        <Button title="View Participants" onPress={() => openParticipantsModal(event.id)} />
                        <Button title="Delete Event" onPress={() => handleDeleteEvent(event.id)} color="red" />
                    </View>
                ))}
            </ScrollView>

            {/* Participants Modal */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
                >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Participants</Text>
                    
                    {/* Ternary check for enrollments */}
                    {eventEnrollments.length > 0 ? (
                    eventEnrollments.map((enrollment) => (
                        <View key={enrollment.id_event} style={styles.participant}>
                        <Text>Event ID: {enrollment.id_event}</Text>
                        <Text>User ID: {enrollment.id_user}</Text>
                        <Text>Description: {enrollment.description}</Text>
                        <Text>Registration Date: {new Date(enrollment.registration_date_time).toLocaleDateString()}</Text>
                        </View>
                    ))
                    ) : (
                    <Text style={styles.noEnrollmentsMessage}>No participants have enrolled for this event yet.</Text>
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
