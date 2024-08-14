import React from 'react';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';

export default function HomeScreen({ navigation }){
    return(
        <SafeAreaView style={styles.container}>
            <Text>Home</Text>
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