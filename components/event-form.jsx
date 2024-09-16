import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputContainer from './input-container.jsx';
import PickerComponent from './option-picker.jsx';
import { apiCall } from '../api/api-controller.js';
import { getData } from '../local/data-service.js';

export default function Form() {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        id_event_category: '',
        id_event_location: '',
        start_date: '',
        duration_in_minutes: '',
        price: '',
        enabled_for_enrollment: false,
        max_assistance: '',
        id_creator_user: '',
        event_location: {},
        tags: [],
        creator_user: {},
        event_category: {},
    });

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let resultCat;
            let resultLoc;
            const user = await getData('user');

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
        }
        fetchData();
    }, [])

    const handleInputChange = (name, value) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCategoryChange = (itemValue) => {
        handleInputChange('id_event_category', itemValue);
    };

    const handleLocationChange = (itemValue) => {
        handleInputChange('id_event_location', itemValue);
    };

    const handleSubmit = () => {
        console.log(formState);
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
                label="Start Date"
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
