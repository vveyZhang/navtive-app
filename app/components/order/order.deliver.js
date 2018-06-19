import React from 'react';

import { View, Text } from 'react-native';

import { container, getProps } from '../../utils/index';

import { List, InputItem, } from 'antd-mobile';

import { tipFail } from '../../utils/tips'

import { createForm } from 'rc-form';

import { btnStyles } from '../main/myAccount/btn.styles'

import { connect } from 'react-redux'

const OrderDeliver = (props) => {
    const { getFieldsValue, getFieldProps, getFieldError } = props.form;
    const { dispatch } = props;
    const addAccount = () => {
        const order_id = props.navigation.state.params.order_id
        const values = getFieldsValue();
        for (let item in values) {
            if (!values[item]) {
                tipFail('请完善账号信息', 1);
                return
            }
        }
        const params = {
            order_id: order_id,
            ...values,
        }
        dispatch({ type: 'order/confirmDeliver', params });

    }

    return (
        <View style={container}>
            <List>
                <InputItem
                    {...getFieldProps('delivery', {
                        rules: [{
                            required: true, message: '快递公司不能为空',
                        }]
                    }) }
                >快递公司</InputItem>
                <InputItem
                    {...getFieldProps('express_id', {
                        rules: [{
                            required: true, message: '快递单号不能为空',
                        }]
                    }) }
                    type="number"
                >快递单号</InputItem>
            </List>
            <View style={btnStyles.applyBtnContainer} >
                <Text onPress={() => { addAccount() }} style={btnStyles.applyBtn} >确认收货</Text>
            </View>
        </View>
    )
}

export default connect(getProps('order'))(createForm()(OrderDeliver))
