import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { apiCall } from '../api/api-controller.js';
import EventList from '../components/event-list.jsx';
import Header from '../components/header.jsx';

export default function HomeScreen({ navigation }){
    const [arrayEvents, setArrayEvents] = useState([]);
    
    useEffect(() => {
        const fetchEvents = async () => {
            const result = await apiCall('event', [null, null, null, null], null);
            if (result) {
                setArrayEvents(result[0].json_agg);
            }
        };
        fetchEvents();
    }, []);
    
    return(
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
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