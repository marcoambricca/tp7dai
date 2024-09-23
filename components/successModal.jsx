import React from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';

const SuccessModal = ({ visible, onClose }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Evento creado!</Text>
                    <Text style={styles.message}>Tu evento ha sido creado con exito.</Text>
                    <Button title="OK" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default SuccessModal;
