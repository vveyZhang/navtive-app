import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { List, InputItem, WhiteSpace, WingBlank, Button, } from 'antd-mobile';
import { tipInfo, tipSuccess } from "../../../utils/tips"
import { createForm } from 'rc-form';
import { styles } from './style'
import { request } from '../../../utils/request';
import { NavigationActions } from '../../../utils/index'
import storage from '../../../utils/storage';
import { connect } from 'react-redux'
const ModifyPassword = (props) => {

    const { getFieldsError, getFieldsValue, getFieldValue, getFieldProps } = props.form;
    const { dispatch } = props;
    const upDatePassword = () => {
        for (let i in getFieldsError()) {
            if (getFieldsError()[i]) return tipInfo(getFieldsError()[i])
        }
        if (!getFieldValue('password') && !getFieldValue('passwordQr')) return tipInfo('请输入密码')
        if (getFieldValue('password') !== getFieldValue('passwordQr')) {

            return tipInfo('请输入两次相同密码')
        }
        request({
            url: '/update/password',
            data: {
                password: getFieldValue('password')
            }
        }).then(data => {
            if (data.error.ErrorCode != 0) return ;
            tipSuccess('更新成功')
            setTimeout(() => {
                storage.remove('user')
                dispatch(NavigationActions.navigate({ routeName: 'login' }))
            }, 500)
        })
    }
    return (
        <View style={{ height: '100%', backgroundColor: '#fff', paddingHorizontal: 15 }}>
            <WhiteSpace style={{ marginTop: 20 }} />
            <InputItem
                type='password'
                {...getFieldProps('password', {
                    rules: [{
                        required: true, message: '密码不能为空',
                    }]
                }) }
                clear
                placeholder="新密码(8-16位)"
            >新密码</InputItem>
            <InputItem
                type='password'
                {...getFieldProps('passwordQr', {
                    rules: [{
                        required: true, message: '密码不能为空',
                    }]
                }) }
                clear
                placeholder="再次输入新密码"
            >确认密码</InputItem>
            <WingBlank style={{ marginTop: 40, }}>
                <TouchableOpacity style={styles.btn} onPressIn={() => upDatePassword()}>
                    <Text style={{ color: '#fff', fontSize: 14, padding: 0 }}> 确认修改</Text>
                </TouchableOpacity>
            </WingBlank>
        </View>
    )
}

export default connect()(createForm()(ModifyPassword))