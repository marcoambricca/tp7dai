import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Modal, View, Button } from 'react-native';
import EventCard from './event-card.jsx';
import { getData } from '../local/data-service.js';
import { apiPost } from '../api/api-controller.js';

export default function EventList({ events, navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleEventPress = (eventId, event) => {
        navigation.navigate('EventDetail', { eventId, event });
    };

    const handleEnrollment = async (eventId) => {
        try {
            const user = await getData('user');
            const result = await apiPost(`event/${eventId}/enrollment`, null, user.token);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setIsModalVisible(true);
            } else {
                setIsModalVisible(true);
            }
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <EventCard 
                        key={index} 
                        event={event} 
                        handleEnrollment={() => handleEnrollment(event.id)}
                        onPress={() => handleEventPress(event.id, event)}
                    />
                ))
            ) : (
                <Text>No hay eventos disponibles</Text>
            )}

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>El usuario ya esta inscripto a este evento</Text>
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});
