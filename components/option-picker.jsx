import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';

export default function PickerComponent({ label, selectedValue, onValueChange, options }) {
    return (
        <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>{label}</Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={onValueChange}
            >
                <Picker.Item label={`Select ${label}`} value="" />
                {options.map(option => (
                    <Picker.Item key={option.id} label={option.name} value={option.id} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        marginBottom: 15,
    },
    pickerLabel: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});
