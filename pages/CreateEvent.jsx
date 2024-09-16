import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Form from '../components/event-form.jsx';

export default function CreateEventScreen({ navigation }){
    return(
        <View>
            <Form />
        </View>
    )
}