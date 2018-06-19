import React from 'react';

import { View, Text, Image, StyleSheet, Linking } from 'react-native';

import { connect } from 'react-redux';

import { NavigationActions, telPhone ,container} from '../utils/index'

import { Button } from 'antd-mobile';

export default class Auditing extends React.Component {
    render() {
        return <View style={container}>
            <View style={{ marginVertical: 30, justifyContent: 'center', alignItems: 'center' }} ><Image source={require('../res/images/logo-512.png')} style={{ width: 150, height: 150 }} /></View>
            <Text style={{ fontSize: 20, textAlign: 'center', color: '#333', marginBottom: 10, marginTop: 20 }}>审核中</Text>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#4b4e53' }}>请耐心等待3～5个工作日，如需帮助请联系客服！</Text>
            <View style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
                <Button style={styles.btn} onClick={() => { Linking.openURL(`tel:${telPhone}`) }} >
                    <Text style={{ fontSize: 14, color: '#fff' }}>联系客服</Text>
                </Button>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3a76d2',
        height: 40,
        borderRadius: 4,
        marginTop: 60
    }
})