
import React from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity, PanResponder } from 'react-native';

import OrderGoodsItem from './order.goods.item'

import { filterOrderStatus, getTotal, } from './filter';

import { connect } from 'react-redux';

import { getCurrentScreen, NavigationActions, container } from '../../utils/index';

import { LoadingFooter } from '../loading.footer'

import { confirmReceipt } from './order.setting'

class Order extends React.PureComponent {

    componentWillMount() {
        const routeName=getCurrentScreen(this.props.router)
        if(routeName!="orderCenter")return;
        const { dispatch } = this.props;
        const { order_status, page, limit } = this.props.order;
        const order_type = this.props.navigation.state.params == undefined || this.props.navigation.state.params.order_type == undefined ? 1 : this.props.navigation.state.params.order_type;

        this.props.dispatch({
            type: 'order/queryOrder', params: {
                order_status: 'all',
                page,
                limit,
                isMore: false,
                order_type: order_type
            }
        });
        this.first = true;
    }
    componentDidMount() {
        this.first = false;
    }
    onEndReached() {
        if (this.props.loading || this.first) return;
        const { order_status, page, limit, count, order_type } = this.props.order;
        if (page * limit >= count) return;
        this.props.dispatch({
            type: 'order/queryOrder', params: {
                order_status,
                page: page + 1,
                limit,
                isMore: true,
                order_type
            }
        });

    }
    ToPay = (order_id, pay) => {
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'payOrder', params: {
                pay: pay,
                order_id: order_id
            }
        }))
    }
    ToDetails = (order_id) => {
        const { order_type } = this.props.order;
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'orderDetails', params: {
                order_id: order_id,
                order_type: order_type,
            }
        }))
    }
    queryStatus = (status) => {
        const { order_type } = this.props.order;
        this.props.dispatch({
            type: 'order/queryOrder', params: {
                order_status: status,
                page: 1,
                limit: 5,
                isMore: false,
                order_type
            }
        });
    }
    linktoGoods = (id,name) => {
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'goodsDtails', params: {
                id: id,
                name:name
            }
        }))
    }
    confirmReceipt = (order_id) => {
        this.props.dispatch({
            type: 'order/confirmReceipt', params: {
                order_id: order_id
            }
        })
    }
    confirmDeliver = (id) => {
        this.props.dispatch(NavigationActions.navigate({
            routeName: "orderDeliver", params: {
                order_id: id
            }
        }))
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render() {
        const { orders, count, order_status, page, limit, order_type, id } = this.props.order;
        const loading = this.props.loading == undefined ? true : this.props.loading;
        const setting = {
            ToPay: this.ToPay,
            ToDetails: this.ToDetails,
            linktoGoods: this.linktoGoods,
        }
        return (
            <View style={container}>
                <View style={styles.tab} >
                    <TouchableOpacity onPress={() => this.queryStatus('all')}>
                        <Text style={[styles.tabItem, order_status == "all" ? styles.tabCur : null]}>全部</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.queryStatus('1')}>
                        <Text style={[styles.tabItem, order_status == 1 ? styles.tabCur : null]}>待付款</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.queryStatus('2')}>
                        <Text style={[styles.tabItem, order_status == 2 ? styles.tabCur : null]}>待审核</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.queryStatus('receive')}>
                        <Text style={[styles.tabItem, order_status == "receive" ? styles.tabCur : null]}>待发货</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.queryStatus('5')} >
                        <Text style={[styles.tabItem, order_status == 5 ? styles.tabCur : null]}>待收货</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.queryStatus('6')}>
                        <Text style={[styles.tabItem, order_status == 6 ? styles.tabCur : null]}>已完成</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ height: "100%" }}
                    data={getOrderData(orders)}
                    onRefresh={() => {
                        this.props.dispatch({
                            type: 'order/queryOrder', params: {
                                order_status,
                                page: 1,
                                limit,
                                order_type
                            }
                        });
                    }}
                    refreshing={loading}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.onEndReached()}
                    renderItem={({ item }) => {
                        return <Item id={id} setting={setting} confirmReceipt={this.confirmReceipt} confirmDeliver={this.confirmDeliver} type={order_type} {...item} />
                    }}
                    ListFooterComponent={<LoadingFooter hidden={orders.length <= 0} loading={loading} isAll={page * limit >= count} />}
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
            key: orders.indexOf(item),
            ...item
        })
    }
    return newOrders

}
const Item = (props) => {
    if (props.type == 1) {
        if (props.agent_id != props.id) {
            return <View></View>
        }
    }
    if (props.type == 3) {
        if (props.master_id != props.id) {
            return <View></View>
        }
    }
    return (
        <View style={{ backgroundColor: '#fff', marginBottom: 10 }} >
            <View style={styles.orderTitle}>
                <Text style={styles.orderCode}>订单号：{props.express_id}</Text>
                <Text style={styles.orderStatus}>{filterOrderStatus(props.order_status)}</Text></View>
            {
                props.items.map((key, i) => <OrderGoodsItem linktoGoods={props.setting.linktoGoods} {...key} key={i} />)
            }
            <View style={styles.orderInfo}>
                <Text style={{ fontSize: 12, color: '#585c64' }}>共 {getTotal(props.items)} 件商品  合计：</Text>
                <Text style={{ fontSize: 12, color: '#222222' }}>￥<Text style={{ fontSize: 16 }}>{props.amount / 100}</Text></Text>
                <Text style={{ fontSize: 12, color: '#585c64' }}> （含运费:¥ {props.freight / 100}）</Text>
            </View>
            <View style={styles.btnContainer} >

                {
                    props.order_status == 1 ?
                        <Text onPress={() => props.setting.ToPay(props.order_id, props.amount)} style={styles.btn}>去支付</Text>
                        :
                        null
                }

                {
                    props.order_status == 5 && props.type != 3 ? <Text
                        onPress={() => confirmReceipt(props.confirmReceipt, props.order_id)}
                        style={styles.btn}  >确认收货</Text> : null
                }

                {
                    (props.order_status == 3) && props.type == 3 ? <Text onPress={() => props.confirmDeliver(props.order_id)} style={styles.btn}  >确认发货</Text> : null
                }
                <Text onPress={() => props.setting.ToDetails(props.order_id)} style={styles.btn}>订单详情</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    tab: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
    },
    tabItem: {
        fontSize: 13,
        color: '#585c64',
        paddingVertical: 5,
        paddingHorizontal: 2,
        borderColor: '#3a76d2'
    },
    tabCur: {
        borderBottomWidth: 2,
        color: '#3a76d2'
    },
    orderTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 10
    },
    orderCode: {
        fontSize: 12,
        color: '#585c64'
    },
    orderStatus: {
        fontSize: 12,
        color: '#ff4444'
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btnContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: '#f0f0f0'
    },
    btn: {
        fontSize: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: '#585c64',
        borderColor: '#9b9b9b',
        borderWidth: 1,
        lineHeight: 12,
        marginLeft: 10
    },
    footer: { fontSize: 12, lineHeight: 12, color: '#333', paddingVertical: 10, textAlign: 'center', marginBottom: 10 }

})



function getPropsWithLoading() {
    return (state) => ({
        order: state.order,
        router: state.router,
        loading: state.loading.models.order
    })
}
export default connect(getPropsWithLoading())(Order)