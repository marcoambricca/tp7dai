import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import apiCall from '../api/user-controller.js';
import EventList from '../components/event-list.jsx';

export default function HomeScreen({ navigation }){
    const [arrayEvents, setArrayEvents] = useState([]);
    
    useEffect(() => {
        let arr = apiCall('event');
        setArrayEvents(arr);
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