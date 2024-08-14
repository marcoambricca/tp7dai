import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import InputContainer from '../components/input-container';

export default function LoginScreen({ navigation }){
    return(
        <SafeAreaView style={styles.container}>
            <InputContainer label={'Username'} />
            <InputContainer label={'Password'} />
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