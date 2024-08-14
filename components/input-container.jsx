import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';

export default function InputContainer({ label }){
    return (
        <View style={styles.formInput}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput style={styles.inputField} keyboardType="default" />
        </View>
    )
}

const styles = StyleSheet.create({
    formInput: {
        flexDirection: column,
        alignItems: 'center',
        justifyContent: 'start',
    },
    inputLabel: {
        fontSize: 14
    },
    inputField: {
        paddingHorizontal: 5,
        paddingVertical: 12,
        verticalAlign: 'middle',
        borderRadius: 6,
        cursor: 'text'
    }
});