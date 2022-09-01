import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getWeather, dailyForecast, showWeather, getLocation } from 'react-native-weather-api';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const WEATHER_API_KEY = "INPUT YOUR WEATHER API KEY HERE";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function Weather() {

    const [location, setLocation] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentWeatherDetails, setCurrentWeatherDetails] = useState(null);
    const [unitsSystem, setUnitsSystem] = useState('metric');
    const [temp, setTemp] = useState(0);

    /**  const handlePermission = async () => {
 
         let permissionCheck = '';
 
         if (Platform.OS === 'android') {
             permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
 
             if (
                 permissionCheck === RESULTS.BLOCKED ||
                 permissionCheck === RESULTS.DENIED
             ) {
                 const permissionRequest = await request(
                     PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                 );
                 permissionRequest === RESULTS.GRANTED
                     ? console.warn('Location permission granted.')
                     : console.warn('location permission denied.');
             }
         }
 
     };
 
     useEffect(() => {
         handlePermission()
     }, [])**/

    useEffect(() => { // 👈
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setLocation({ latitude, longitude })
                console.log(latitude, longitude)
            },
            error => {
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }, [])

    useEffect(() => {
        load();
    }, [unitsSystem]);


    async function load() {
        setCurrentWeatherDetails(null)
        setCurrentWeather(null)
        setErrorMessage(null)
        try {
            let permissionCheck = '';

            if (Platform.OS === 'android') {
                permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

                if (
                    permissionCheck === RESULTS.BLOCKED ||
                    permissionCheck === RESULTS.DENIED
                ) {
                    const permissionRequest = await request(
                        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    );
                    permissionRequest === RESULTS.GRANTED
                        ? console.warn('Location permission granted.')
                        : console.warn('location permission denied.');
                }

            }
            //const location = Geolocation.getCurrentPosition();


            //const { latitude, longitude } = location.coords;
            const weatherUrl = `${BASE_WEATHER_URL}lat=${location.latitude}&lon=${location.longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
            const response = await fetch(weatherUrl)
            const result = await response.json()


            if (response.ok) {
                setCurrentWeather(result.main.temp)
                setCurrentWeatherDetails(result)
            }
            else {
                setErrorMessage(result.message)
            }

        } catch (error) {
            setErrorMessage(error.message)
        }


    }

    if (currentWeatherDetails) {

        return (
            <View>
                <Text>
                    {currentWeather} {currentWeatherDetails}
                </Text>
            </View>
        );

    }

    else if (errorMessage) {

        return (

            <View>
                <Text>
                    {errorMessage}
                </Text>
            </View>

        )

    }
    else {
        return (

            <View>
                <ActivityIndicator size="large" color={'red'} />
            </View>

        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})
