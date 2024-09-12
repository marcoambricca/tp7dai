import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import EventCard from './event-card.jsx';

export default function EventList({ events }) {
    console.log('Events received:', events);

    return (
        <ScrollView style={styles.container}>
            {events.length > 0 ? (
                events.map((event) => (
                    <EventCard key={event.id} event={event} />
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
