import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputContainer from './input-container.jsx';
import PickerComponent from './option-picker.jsx';
import { apiCall } from '../api/api-controller.js';
import { getData } from '../local/data-service.js';

export default function EditEventModal({ visible, onClose, event, onUpdateEvent }) {
    const [formState, setFormState] = useState(event);

    useEffect(() => {
        setFormState(event);
    }, [event]);

    const handleInputChange = (name, value) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: Number.isInteger(value) ? parseInt(value) : value,
        }));
    };

    const handleSubmit = () => {
        onUpdateEvent(formState);
    };

    return (
        <View style={visible ? styles.modal : styles.hidden}>
            <InputContainer
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
            />
            <InputContainer
                label="Description"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
            />
            {/* Agrega aquí los PickerComponents para categoría y ubicación */}
            <Button title="Actualizar" onPress={handleSubmit} />
            <Button title="Cancelar" onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        // Estilos para el modal
    },
    hidden: {
        display: 'none',
    },
});