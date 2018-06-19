
import React from 'react'
import { Back } from './back'
import { barHeight } from '../utils/index'
import { Text, View, TouchableOpacity, FlatList, Platform } from 'react-native';

export const navigationOptions = {
    headerStyle: {
        height:40+barHeight,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#f3f5f9',
        paddingTop:barHeight
    },
    gesturesEnabled: true,
    headerRight: <View style={{ height: 20, width: 100, }}></View>,
    headerLeft: <Back />,
    headerTitleStyle: {
        fontSize: 16,
        fontWeight: '300',
        alignSelf: 'center',
        color: '#030303',
    }
}