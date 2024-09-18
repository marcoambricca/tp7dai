import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerContainer({ label, onChange, name, value }) {
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(value || new Date());

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
        onChange(name, currentDate);
    };

    return (
        <View style={styles.formInput}>
            <Text style={styles.inputLabel}>{label}</Text>
            <Button title="Select Date" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
            <Text style={styles.selectedDate}>
                {date.toLocaleDateString()}
            </Text>
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
    selectedDate: {
        marginTop: 10,
        fontSize: 16,
        color: '#333333',
    },
});