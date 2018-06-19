import React from 'react';

import { View, Text } from 'react-native';

import { container, getProps } from '../../../utils/index';

import { List, InputItem, } from 'antd-mobile';

import { tipInfo } from '../../../utils/tips'

import { createForm } from 'rc-form';

import { btnStyles } from './btn.styles'

import { connect } from 'react-redux'

const EditorAlipay = (props) => {
    const { getFieldsValue, getFieldProps, getFieldError } = props.form;
    const { dispatch } = props;
    const { id, alipay_id, name } = props.account.alipay;
    const addAccount = () => {
        const values = getFieldsValue()
        for (let item in values) {
            if (!values[item]) {
                tipInfo('请完善账号信息');
                return
            }
        }
        const account = {
            receipt_id: id,
            alipay_id: '',
            name: '',
            ...values
        }
        dispatch({ type: 'account/editorAccount',account });
    }

    return (
        <View style={container}>
            <List>
                <InputItem
                    {...getFieldProps('name', {
                        initialValue:name,
                        rules: [{
                            required: true, message: '姓名不能为空',
                        }]
                    }) }
                >姓名</InputItem>
                <InputItem
                    {...getFieldProps('alipay_id', {
                        initialValue:alipay_id,
                        rules: [{
                            required: true, message: '电话号码不能为空',
                        }]
                    }) }
                >支付宝号</InputItem>
            </List>
            <View style={btnStyles.applyBtnContainer} >
                <Text onPress={() => addAccount()} style={btnStyles.applyBtn} >确认修改</Text>
            </View>
        </View >
    )
}

export default connect(getProps('account'))(createForm()(EditorAlipay))
