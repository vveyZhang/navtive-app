import React from 'react';

import { View, Text } from 'react-native';

import { container, getProps } from '../../../utils/index';

import { tipInfo } from '../../../utils/tips'

import { List, InputItem } from 'antd-mobile';

import { createForm } from 'rc-form';

import { btnStyles } from './btn.styles'

import { connect } from 'react-redux'

const AddAlipay = (props) => {
    const { getFieldsValue, getFieldProps, getFieldError } = props.form;
    const { dispatch } = props;
    const addAccount = () => {
        const values = getFieldsValue()
        console.log(getFieldError('name'))
        for (let item in values) {
            if (!values[item]) {
                tipInfo('请完善账号信息');
                return
            }
        }
        const account = {
            receipt_type: '1',
            alipay_id: '',
            name: '',
            ...values
        }
        dispatch({ type: 'account/addAccount', account });

    }

    return (
        <View style={container}>
            <List>
                <InputItem
                    {...getFieldProps('name', {
                        rules: [{
                            required: true, message: '姓名不能为空',
                        }]
                    }) }
                >姓名</InputItem>
                <InputItem
                    {...getFieldProps('alipay_id', {
                        rules: [{
                            required: true, message: '电话号码不能为空',
                        }]
                    }) }
                >支付宝号</InputItem>
            </List>
            <View style={btnStyles.applyBtnContainer} >
                <Text onPress={() => addAccount()} style={btnStyles.applyBtn} >确认添加</Text>
            </View>
        </View>
    )
}

export default connect(getProps('account'))(createForm()(AddAlipay))
