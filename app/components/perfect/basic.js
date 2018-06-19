import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Picker, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';

const sex = [{
    label: '女',
    value: '0',
},
{
    label: '男',
    value: '1',
}];
class Baisc extends Component {
    render() {
        const { getFieldProps } = this.props.form;
        const props=this.props.info;
        return (<List style={{ backgroundColor: '#fff' }}>
            <InputItem
                {...getFieldProps('name', {
                    initialValue: props.name,
                    rules: [{
                        required: true, message: '姓名不能为空',
                    }]
                }) }
                clear
                placeholder="输入姓名"


            >姓名</InputItem>
            <InputItem
                {...getFieldProps('age', {
                    initialValue: props.age,
                    rules: [{
                        required: true, message: '年龄不能为空',
                    }]
                }) }
                clear
                type='number'
                placeholder="输入年龄"


            >年龄</InputItem>
            <Picker data={sex} cols={1} {...getFieldProps('sex', {
                initialValue: props.sex,
                rules: [{
                    required: true, message: '请选择性别',
                }]
            }) }>
                <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            <InputItem
                {...getFieldProps('id_card', {
                    initialValue: props.id_card,
                    rules: [{
                        required: true, message: '身份证号不能为空',
                    }]
                }) }
                clear
                type='number'
                placeholder="输入身份证号"

            >身份证号</InputItem>
        </List>)
    }
}
export default createForm()(Baisc)