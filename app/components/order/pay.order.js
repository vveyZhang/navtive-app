import React from 'react';

import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { Modal } from 'antd-mobile';

import select from '../../res/images/select.png';

import unSelect from '../../res/images/unselect.png';

import { uploadPic } from '../perfect/uploadPic';

import { request } from '../../utils/request';

import { getMultipleProps, getCurrentScreen, NavigationActions } from '../../utils/index';

import { connect } from 'react-redux';
import { tipFail } from '../../utils/tips'

class PayOrder extends React.PureComponent {
    state = {
        isBalance: true,
    }
    pay = () => {
        const balance = this.props.agent.agent.balance;
        const pay = this.props.navigation.state.params.pay
        if (this.state.isBalance) {
            balance > pay ? this.topay() : tipFail('支付失败-余额不足');
            return;
        }
        uploadPic(this.payAccount, {
            width: 400,
            height: 300,
        })
    }
    payAccount = (url) => {
        this.topay(url)
    }
    topay = (url = "") => {
        const params = {
            order_id: this.props.navigation.state.params.order_id,
            voucher: url,
            pay_mode: this.state.isBalance ? 2 : 1,
        }
        this.props.dispatch({ type: 'payOrder/toPay', params })
    }
    render() {

        const { isBalance } = this.state;

        const pay = this.props.navigation.state.params.pay;

        const { isLeave } = this.props.payOrder;
        const { dispatch } = this.props;
        return (
            <View style={{ backgroundColor: '#f3f5f9', height: '100%' }}>
                <Modal
                    visible={isLeave}
                    transparent={true}
                    maskClosable={true}
                    onClose={() => dispatch({ type: 'payOrder/isLeave', isLeave: false })}
                    footer={[{ text: '关闭', onPress: () => { dispatch({ type: 'payOrder/isLeave', isLeave: false }) } },
                    { text: '确认', onPress: () => { dispatch({ type: 'payOrder/sureLeave' }) } }
                    ]}
                >
                    <View><Text style={{ color: "#222", textAlign: 'center' }}>提示——是否取消付款？</Text></View>
                </Modal>
                <View style={{ padding: 20, marginBottom: 10 }}>
                    <Text style={styles.tips} numberOfLines={2} >支付金额为：<Text style={{ color: '#d23431' }}>￥ {pay / 100}</Text></Text>
                    <Text style={styles.tips}>您可以选择以下方式支付：</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => this.setState({
                    isBalance: true
                })}>
                    <View style={styles.payBtn}>
                        <Image source={require('../../res/images/pay-icon1.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.payName}>余额支付</Text>
                        <Image source={isBalance ? select : unSelect} style={{ width: 16, height: 16 }} />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.setState({
                    isBalance: false
                })}>
                    <View style={styles.payBtn}>
                        <Image source={require('../../res/images/pay-icon2.png')} style={{ width: 26, height: 26, }} />
                        <Text style={styles.payName}>转账支付</Text>
                        <Image source={isBalance ? unSelect : select} style={{ width: 16, height: 16 }} />
                    </View>
                </TouchableWithoutFeedback>
                {
                    isBalance ?
                        null :
                        <View>
                            <Text style={styles.tips}>请转款到银行卡-<Text style={{ color: "#222" }}>22222222</Text></Text>
                            <Text style={styles.tips}>点击 “ <Text style={{ color: "#009fe8" }}>上传凭证</Text> ” 按钮上传转款凭证</Text>
                        </View>
                }

                <Text onPress={() => this.pay()} style={styles.btn}>
                    {isBalance ? '确认支付' : "上传凭证"}
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tips: {
        fontSize: 13,
        color: "#7b7d8b",
        textAlign: "center",
        lineHeight: 24,
    },
    payBtn: {
        flexDirection: 'row',
        marginHorizontal: 35,
        height: 46, marginBottom: 20,
        paddingLeft: 15, paddingRight: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5
    },
    payName: {
        marginLeft: 15,
        fontSize: 13,
        color: '#4a4a4a',
        flex: 1
    },
    btn: {
        fontSize: 13,
        color: '#fff',
        lineHeight: 13,
        padding: 12,
        backgroundColor: '#009fe8',
        marginTop: 20,
        marginHorizontal: 35,
        borderRadius: 5,
        textAlign: 'center'
    }
});
function stateToProps(state) {

    return {
        payOrder: state.payOrder,
        agent: state.agent
    }
}
export default connect(stateToProps)(PayOrder)
