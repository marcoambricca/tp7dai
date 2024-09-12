import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { apiCall } from '../api/api-controller.js';
import EventList from '../components/event-list.jsx';

export default function HomeScreen({ navigation }){
    const [arrayEvents, setArrayEvents] = useState([]);
    
    useEffect(() => {
        const fetchEvents = async () => {
            const events = await apiCall('event');
            if (events) {
                console.log('events fetched', events);
                setArrayEvents(events);
            }
        };
        fetchEvents();
    }, []);
    
    return(
        <SafeAreaView style={styles.container}>
            <EventList events={arrayEvents}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }
});