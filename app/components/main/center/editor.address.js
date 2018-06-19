import React, { Component } from 'react';
import { InputItem, List, Picker, TextareaItem, } from 'antd-mobile';
import { View, Text, TouchableOpacity } from 'react-native'
import Back from '../../../router/back'
import { createForm } from 'rc-form';
import { request } from '../../../utils/request'
import { connect } from 'react-redux';
import { getProps } from '../../../utils/index'
import { tipInfo } from '../../../utils/tips'
const is_default = [{
    label: '否',
    value: 0,
},
{
    label: '是',
    value: 1,
}];
import { styles } from './style'
import areaArray from '../../../area/index'

class EditorAddress extends Component {
    addAddress = () => {
        const { getFieldsError, getFieldsValue, validateFields } = this.props.form;
        for (let i in getFieldsError()) {
            if (getFieldsError()[i]) return tipInfo(getFieldsError()[i])
        }
        const { address } = this.props.agent;
        const addressItem = address[this.props.navigation.state.params.id]
        const data = getFieldsValue()
        const addressParams = {
            name: data.name,
            phone: data.phone,
            province: data.address[0],
            city: data.address[1],
            district: data.address[2],
            street: data.street,
            postcode: data.postcode,
            is_default: data.is_default[0],
            id: addressItem.id
        }
        this.props.dispatch({
            type: 'agent/editorAddress', address: addressParams,
        });

    }
    render() {
        const { getFieldProps } = this.props.form;
        const { address } = this.props.agent;
        const addressItem = address[this.props.navigation.state.params.id]

        return (
            <View>
                <List style={{ backgroundColor: '#fff' }}>
                    <InputItem
                        {...getFieldProps('name', {
                            initialValue: addressItem.name,
                            rules: [{
                                required: true, message: '姓名不能为空',
                            }]
                        }) }
                        clear
                        placeholder="输入姓名"
                    >姓名</InputItem>
                    <InputItem
                        {...getFieldProps('phone', {
                            initialValue: addressItem.phone,
                            rules: [{
                                required: true, message: '联系电话不能为空',
                            }]
                        }) }
                        clear
                        type='number'
                        placeholder="联系电话"
                    >电话</InputItem>
                    <Picker data={areaArray} {...getFieldProps('address', {
                        initialValue: [addressItem.province, addressItem.city, addressItem.district],
                        rules: [{
                            required: true, message: '请选择地址',
                        }]
                    }) }>
                        <List.Item arrow="horizontal">地址</List.Item>
                    </Picker>
                    <Picker data={is_default} cols={1} {...getFieldProps('is_default', {
                        initialValue: [addressItem.is_default ? 1 : 0],
                    }) }>
                        <List.Item arrow="horizontal">选为默认</List.Item>
                    </Picker>
                    <InputItem
                        {...getFieldProps('street', {
                            initialValue: addressItem.street,
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
                            initialValue: addressItem.postcode,
                            rules: [{
                                required: true, message: '邮编',
                            }]
                        }) }
                        clear
                        placeholder="邮编号"
                    >邮编</InputItem>
                </List>
                <TouchableOpacity style={styles.btn} onPressIn={() => this.addAddress()}>
                    <Text style={{ color: '#fff', fontSize: 14, padding: 0 }}> 确认修改</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect(getProps('agent'))(createForm()(EditorAddress))