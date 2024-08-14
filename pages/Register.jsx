import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import InputContainer from '../components/input-container';
import GreenButton from '../components/green-button';

export default function RegisterScreen({ navigation }) {
    const handleRegister = () => {
        navigation.navigate('Login');
        console.log('Register pressed');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Register</Text>
                <InputContainer label={'First name'} />
                <InputContainer label={'Last name'} />
                <InputContainer label={'Username'} />
                <InputContainer label={'Password'} />
                <GreenButton title={'Register'} onPress={handleRegister} />
                <View style={styles.footer}>
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
