import React, { Component } from 'react';

import { View, Image, Text,TouchableOpacity } from 'react-native'
import { tipInfo, tipSuccess } from "../../../utils/tips"
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { styles } from './style'
import { request } from '../../../utils/request';
import { NavigationActions } from '../../../utils/index'
import storage from '../../../utils/storage';
import { connect } from 'react-redux'
class ModifyPhone extends Component {
    upTime(){
        if(this.state.time==0)return;
        this.setState({
            time:this.state.time-1
        })
    }
    clickVari=()=>{
        const {  getFieldValue } = this.props.form;
        let phone=getFieldValue('phone').replace(/\s/g,"");
        phone=phone.toString()
        console.log(phone.length)
        if(!phone||phone.length!=11) return tipInfo('输入正确的手机号')
        request({
            url:'/captcha',
            data:{
                phone:phone
            }
        }).then(data=>{
            if (data.error.ErrorCode != 0) return;
        });
    }
    updatePhone=()=>{
        const { getFieldsError,getFieldValue} = this.props.form;
        let phone=getFieldValue('phone').replace(/\s/g,"");
        phone=phone.toString()
        if(!phone||phone.length!=11) return tipInfo('输入正确的手机号')
        for (let i in getFieldsError()) {
            if (getFieldsError()[i]) return tipInfo(getFieldsError()[i])
        }
        if(!getFieldValue('code')) return tipInfo('验证码不能为空');
        request({
            url: '/update/phone',
            data: {
                phone: phone,
                code:getFieldValue('code')
            }
        }).then(data => {
            console.log(data)
            if (data.error.ErrorCode != 0) return ;
            tipSuccess('更新成功')
            setTimeout(() => {
                storage.remove('user')
                dispatch(NavigationActions.navigate({ routeName: 'login' }))
            }, 500)
        })
    }
    render() {
        const { getFieldsError, getFieldValue, getFieldProps } = this.props.form;
        return (
            <View style={{ height: '100%', backgroundColor: '#fff', paddingHorizontal: 15 }}>
                <WhiteSpace style={{ marginTop: 20 }} />
                <InputItem
                    type='phone'
                    {...getFieldProps('phone', {
                        rules: [{
                            required: true, message: '手机号不能为空',
                        }]
                    }) }
                    clear
                    placeholder="输入新手机号"
                >手机号</InputItem>
                <InputItem
                    {...getFieldProps('code', {
                        rules: [{
                            required: true, message: '验证码不能为空',
                        }]
                    }) }
                    clear
                    placeholder="输入验证码"
                    extra={<Text style={{color:'#3a76d2'}} onPress={()=>this.clickVari()}>获取验证码</Text>}
                >验证码</InputItem>
                <WingBlank style={{ marginTop: 40, }}>
                <TouchableOpacity style={styles.btn} onPressIn={() =>this.updatePhone()}>
                    <Text style={{ color: '#fff', fontSize: 14, padding: 0 }}> 确认修改</Text>
                </TouchableOpacity>
                </WingBlank>
            </View>
        )
    }
}

export default connect()(createForm()(ModifyPhone))