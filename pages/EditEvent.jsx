import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputContainer from '../components/input-container.jsx';
import PickerComponent from '../components/option-picker.jsx';
import { apiCall, apiPut } from '../api/api-controller.js';
import { getData } from '../local/data-service.js';
import EventConfirmationModal from '../components/modal.jsx';
import SuccessModal from '../components/successModal.jsx';
import Header from '../components/header.jsx';

export default function EditEventScreen({ navigation, route }) {
    const { eventId } = route.params;
    const [formState, setFormState] = useState({
        id: eventId,
        name: '',
        description: '',
        id_event_category: '',
        id_event_location: '',
        start_date: '',
        duration_in_minutes: '',
        price: '',
        enabled_for_enrollment: 1,
        max_assistance: '',
    });

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    // Fetch event data for editing
    useEffect(() => {
        const fetchEventData = async () => {
            const user = await getData('user');
            setCurrentUser(user);

            // Fetch categories and locations as in the form
            const resultCat = await apiCall('event_category');
            const resultLoc = await apiCall('event_location', null, user.token);
            setCategories(resultCat);
            setLocations(resultLoc);

            // Fetch event details
            const eventDetails = await apiCall(`event/${eventId}`, null, user.token);
            setFormState({ ...eventDetails });  // Pre-fill form with event details
        };

        fetchEventData();
    }, [eventId]);

    const handleInputChange = (name, value) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: Number.isInteger(value) ? parseInt(value) : value,
        }));
    };

    const handleSubmit = () => {
        setModalVisible(true);
        console.log('form', formState);
    };

    const handleConfirm = async () => {
        const user = await getData('user');
        const response = await apiPut(`event`, formState.event, user.token);
        if (response.success) {
            setSuccessModalVisible(true);
        } else {
            alert('Error updating event');
        }
        setModalVisible(false);
    };

    const handleSuccessModalClose = () => {
        setSuccessModalVisible(false);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title={'Modificar evento'} />
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
            <PickerComponent
                label="Category"
                selectedValue={formState.id_event_category}
                onValueChange={(itemValue) => handleInputChange('id_event_category', itemValue)}
                options={categories}
            />
            <PickerComponent
                label="Location"
                selectedValue={formState.id_event_location}
                onValueChange={(itemValue) => handleInputChange('id_event_location', itemValue)}
                options={locations}
            />
            <InputContainer 
                label="Start date"
                name="start_date"
                value={formState.start_date}
                onChange={handleInputChange}
            />
            <InputContainer
                label="Duration (minutes)"
                name="duration_in_minutes"
                value={formState.duration_in_minutes}
                onChange={handleInputChange}
                keyboardType="numeric"
            />
            <InputContainer
                label="Price"
                name="price"
                value={formState.price}
                onChange={handleInputChange}
                keyboardType="numeric"
            />
            <InputContainer
                label="Max Assistance"
                name="max_assistance"
                value={formState.max_assistance}
                onChange={handleInputChange}
                keyboardType="numeric"
            />
            <Button title="Submit" onPress={handleSubmit} />

            <EventConfirmationModal 
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirm}
                data={formState}
            />

            <SuccessModal 
                visible={isSuccessModalVisible}
                onClose={handleSuccessModalClose}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});