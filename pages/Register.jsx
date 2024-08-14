import React from 'react';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';

export default function RegisterScreen({ navigation }){
    return(
        <SafeAreaView style={styles.container}>
            <Text>Register</Text>
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