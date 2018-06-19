import React from 'react'

import { View, FlatList, Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'

import { container, format, barHeight, NavigationActions, getProps } from '../../../utils/index'

import { request } from '../../../utils/request'

import { LoadingFooter } from '../../loading.footer';

import { connect } from 'react-redux'

const { height } = Dimensions.get('window')

class Payments extends React.PureComponent {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({ type: "payments/queryPayments" })
    }

    render() {
        const { dispatch } = this.props;
        const { balance, succ, proc } = this.props.payments;
        return (
            <View style={[container, { height: height }]}>
                <View style={{ height: 164, backgroundColor: "#3a76d2" }}>
                    <View style={styles.header} >
                        <TouchableWithoutFeedback onPress={() => dispatch(NavigationActions.back())} >
                            <View style={{ padding: 10, paddingLeft: 0, width: 40, }} >
                                <Image
                                    style={{ width: 16, height: 16, }}
                                    source={require('../../../res/images/left.withe.png')}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: 16, color: "#ffffff", flex: 1, textAlign: 'center' }}>账户余额</Text>
                        <Text
                            onPress={() => dispatch(NavigationActions.navigate({ routeName: 'paymentsDetails' }))}
                            style={{ width: 55, fontSize: 14, color: '#ffffff', textAlign: 'right', paddingLeft: 10, paddingRight: 5 }}
                        >明细</Text>
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <Text style={{ fontSize: 14, color: '#91b8f7', lineHeight: 24, }}>余额账户（元）</Text>
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 3 }}>
                        <Text style={{ fontSize: 34, color: '#ffffff', lineHeight: 40 }}>{balance / 100}</Text>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.listHeader}>
                        <View style={styles.listHeaderContent}>
                            <Text style={styles.listHeaderText} >提现详情</Text>
                        </View>
                        <View style={styles.listRow}>
                            <Text style={styles.listLabel}>提现中</Text>
                            <Text style={styles.listValue} >￥{proc/100}</Text>
                        </View>
                        <View style={styles.listRow}>
                            <Text style={styles.listLabel}>已提现</Text>
                            <Text style={styles.listValue} >￥{succ/100}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.applyBtnContainer} >
                    <Text onPress={() => dispatch(NavigationActions.navigate({ routeName: 'withdrawals' }))} style={styles.applyBtn} >申请提现</Text>
                </View>
            </View>

        )

    }
}

export default connect(getProps('payments'))(Payments)

const styles = StyleSheet.create({
    header: {
        height: 40,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: barHeight
    },
    listContainer: {
        borderColor: "#e8eaee",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "#ffffff"
    },
    listHeader: {

    },
    listHeaderContent: {
        borderLeftWidth: 4,
        borderLeftColor: "#3a76d2",
        paddingLeft: 11,
        marginVertical: 7
    },
    listHeaderText: {
        fontSize: 14,
        fontWeight: '500',
        color: "#4a4a4a",
        backgroundColor: "rgba(0,0,0,0)",
        lineHeight: 14,
        paddingVertical: 6,
    },
    listRow: {
        height: 40,
        borderTopWidth: 1,
        borderTopColor: "#e8e8e8",
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingRight: 15
    },
    listLabel: {
        fontSize: 13,
        color: "#4a4a4a"
    },
    listValue: {
        fontSize: 13,
        color: "#7b7d8b"
    },
    applyBtnContainer: {
        width: "100%",
        position: "absolute",
        bottom: 25,
        left: 0
    },
    applyBtn: {
        marginHorizontal: 15,
        lineHeight: 14,
        fontSize: 14,
        color: "#ffffff",
        backgroundColor: "#3a76d2",
        paddingVertical: 13,
        borderRadius: 4,
        textAlign: 'center'
    }
})

