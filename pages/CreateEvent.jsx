import React from 'react';
import { View } from 'react-native';
import Form from '../components/event-form.jsx';
import Header from '../components/header.jsx';

export default function CreateEventScreen({ navigation }){
    return(
        <View>
            <Header navigation={navigation} title={'Creación de evento'}/>
            <Form navigation={navigation} />
        </View>
    )
}