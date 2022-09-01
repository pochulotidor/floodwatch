import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/dashboard';
import WaterLevel from '../screens/waterLevel';
import Weather from '../screens/weather';

export default function () {

    const Stack = createStackNavigator();

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName='Dash'
            >

                <Stack.Screen
                    options={{ headerShown: false }}
                    name='Dash'
                    component={Dashboard}
                />

                <Stack.Screen
                    name='Level'
                    component={WaterLevel}
                />

                <Stack.Screen
                    name='Weath'
                    component={Weather}
                />

            </Stack.Navigator>

        </NavigationContainer>
    )
}