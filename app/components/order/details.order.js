
import React from 'react'

import { View, Text, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity, Clipboard } from 'react-native'

import { getPropsWithLoading } from '../../utils/index'

import { connect } from 'react-redux'

import { filterOrderStatus, getTotal } from './filter';

import OrderGoodsItem from './order.goods.item';

import { NavigationActions, format } from '../../utils/index'

import { tipFail, tipSuccess } from '../../utils/tips'

import { confirmReceipt } from './order.setting'

class OrderDetails extends React.PureComponent {
    componentWillMount() {

        const order_id = this.props.navigation.state.params.order_id;
        const order_type = this.props.navigation.state.params.order_type;
        this.props.dispatch({
            type: 'orderDetails/queryOrder', params: {
                order_id: order_id,
                order_type:order_type
            }
        })
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
    toPay = () => {
        const order_id = this.props.navigation.state.params.order_id;
        const pay = this.props.orderDetails.amount;
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'payOrder', params: {
                pay: pay,
                order_id: order_id
            }
        }))
    }
    linktoGoods = (id) => {
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'goodsDtails', params: {
                id: id
            }
        }))
    }
    async setClipboardContent() {
        Clipboard.setString(this.props.orderDetails.express_id);
        try {
            var content = await Clipboard.getString();
            tipSuccess('复制成功', 1);
        } catch (e) {
            tipFail('复制失败，请重试', 1)
        }
    }
    render() {
        const order = this.props.orderDetails;
        const order_type = this.props.navigation.state.params.order_type;
        const address = order.address;
        if (!address) {
            return (<View>
                <Text style={{ textAlign: "center", }}>加载中...</Text>
            </View>)
        }
        return (<ScrollView style={{ backgroundColor: "#f3f5f9" }}>
            <ImageBackground style={styles.header}>
                <Text style={styles.headerName}>{filterOrderStatus(order.order_status)}</Text>
            </ImageBackground>
            <View style={styles.address}>
                <Image source={require('../../res/images/ic-address.png')} style={{ width: 20, height: 20, marginRight: 10, flex: 0 }} />
                <View style={{ flex: 1 }}>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.addressText}>收货人：{address.name}</Text>
                            <Text style={styles.addressText}>{address.phone}</Text>
                        </View>
                        <View style={{ marginTop: 4 }} >
                            <Text numberOfLines={3} style={styles.addressText}>{address.province + address.city + address.district + address.street}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.orderGoods}>
                <View style={{ height: 40, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, color: "#585c64", width: '100%', textAlign: "left" }}>共 {getTotal(order.items)} 件商品</Text>
                </View>
                <View>
                    {order.items.map((key, i) => <OrderGoodsItem linktoGoods={this.linktoGoods} key={i} top={5} {...key} />)}
                </View>
                <View style={styles.orderOther}>
                    <Text style={{ fontSize: 12, color: '#585c64' }}>合计: <Text style={{ color: '#222' }}>￥<Text style={{ fontSize: 16 }}>{order.amount / 100}</Text></Text> （含运费:¥ {order.freight}）</Text>
                </View>
                <View style={styles.setting}>
                    {
                        order.order_status == 1 ? <TouchableOpacity >
                            <Text onPress={() => this.toPay()} style={styles.settingbtn}>去支付</Text>
                        </TouchableOpacity> : null
                    }
                    {
                        order.order_status == 5 && order_type == !3 ? <Text
                            onPress={() => confirmReceipt(this.confirmReceipt, order.order_id)}
                            style={styles.btn}  >确认收货</Text> : null
                    }
                    {
                        order.order_status == 3 && order_type == 3 ? <Text onPress={() => this.confirmDeliver(order.order_id)} style={styles.btn}  >确认发货</Text> : null
                    }
                </View>
            </View>
            <View style={{ marginTop: 10, paddingHorizontal: 10, paddingVertical: 15, backgroundColor: "#fff" }} >
                <View style={[{ flexDirection: 'row', alignItems: 'center' }, styles.row]}>
                    <Text style={styles.orderInforText} >订单号  {order.express_id}</Text>
                    <TouchableOpacity onPress={() => this.setClipboardContent()} >
                        <Text style={styles.copy}>复制</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.orderInforText}>下单时间  {format(order.create_time)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.orderInforText}>支付方式  {order.pay_mode==2 ? "余额" : "转账"}</Text>
                </View>

            </View>
        </ScrollView>)
    }
}
const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: 66
    },
    headerName: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'left',
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    address: {
        padding: 10,
        backgroundColor: "#fff",
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    addressText: {
        fontSize: 12,
        color: '#585c64'
    },
    orderGoods: {
        backgroundColor: '#fff'
    },
    orderOther: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
        height: 20,
        paddingHorizontal: 10
    },
    setting: {
        padding: 10,
        borderTopColor: '#f0f0f0',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    settingbtn: {
        fontSize: 12,
        color: '#585c64',
        lineHeight: 12,
        paddingVertical: 5,
        width: 80,
        borderColor: '#9b9b9b',
        borderWidth: 1,
        borderRadius: 11,
        textAlign: 'center'
    },
    orderInforText: {
        fontSize: 12,
        color: '#585c64',
    },
    row: {
        height: 24
    },
    copy: {
        fontSize: 10,
        color: "#9b9b9b",
        lineHeight: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 10,
        borderColor: '#9b9b9b',
        borderWidth: 1,
        borderRadius: 3
    }
})
export default connect(getPropsWithLoading('orderDetails'))(OrderDetails)