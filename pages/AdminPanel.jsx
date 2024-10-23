import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
import { apiCall, apiPost } from '../api/api-controller.js'; // Adjust the import based on your API structure
import { getData } from '../local/data-service.js';

export default function AdminPanel({ navigation }) {
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const user = await getData('user');
            setCurrentUser(user);

            const result = await apiCall('event', [null, null, null, null], user.token);
            const filteredEvents = result.filter(event => event.creator_user.id === user.id);
            setEvents(filteredEvents);
        };
        fetchEvents();
    }, []);

    const fetchParticipants = async (eventId) => {
        const result = await apiCall(`event/${eventId}/enrollment`);
        setParticipants(result);
    };

    const handleDeleteEvent = async (eventId) => {
        const response = await apiPost(`event/${eventId}/delete`, {}, currentUser.token);
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
        setParticipants([]); // Clear participants when closing the modal
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
                    {participants.map(participant => (
                        <View key={participant.id} style={styles.participant}>
                            <Text>{participant.json_build_object.first_name} {participant.json_build_object.last_name}</Text>
                            <Text>Username: {participant.json_build_object.username}</Text>
                            <Text>Description: {participant.description}</Text>
                            <Text>Registration Date: {new Date(participant.registration_date_time).toLocaleDateString()}</Text>
                        </View>
                    ))}
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
