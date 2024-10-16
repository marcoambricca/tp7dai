import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { apiCall } from '../api/api-controller';

export default function ParticipantsList({ eventId }) {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {
        try {
            const result = await apiCall(`event/${eventId}/participants`);
            setParticipants(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView>
            {participants.length > 0 ? (
                participants.map((participant) => (
                    <View key={participant.id} style={styles.participantCard}>
                        <Text>{participant.name}</Text>
                        <Text>{participant.email}</Text>
                        <Text>Asistió: {participant.attended ? 'Sí' : 'No'}</Text>
                    </View>
                ))
            ) : (
                <Text>No hay participantes para este evento.</Text>
            )}
        </ScrollView>
    );
}

const styles = {
    participantCard: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
};
