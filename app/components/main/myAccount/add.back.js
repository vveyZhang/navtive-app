import React from 'react';

import { View, Text } from 'react-native';

import { container, getProps } from '../../../utils/index';

import { List, InputItem } from 'antd-mobile';

import { tipInfo } from '../../../utils/tips'

import { createForm } from 'rc-form';

import { btnStyles } from './btn.styles'

import { connect } from 'react-redux'

const AddBack = (props) => {
    const { getFieldsValue, getFieldProps, getFieldError } = props.form;
    const { dispatch } = props;
    const addAccount = () => {
        const values = getFieldsValue()
        for (let item in values) {
            if (!values[item]) {
                tipInfo('请完善账号信息');
                return
            }
        }
        const bank_card_id= values.bank_card_id.replace(/\s/g, '');
        if(bank_card_id.length!=16)return  tipInfo('请输入正确卡号');
        const account = {
            receipt_type: '2',
            ...values,
            bank_card_id:bank_card_id
        }
        dispatch({type:'account/addAccount',account});

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
                    {...getFieldProps('bank_card_id', {
                        rules: [{
                            required: true, message: '银行卡不能为空',
                        }]
                    }) }
                    type="bankCard"
                >银行卡号</InputItem>
                <InputItem
                    {...getFieldProps('bank_card_name', {
                        rules: [{
                            required: true, message: '开户行地址不能为空',
                        }]
                    }) }
                   
                >开户地址</InputItem>
            </List>
            <View style={btnStyles.applyBtnContainer} >
                <Text onPress={() => addAccount()} style={btnStyles.applyBtn} >确认添加</Text>
            </View>
        </View>
    )
}

export default connect(getProps('account'))(createForm()(AddBack))
