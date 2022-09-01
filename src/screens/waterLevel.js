import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database'
import Wave from 'react-native-waveview';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function WaterLevel() {

    const [height, setHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const onValueChange = database()
            .ref(`/RealTimeLevel/WaterLevel_Inch`)
            .on('value', snapshot => {
                console.log('level in inch: ', snapshot.val());
                setHeight(snapshot.val().toFixed(2))
                setIsLoading(false)

            });

        // Stop listening for updates when no longer required
        return () => database().ref(`/RealTimeLevel/WaterLevel_Inch`).off('value', onValueChange);
    }, [])

    if (isLoading) {
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
            >
                <ActivityIndicator size="large" color="#FBBE36" />
            </View>
        )
    }

    return (
        <View
            style={styles.container}
        >

            <View
                style={{ flex: 1, backgroundColor: '#ffffff' }}
            >

                <Text
                    style={{ fontSize: 25, fontWeight: '800', alignSelf: 'center', marginBottom: '10%' }}
                >
                    Current Water Level
                </Text>

                <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, }}
                >
                    <View
                        style={{ borderBottomWidth: 0.5, marginRight: '10%' }}
                    >



                        <Text
                            style={{ fontSize: 20, fontWeight: 'bold' }}
                        >
                            {height} In
                        </Text>




                    </View>

                    <View
                        style={{ borderBottomWidth: 0.5, marginLeft: 5 }}
                    >
                        <Text
                            style={{ fontSize: 20, fontWeight: 'bold' }}
                        >
                            {height * 2.54.toFixed(2)} Cm
                        </Text>

                    </View>
                </View>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >

                    {height > 30 ?
                        <View
                            style={{ height: 70, width: 70, backgroundColor: 'green', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                        >

                            <Text
                                style={styles.text}
                            >
                                Normal
                            </Text>

                        </View> :
                        <View
                            style={{ height: 70, width: 70, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                        >

                        </View>

                    }

                    {height > 20 && height <= 30 ?

                        <View
                            style={{ height: 70, width: 70, backgroundColor: 'yellow', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                        >

                            <Text
                                style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}
                            >
                                Moderate
                            </Text>

                        </View> :

                        <View
                            style={{ height: 70, width: 70, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                        >

                        </View>

                    }

                    {height > 12 && height <= 20 ?
                        <View
                            style={{ height: 70, width: 70, backgroundColor: 'orange', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                        >

                            <Text
                                style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}
                            >
                                High risk
                            </Text>

                        </View> :

                        <View
                            style={{ height: 70, width: 70, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                        >

                        </View>


                    }


                    {height <= 12 ?

                        <View>
                            <View
                                style={{ height: 70, width: 70, backgroundColor: 'red', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                            >

                                <Text
                                    style={styles.text}
                                >
                                    Danger
                                </Text>



                            </View>


                        </View>
                        :

                        <View
                            style={{ height: 70, width: 70, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                        >

                        </View>
                    }

                </View>



            </View>

            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}
            >

                {height >= 31 ?
                    <Wave
                        style={styles.waveBall}
                        H={50}
                        waveParams={[
                            { A: 15, T: 480, fill: '#62c2ff' },
                            { A: 20, T: 450, fill: '#0087dc' },
                            { A: 25, T: 450, fill: '#1aa7ff' },
                        ]}
                        animated={true}

                    /> : null

                }

                {height > 20 && height <= 30 ?
                    <Wave
                        style={styles.waveBall}
                        H={90}
                        waveParams={[
                            { A: 15, T: 480, fill: '#62c2ff' },
                            { A: 20, T: 450, fill: '#0087dc' },
                            { A: 25, T: 450, fill: '#1aa7ff' },
                        ]}
                        animated={true}
                    /> : null

                }

                {height > 12 && height <= 20 ?
                    <Wave
                        style={styles.waveBall}
                        H={140}
                        waveParams={[
                            { A: 15, T: 480, fill: '#62c2ff' },
                            { A: 20, T: 450, fill: '#0087dc' },
                            { A: 25, T: 450, fill: '#1aa7ff' },
                        ]}
                        animated={true}
                    /> : null

                }

                {height < 12 ?
                    <Wave
                        style={styles.waveBall}
                        H={210}
                        waveParams={[
                            { A: 15, T: 480, fill: '#62c2ff' },
                            { A: 20, T: 450, fill: '#0087dc' },
                            { A: 25, T: 450, fill: '#1aa7ff' },
                        ]}
                        animated={true}
                    /> : null

                }
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#ffffff'
    },
    wave: {
        width: '100%',
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    waveBall: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 50,
        overflow: 'hidden',
        height: '100%',
        borderWidth: 0.5

    },

    text: {
        fontSize: 15,
        color: '#ffffff',
        fontWeight: 'bold'
    },
});