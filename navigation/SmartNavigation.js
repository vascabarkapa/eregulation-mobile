import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/Dashboard';
import Temperature from '../screens/Temperature';
import Humidity from '../screens/Humidity';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

export default function SmartNavigation() {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Temperature" component={Temperature} />
            <Stack.Screen name="Humidity" component={Humidity} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
