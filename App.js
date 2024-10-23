import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/Login';
import HomeScreen from './pages/Home';
import RegisterScreen from './pages/Register';
import CreateEventScreen from './pages/CreateEvent';
import AdminPanel from './pages/AdminPanel';
import EventDetail from './pages/EventDetail/[id].jsx';
import EditEventScreen from './pages/EditEvent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetail}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}