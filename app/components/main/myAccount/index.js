import React from 'react';

import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { container, NavigationActions, getProps } from '../../../utils/index'

import { connect } from 'react-redux';

import addIcon from '../../../res/images/add-ic.png'

import accountIcon1 from '../../../res/images/pay-ic-1.png'

import accountIcon2 from '../../../res/images/pay-ic-2.png'

import { formatEmail, formatBack, formatMobile } from '../../../utils/format'

class MyAccount extends React.PureComponent {
    componentWillMount() {
        const { dispatch, account } = this.props;
        dispatch({ type: 'account/getAccount' })
    }
    render() {
        const { dispatch, account } = this.props;
        let alipay_id = account.alipay.alipay_id && account.alipay.alipay_id.indexOf('@') != -1 ? formatEmail(account.alipay.alipay_id) : formatMobile(account.alipay.alipay_id)
        return (<View style={[container, { paddingHorizontal: 20, }]}>
            <Text style={styles.tip}>收款账号将用于提现，请确保准确信息</Text>
            <TouchableWithoutFeedback onPress={() => {

                account.alipay.alipay_id ? dispatch(NavigationActions.navigate({ routeName: 'editorAlipay' })) : dispatch(NavigationActions.navigate({ routeName: 'addAlipay' }))
            }
            }>
                <View style={styles.accountBtn}>
                    <Image source={accountIcon2} style={{ width: 24, height: 24 }} />
                    <Text style={styles.title} >{account.alipay.alipay_id ? "支付宝" : "添加支付宝账号"}</Text>
                    <Text>{account.alipay.alipay_id ? alipay_id : null}</Text>
                    {account.alipay.alipay_id ? null : <Image source={addIcon} style={{ width: 16, height: 16, }} />}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => account.back.bank_card_id ? dispatch(NavigationActions.navigate({ routeName: 'editorAccount' })) : dispatch(NavigationActions.navigate({ routeName: 'addBack' }))}
            >
                <View style={styles.accountBtn}>
                    <Image source={accountIcon1} style={{ width: 24, height: 24 }} />
                    <Text style={styles.title} >{account.back.bank_card_id ? "银行卡" : "添加银行卡号"}</Text>
                    <Text>{account.back.bank_card_id ? formatBack(account.back.bank_card_id) : null}</Text>
                    {account.back.bank_card_id ? null : <Image source={addIcon} style={{ width: 16, height: 16, }} />}
                </View>
            </TouchableWithoutFeedback>
        </View>)
    }
}

export default connect(getProps('account'))(MyAccount)

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
    }

})