import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import InputContainer from '../components/input-container';
import Button from '../components/button';
import { apiPost } from '../api/api-controller.js';

export default function RegisterScreen({ navigation }) {
    const [formData, setFormData] = useState({first_name: '', last_name: '', username: '', password: ''});
    
    const handleInput = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async () => {
        const response = await apiPost('user/register', formData, null);
        if (response) {
            if (response === 'OK'){
                navigation.navigate('Login');
            }
            else{
                console.log(response.message)
            }
        }
        else{
            console.log('register error')
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Sign in</Text>
                <InputContainer label={'First name'} name={'first_name'} onChange={handleInput} value={formData.first_name}/>
                <InputContainer label={'Last name'} name={'last_name'} onChange={handleInput} value={formData.last_name}/>
                <InputContainer label={'Username'} name={'username'} onChange={handleInput} value={formData.username}/>
                <InputContainer label={'Password'} name={'password'} onChange={handleInput} value={formData.password} secureTextEntry={true}/>
                <Button title={'Register'} onPress={handleRegister} backgroundColor={'#28a745'} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Forgot password?</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerText}>Already have an account? Log in</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        width: '80%',
        maxWidth: 400,
        padding: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#0366d6',
        fontSize: 14,
        marginVertical: 5,
    }
});