import React from 'react';

import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'

import { Button } from 'antd-mobile';

import { uploadPic } from './uploadPic';


export const SecurityDeposit = (props) => {
    return <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 28, color: '#3a76d2', lineHeight: 40 }}>{props.deposit}</Text>
        <Text style={{ fontSize: 10, color: '#3a76d2' }}>保证你我，安全放心</Text>
        <Text style={{ fontSize: 14, color: '#030303', marginTop: 30, marginBottom: 30 }}>缴费方式：转账支付宝——<Text style={{ color: '#3a76d2' }}>{props.bank.backcard}</Text></Text>
        <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: props.info.deposit_voucher }}
        />
        <Button style={styles.btn} onClick={() => uploadPic(props.getDeposit)} >
            <Text style={{ fontSize: 12, color: '#fff' }}>{props.info.deposit_voucher ? '更换凭证' : "上传凭证"}</Text>
        </Button>
    </View>
}
const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        backgroundColor: '#3a76d2',
        height: 30,
        borderRadius: 4,
        width: '30%',
        marginTop: 40
    }
})