import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import database from '@react-native-firebase/database'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Dashboard({ navigation }) {

    const [level, setLevel] = useState(0);
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const onValueChange = database()
            .ref(`/RealTimeLevel/WaterLevel_Inch`)
            .on('value', snapshot => {
                console.log('level in inch: ', snapshot.val());
                setLevel(snapshot.val())
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`/RealTimeLevel/WaterLevel_Inch`).off('value', onValueChange);
    }, [])

    return (
        <View
            style={styles.container}
        >
            <Header />

            <View
                style={styles.upper}
            >


                <View
                    style={{ width: '100%', alignItems: 'center' }}
                >



                    <AnimatedCircularProgress
                        size={200}
                        width={15}
                        fill={level}
                        tintColor="#3d5875"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#42C2FF" >
                        {

                            () => (


                                <Text
                                    style={{ fontSize: 16, fontWeight: '800' }}
                                >
                                    Current Level Status
                                </Text>
                            )

                        }



                    </AnimatedCircularProgress>






                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, alignItems: 'center' }}
                    >



                        {level > 30 ?
                            <View
                                style={{ height: height / 12, width: width / 6, backgroundColor: 'green', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                            >

                                <Text
                                    style={styles.text}
                                >
                                    Normal
                                </Text>

                            </View> :
                            <View
                                style={{ height: height / 12, width: width / 6, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                            >

                            </View>

                        }

                        {level > 20 && level <= 30 ?

                            <View
                                style={{ height: height / 12, width: width / 6, backgroundColor: 'yellow', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                            >

                                <Text
                                    style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}
                                >
                                    Moderate
                                </Text>

                            </View> :

                            <View
                                style={{ height: height / 12, width: width / 6, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                            >

                            </View>

                        }

                        {level > 12 && level <= 20 ?
                            <View
                                style={{ height: height / 12, width: width / 6, backgroundColor: 'orange', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                            >

                                <Text
                                    style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}
                                >
                                    High risk
                                </Text>

                            </View> :

                            <View
                                style={{ height: height / 12, width: width / 6, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                            >

                            </View>


                        }


                        {level <= 12 ?

                            <View>
                                <View
                                    style={{ height: height / 12, width: width / 6, backgroundColor: 'red', borderRadius: 360, margin: 5, alignItems: 'center', justifyContent: 'center' }}
                                >

                                    <Text
                                        style={styles.text}
                                    >
                                        Danger
                                    </Text>



                                </View>

                                <Modal
                                    animationType="fade"
                                    transparent
                                    visible={modalOpen}
                                    hardwareAccelerated
                                    onRequestClose={() => {

                                        setModalOpen(!modalOpen);


                                    }}
                                >

                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Text style={styles.modalText}>Warning water level is high!</Text>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setModalOpen(!modalOpen)}
                                            >
                                                <Text style={styles.textStyle}>Hide Modal</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </Modal>
                            </View>
                            :

                            <View
                                style={{ height: height / 12, width: width / 6, backgroundColor: '#DFDFDE', borderRadius: 360, margin: 5 }}
                            >

                            </View>
                        }


                    </View>

                    <Text
                        style={{ fontSize: 30 }}
                    >

                        Live Status
                    </Text>


                </View>



            </View>

            <View
                style={styles.lower}
            >

                <Text
                    style={{ fontSize: 25, fontWeight: 'bold', color: '#ffffff', margin: 15 }}
                >
                    More Tools
                </Text>

                <View
                    style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                >

                    <View
                        style={{ flexDirection: 'row' }}
                    >


                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => navigation.navigate('Level')}
                        >
                            <Icon
                                name='water'
                                size={20}
                                color={'#ffffff'}
                            />
                            <Text
                                style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15 }}
                            >
                                Live Monitoring
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => navigation.navigate('Weath')}
                        >

                            <Icon
                                name='weather-cloudy'
                                size={20}
                                color={'#ffffff'}
                            />

                            <Text
                                style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 2 }}
                            >
                                Weather update
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    upper: {

        width: '100%',
        backgroundColor: '#ffffff',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'


    },

    lower: {

        width: '100%',
        backgroundColor: '#42C2FF',
        flex: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,

    },

    btn: {
        height: 100,
        width: 150,
        backgroundColor: '#FC5130',
        alignItems: 'center',
        margin: 8,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    text: {
        fontSize: 15,
        color: '#ffffff',
        fontWeight: 'bold'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

