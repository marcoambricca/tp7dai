import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CreatedEventsList from '../components/created-events-list.jsx';
import ParticipantsList from '../components/participants-list.jsx';

export default function AdminScreen() {
    const [view, setView] = useState('events');

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <Button title="Eventos creados" onPress={() => setView('events')} />
                <Button title="Listado de participantes" onPress={() => setView('participants')} />
            </View>
            {view === 'events' && <CreatedEventsList />}
            {view === 'participants' && <ParticipantsList />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
});
