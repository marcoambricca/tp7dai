import React from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';

export default function EventConfirmationModal({ visible, onClose, onConfirm, data }) {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Detalles del evento</Text>
                    {Object.entries(data).map(([key, value]) => (
                        <Text key={key} style={styles.detail}>
                            {`${key}: ${value}`}
                        </Text>
                    ))}
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onClose} />
                        <Button title="Confirmar" onPress={onConfirm} />
                    </View>
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
        marginBottom: 20,
    },
    detail: {
        fontSize: 16,
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});