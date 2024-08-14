import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import InputContainer from '../components/input-container';
import GreenButton from '../components/green-button';

export default function LoginScreen({ navigation }) {
    const handleLogin = () => {
        navigation.navigate('Home');
        console.log("Login button pressed");
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Sign in</Text>
                <InputContainer label={'Username'} />
                <InputContainer label={'Password'} />
                <GreenButton title={'Sign in'} onPress={handleLogin} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Forgot password?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.footerText}>Need an account? Sign up</Text>
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
