import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import EventCard from './event-card.jsx';
import { getData } from '../local/data-service.js';
import { apiPost } from '../api/api-controller.js';

export default function EventList({ events, navigation }) {
    const handleEventPress = (eventId, event) => {
        navigation.navigate('EventDetail', { eventId, event });
    };

    const handleEnrollment = async (eventId) => {
        const user = await getData('user');
        const result = await apiPost(`event/${eventId}/enrollment`, null, user.token);
        // Handle enrollment result if needed
    };

    return (
        <ScrollView style={styles.container}>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <EventCard 
                        key={index} 
                        event={event} 
                        handleEnrollment={() => handleEnrollment(event.id)}
                        onPress={() => handleEventPress(event.id, event)} // Pass event object
                    />
                ))
            ) : (
                <Text>No events available</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
});