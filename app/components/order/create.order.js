import React from 'react';

import { Text, View, ScrollView, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'

import { connect } from 'react-redux'

import { getMultipleProps, getCurrentScreen } from '../../utils/index'

import OrderGoodsItem from './order.goods.item';

import { List, Picker, TextareaItem, Modal } from 'antd-mobile';

const { height, width } = Dimensions.get('window');

import { navigationOptions } from '../../router/navigationOptions';

import { NavigationActions } from '../../utils/index'

const colud = [{
    label: '否',
    value: '0',
},
{
    label: '是',
    value: '1',
}];
class CreateOrder extends React.PureComponent {
    onSubmitOrder(total) {
        const { address, goods, isCloud, mark, freight, isLeave, isPurchase } = this.props.createOrder;
        let order = { isCloud: parseInt(isCloud), note: mark, address_id: address.id };
        const order_items = []
        for (let item of goods) {
            order_items.push({
                ProductID: item.product.product_id,
                Count: parseInt(item.count)
            })
        }
        order = { ...order, order_items: JSON.stringify(order_items), total: total ,isPurchase}
        this.props.dispatch({ type: 'createOrder/submitOrder', order })
    }
    render() {
        const { address, goods, isCloud, mark, freight, isLeave, isPurchase } = this.props.createOrder;
      
        const { dispatch } = this.props;
        if (!goods) return <View></View>
        return (
            <View style={{ backgroundColor: '#f3f5f9' }}>
                <Modal
                    visible={isLeave}
                    transparent={true}
                    maskClosable={true}
                    onClose={() => dispatch({ type: 'createOrder/isLeave', isLeave: false })}
                    footer={[{ text: '关闭', onPress: () => { dispatch({ type: 'createOrder/isLeave', isLeave: false }) } },
                    { text: '确认', onPress: () => { dispatch({ type: 'createOrder/sureLeave' }) } }
                    ]}
                >
                    <View><Text style={{ color: "#222", textAlign: 'center' }}>提示——是否确认取消该订单？</Text></View>
                </Modal>
                <ScrollView style={{ height: "100%", overflow: 'hidden', }}>
                    <TouchableWithoutFeedback onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'orderAddress', params: { addressId: address.id } }))}>
                        {
                            address.name == undefined ? <View style={{ padding: 20, backgroundColor: '#ffffff' }}><Text style={{ fontSize: 13, color: "#343434", textAlign: 'center' }}>添加地址</Text></View>
                                :
                                <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../res/images/location.png')} style={{ width: 16, height: 16, alignSelf: 'flex-start', marginTop: 26 }} />
                                    <View style={{ marginHorizontal: 10, flex: 1, }}>
                                        <View style={styles.addressConent}>
                                            <Text style={styles.addressText}>收货人：{address.name}</Text>
                                            <Text style={styles.addressText}>联系电话：{address.phone} </Text>
                                        </View>
                                        <Text numberOfLines={3} style={styles.addressDetails}>{(address.province + address.city + address.district + address.street)}</Text>
                                    </View>
                                    <Image source={require('../../res/images/right.png')} style={{ width: 20, height: 20 }} />
                                </View>

                        }
                    </TouchableWithoutFeedback>
                    <Image source={require('../../res/images/shop-page-cart.png')} style={{ width: "100%", height: 4, marginBottom: 10 }} />
                    <View style={{ backgroundColor: '#fff', paddingVertical: 15 }}>
                        {
                            goods.map((item, i) => {
                                return <OrderGoodsItem color={"#fff"} top={i == goods.length - 1 ? 0 : 5} {...item} key={i} />
                            })
                        }
                    </View>
                    <List >
                        <TextareaItem
                            title="买家留言"
                            placeholder="买家留言"
                            autoHeight
                            style={{
                                fontSize: 14
                            }}
                            value={mark}
                            onChange={(value) => this.props.dispatch({
                                type: 'createOrder/countFreight',
                                order: {
                                    mark: value,
                                }
                            })}
                        />
                        <Picker
                            value={[isCloud]}
                            onChange={(value) =>
                                this.props.dispatch({
                                    type: 'createOrder/countFreight',
                                    order: {
                                        address: address,
                                        goods: goods,
                                        isCloud: value[0]
                                    }
                                })
                            } data={colud} cols={1} indicatorStyle={{ fontSize: 14 }}>
                            <List.Item arrow="horizontal"><Text style={styles.label}>云订单</Text></List.Item>
                        </Picker>
                    </List>
                    <View style={{ padding: 10, marginTop: 15, backgroundColor: "#fff", marginBottom: 60 }}>
                        <View style={styles.row}>
                            <Text style={styles.label}>商品金额</Text>
                            <Text style={styles.price}>￥{getTotalPrice(goods) / 100}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>运费</Text>
                            <Text style={styles.price}>￥{freight / 100}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btnContainer}>
                    {isPurchase ? null : <Text style={styles.price}> 实付款:￥{freight + getTotalPrice(goods) / 100}</Text>}
                    <Text onPress={() => this.onSubmitOrder(freight + getTotalPrice(goods))} style={styles.btn}>提交订单</Text>
                </View>
            </View>
        )
    }
}
function getTotalPrice(goods) {
    let total = 0
    for (let item of goods) {
        total += item.count * item.product.price
    }
    return total

}
const styles = StyleSheet.create({
    addressText: {
        fontSize: 13,
        color: '#585c64',
    },
    addressConent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 24,
    },
    addressDetails: {
        fontSize: 13,
        lineHeight: 20,
        color: '#585c64',
        flex: 1
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 24 },
    label: { fontSize: 14, color: '#585c64' },
    price: { fontSize: 14, color: '#ff4444' },
    btnContainer: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopColor: 'rgba(0, 0, 0, 0.25)',
        borderTopWidth: 1
    },
    btn: {
        fontSize: 14, color: "#fff",
        backgroundColor: '#ff4444', width: 100,
        textAlign: 'center',
        paddingTop: 13,
        paddingBottom: 13,
        lineHeight: 14,
        marginLeft: 15
    }

})
function stateToProps(state) {

    return {
        createOrder: state.createOrder,
        router: state.router,
        agent: state.agent
    }
}

export default connect(stateToProps)(CreateOrder)