import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function Header({ rightPressed }) {

    

    const TitleView = () => (

        <View style={styles.titleView}>

            <Text
                style={{
                    textAlign: 'left',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 5,
                    color: '#ffffff'
                   
                }}>

                Dashboard

            </Text>

        </View>

    )




    const RightView = () => (

        <View
            style={styles.rightView}
        >
            <TouchableOpacity
                onPress={rightPressed}
            >



            </TouchableOpacity>
        </View>
    )

    return (


        <View
            style={[styles.rowView, styles.headerDimensions]}
        >

          
            <TitleView />
            <RightView />

        </View>




    )
}

const styles = StyleSheet.create({

    headerDimensions: {
        width: '100%',
        height: '7%',
        backgroundColor: '#42C2FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    leftView: {
        marginLeft: 10,

    },

    titleView: {
        flex: 1,
    },

    rightView: {
        justifyContent: 'flex-start',
        marginRight: 10
    },

    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    }

})