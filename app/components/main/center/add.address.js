import React, { Component } from 'react';
import { InputItem, List, Picker, TextareaItem, } from 'antd-mobile';
import { tipInfo } from '../../../utils/tips'
import { View, Text, TouchableOpacity } from 'react-native'
import Back from '../../../router/back'
import { createForm } from 'rc-form';
import { request } from '../../../utils/request'
import { connect } from 'react-redux';
import areaArray from '../../../area/index'

const is_default = [{
    label: '否',
    value: '0',
},
{
    label: '是',
    value: '1',
}];
import { styles } from './style'

class AddAddress extends Component {

    addAddress = () => {
        const { getFieldsError, getFieldsValue, validateFields, isFieldsValidating } = this.props.form;
        if (isFieldsValidating(['name', 'phone', 'address', 'is_default', 'street', 'postcode'])) return tipInfo('请完善地址信息')
        for (let i in getFieldsError()) {
            if (getFieldsError()[i]) return tipInfo(getFieldsError()[i])
        }
        const data = getFieldsValue()
        const address = {
            name: data.name,
            phone: data.phone,
            province: data.address[0],
            city: data.address[1],
            district: data.address[2],
            street: data.street,
            postcode: data.postcode,
            is_default: data.is_default[0]
        }

        this.props.dispatch({ type: 'agent/addAddress', address: address });

    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <View>
                <List style={{ backgroundColor: '#fff' }}>
                    <InputItem

                        {...getFieldProps('name', {
                            rules: [{
                                required: true, message: '姓名不能为空',
                            }]
                        }) }
                        clear
                        placeholder="输入姓名"
                    >姓名</InputItem>
                    <InputItem
                        {...getFieldProps('phone', {
                            rules: [{
                                required: true, message: '联系电话不能为空',
                            }]
                        }) }
                        clear
                        type='number'
                        placeholder="联系电话"
                    >电话</InputItem>
                    <Picker data={areaArray} {...getFieldProps('address', {
                        rules: [{
                            required: true, message: '请选择地址',
                        }]
                    }) }>
                        <List.Item arrow="horizontal">地址</List.Item>
                    </Picker>

                    <Picker data={is_default} cols={1} {...getFieldProps('is_default', {
                        initialValue: ['0'],
                    }) }>
                        <List.Item arrow="horizontal">选为默认地址</List.Item>
                    </Picker>

                    <InputItem
                        {...getFieldProps('street', {
                            rules: [{
                                required: true, message: '请输入地址详情',
                            }]
                        }
                        ) }
                        clear
                        placeholder="输入详细地址"

                    >地址详情</InputItem>
                    <InputItem
                        {...getFieldProps('postcode', {
                            rules: [{
                                required: true, message: '邮编',
                            }]
                        }) }
                        clear
                        placeholder="邮编号"
                    >邮编</InputItem>

                </List>
                <TouchableOpacity style={styles.btn} onPressIn={() => this.addAddress()}>
                    <Text style={{ color: '#fff', fontSize: 14, padding: 0 }}> 确认添加</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect()(createForm()(AddAddress))