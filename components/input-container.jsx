import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function InputContainer({ label, onChange, name, value }) {
    return (
        <View style={styles.formInput}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.inputField} 
                keyboardType="default" 
                secureTextEntry={label === 'Password'} 
                value={value}
                onChangeText={(value) => onChange(name, value)} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formInput: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 5,
    },
    inputField: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        backgroundColor: '#fafafa',
        fontSize: 16,
    },
});
