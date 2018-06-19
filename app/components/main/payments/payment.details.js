import React from 'react'

import { View, FlatList, Text, StyleSheet } from 'react-native'

import { container, format, getProps } from '../../../utils/index'

import { request } from '../../../utils/request'

import { LoadingFooter } from '../../loading.footer';

import { connect } from 'react-redux'

import { filterType, filterCause, filterStatus } from './filter'

class PaymentsDetails extends React.PureComponent {
    state = {

    }
    componentWillMount() {
        this.props.dispatch({
            type: 'paymentsDetails/queryDeatils', params: {
                page: 1,
                limit: 20
            }
        })
    }
    _refresh = () => {
        const { type, cause, limit, withdraw_status } = this.props.paymentsDetails
        let params = {}
        if (type != 0) params.type = type;
        if (cause != 0) params.cause = cause;
        if (withdraw_status != 0) params.withdraw_status = withdraw_status;
        this.props.dispatch({
            type: 'paymentsDetails/queryDeatils', params: {
                page: 1,
                limit: 20,
                ...params
            }
        })
    }
    onEndReached = () => {
        const { page, limit, count, loading, type, cause, withdraw_status, isAll } = this.props.paymentsDetails
        if (loading||isAll) return
        if (page * limit >= count) return;
        let params = {}
        if (type != 0) params.type = type;
        if (cause != 0) params.cause = cause;
        if (withdraw_status != 0) params.withdraw_status = withdraw_status;
        this.props.dispatch({
            type: 'paymentsDetails/queryMore', params: {
                page: page + 1,
                limit,
                ...params
            }
        })

    }
    render() {
        const { type, loading, count, orders, page, limit, cause, isAll } = this.props.paymentsDetails;
        console.log(this.props.paymentsDetails)
        return (
            <View>
                <FlatList
                    style={{ height: "100%" }}
                    data={getOrderData(orders)}
                    onRefresh={() => this._refresh()}
                    refreshing={loading}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.onEndReached()}
                    renderItem={({ item }) => {

                        return <View style={styles.item}>
                            <View style={styles.row} >
                                <Text style={styles.title}>{filterType(item.type)}  —<Text style={{ color: "#ff4444", fontSize: 12 }}>{filterCause(item.cause)}</Text> </Text>
                                <Text style={styles.title}>{item.amount / 100}</Text>
                            </View>
                            <View style={styles.row} >
                                <Text style={styles.content}>{format(item.time)}</Text>
                                <Text style={styles.content}>{filterStatus(item.withdraw_status)}</Text>
                            </View>
                        </View>
                    }}
                    ListFooterComponent={<LoadingFooter hidden={count <= 0} loading={loading} isAll={page * limit >= count} />}
                >
                </FlatList>
            </View>

        )

    }
}
function getOrderData(orders) {
    const newOrders = [];
    for (let item of orders) {
        newOrders.push({
            key: item.order_id,
            ...item
        })
    }
    return newOrders
}

const styles = StyleSheet.create({
    item: {
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14,
        color: '#333'
    },
    content: {
        fontSize: 12,
        color: '#676767',
        marginTop: 3
    }
})

export default connect(getProps('paymentsDetails'))(PaymentsDetails)