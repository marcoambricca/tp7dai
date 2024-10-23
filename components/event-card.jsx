import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GreenButton from './button';

export default function EventCard({ event, handleEnrollment, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{event.name}</Text>
            <Text style={styles.description}>{event.description}</Text>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Category:</Text>
                <Text>{event.event_category.name}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Location:</Text>
                <Text>{event.event_location.name}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Max Capacity:</Text>
                <Text>{event.max_assistance}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Province:</Text>
                <Text>{event.event_location.location.province.name}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Price:</Text>
                <Text>${event.price}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Start Date:</Text>
                <Text>{new Date(event.start_date).toLocaleDateString()}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Duration:</Text>
                <Text>{`${event.duration_in_minutes} minutes`}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Enrollment Status:</Text>
                <Text>{event.enabled_for_enrollment === "1" ? "Enabled" : "Disabled"}</Text>
            </View>

            {event.enabled_for_enrollment && (
                <View>
                    <GreenButton title="Inscribirse" onPress={handleEnrollment} />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
    }
});