import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import EventCard from './event-card.jsx';

export default function EventList({ events, navigation }) {

    console.log('events received by list', events)
    const handleEventPress = (eventId) => {
        navigation.navigate('EventDetail', { eventId }); // Asegúrate de que 'EventDetail' sea el nombre correcto de la ruta
    };

    return (
        <ScrollView style={styles.container}>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <EventCard 
                        key={index} 
                        event={event} 
                        onPress={() => handleEventPress(event.id)} // Pasa el ID del evento a la función
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
