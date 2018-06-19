import React from 'react';

import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';

import { Button, Modal } from 'antd-mobile'

import { container, getProps,NavigationActions } from '../../../utils/index'

import select from '../../../res/images/select.png';

import unselect from '../../../res/images/unselect.png';

import { connect } from 'react-redux'

import { tipInfo, tipSuccess } from '../../../utils/tips'

import { request } from '../../../utils/request'


const prompt = Modal.prompt;

class ReturnDeposit extends React.PureComponent {
    state = {
        type: null
    }
    choiceType = (type) => {
        this.setState({
            type: type
        })
    }
    componentWillMount() {
        this.props.dispatch({
            type: 'payments/queryPayments', params: {
                page: 1,
                limit: 0
            }
        })
    }
    submit = () => {
        if (this.state.type == null) return tipInfo('请选择提现方式')
        prompt(
            '确认提现？',
            '请输入密码',
            [
                { text: '取消' },
                {
                    text: '提交', onPress: password => {

                        this.goWithdrawals(password)

                    }
                },
            ],
            'secure-text',
        )
    }
    goWithdrawals = (password) => {
        const payments = this.props.payments;
        request({
            url:"/refund/deposit",
            data:{
                receipt_id:payments[this.state.type].id,
                password: password
            }
        }).then(data=>{
            console.log(data)
            if(data.error.ErrorCode!=0) return tipFail(data.error.ErrorMsg)
            tipSuccess('操作成功');
            this.props.dispatch(NavigationActions.back())
        })
    
    }
    render() {
        const { type } = this.state;
        return (<View style={[container, { paddingHorizontal: 20, }]}>
            <Text style={styles.tip}>申请退还保证金后，工作人员将尽快审核转账</Text>
            <Text style={styles.tip}><Text style={{ color: '#3a76d2' }}>保证金  ￥{this.props.navigation.state.params.number}</Text></Text>
            {/* <TouchableWithoutFeedback onPress={() => this.choiceType(1)} >
                <View style={styles.accountBtn}>
                    <Image source={require('../../../res/images/pay-ic-3.png')} style={{ width: 24, height: 24 }} />
                    <Text style={styles.title} >转到微信账号</Text>
                    <Text></Text>
                    <Image source={type == 1 ? select : unselect} style={{ width: 16, height: 16, }} />
                </View>
            </TouchableWithoutFeedback> */}
            <TouchableWithoutFeedback
                onPress={() => this.choiceType('alipay')}
            >
                <View style={styles.accountBtn}>
                    <Image source={require('../../../res/images/pay-ic-2.png')} style={{ width: 24, height: 24 }} />
                    <Text style={styles.title} >转到支付宝账号</Text>
                    <Text></Text>
                    <Image source={type == 'alipay' ? select : unselect} style={{ width: 16, height: 16, }} />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => this.choiceType('back')}
            >
                <View style={styles.accountBtn}>
                    <Image source={require('../../../res/images/pay-ic-1.png')} style={{ width: 24, height: 24 }} />
                    <Text style={styles.title} >转到银行卡</Text>
                    <Text></Text>
                    <Image source={type == 'back' ? select : unselect} style={{ width: 16, height: 16, }} />
                </View>
            </TouchableWithoutFeedback>

            <Button style={{ margin: 40 }} onClick={() => this.submit()} type="primary">确认退还</Button>


        </View>)
    }

}
const styles = StyleSheet.create({
    tip: {
        fontSize: 13,
        color: '#7b7d8b',
        lineHeight: 20,
        marginVertical: 15,
        textAlign: "center",
        marginBottom: 25
    },
    title: {
        fontSize: 13,
        color: '#4a4a4a',
        flex: 1,
        marginLeft: 10
    },
    accountBtn: {
        height: 46,
        backgroundColor: "#ffffff",
        paddingLeft: 15,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 10
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: "#fff",
        paddingHorizontal: 10
    }

})
export default connect(getProps('payments'))(ReturnDeposit)