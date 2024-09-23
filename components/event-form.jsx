import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputContainer from './input-container.jsx';
import PickerComponent from './option-picker.jsx';
import { apiCall, apiPost } from '../api/api-controller.js';
import { getData } from '../local/data-service.js';
import EventConfirmationModal from './modal.jsx';
import SuccessModal from './successModal.jsx';

export default function Form({ navigation }) {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        id_event_category: '',
        id_event_location: '',
        start_date: '',
        duration_in_minutes: '',
        price: '',
        enabled_for_enrollment: 1,
        max_assistance: '',
        id_creator_user: ''
    });

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let resultCat;
            let resultLoc;
            const user = await getData('user');
            if (user){
                console.log('user', user);
                setCurrentUser(user);
                setFormState(prevState => ({
                    ...prevState,
                    ['id_creator_user']: user.id,
                }));
            }
            
            try {
                resultCat = await apiCall('event_category');
                resultLoc = await apiCall('event_location', null, user.token);
            } catch (e){
                console.log(e);
            }

            if (resultCat){
                setCategories(resultCat);
            }
            if (resultLoc){
                setLocations(resultLoc);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (name, value) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: Number.isInteger(value) ? parseInt(value) : value,
        }));
    };

    const handleCategoryChange = (itemValue) => {
        handleInputChange('id_event_category', itemValue);
    };

    const handleLocationChange = (itemValue) => {
        handleInputChange('id_event_location', itemValue);
    };

    const handleSubmit = () => {
        setModalVisible(true);
    };

    const handleConfirm = async () => {
        const user = await getData('user');
        const response = await apiPost('event', formState, user.token);
        console.log(response);
        setModalVisible(false);
        setSuccessModalVisible(true);
    };

    const handleSuccessModalClose = () => {
        setSuccessModalVisible(false);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
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
                onValueChange={handleCategoryChange}
                options={categories}
            />
            <PickerComponent
                label="Location"
                selectedValue={formState.id_event_location}
                onValueChange={handleLocationChange}
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
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});