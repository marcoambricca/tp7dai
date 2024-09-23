import React from 'react';
import { View } from 'react-native';
import Form from '../components/event-form.jsx';

export default function CreateEventScreen({ navigation }){
    return(
        <View>
            <Form navigation={navigation} />
        </View>
    )
}