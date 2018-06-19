import React from 'react';

import { Text, View, StyleSheet, ScrollView, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'

import { connect } from 'react-redux';

import { getProps, NavigationActions, getCurrentScreen, barHeight } from '../../utils/index';

import CarItem from './cart.item'

import { tipInfo } from '../../utils/tips'

import { styles } from './cart.style'

const { height, width } = Dimensions.get('window');


class CartShop extends React.Component {

    componentWillMount() {
        this.props.dispatch({ type: 'cart/queryCart' });
    }
    updateCount = (index, count) => {
        if(count!="")  count = count <= 1 ? 1 : count;
        this.props.dispatch({
            type: 'cart/updateGoodsCount', params: {
                index: index,
                count: count,
                type: this.type
            }
        });
        this.isChage = true;
    }

    isChage = false;
    type = "shop";
    componentWillReceiveProps(nextProps) {
        if (getCurrentScreen(nextProps.router) != 'cart' && getCurrentScreen(this.props.router) == "cart") {
            if (!this.isChage) return
            this.isChage = false
            this.updataCart(nextProps);
        }
    }

    updataCart(nextProps) {
        nextProps.dispatch({
            type: 'cart/batchUpdate', params: {
                type: 2,
                cart: nextProps.cart[this.type].cart
            }
        });
    }
    componentWillUnmount() {
        if (!this.isChage) return
        this.isChage = false
        this.updataCart(this.props)
    }
    onSelect = (index) => {
        this.props.dispatch({
            type: 'cart/onSelect', params: {
                index: index,
                type: this.type
            }
        })
    }
    onAllSelect = () => {
        this.props.dispatch({
            type: 'cart/selectAll', params: {
                type: this.type
            }
        })

    }
    handlerBtn = () => {
        const { dispatch } = this.props;
        const cart = this.props.cart[this.type]
        if (cart.isEditor) {
            this.isChage = true;
            return dispatch({
                type: 'cart/deleteGoods', params: {
                    type: this.type
                }
            })
        }
        if (cart.select.length == 0) return tipInfo('请选择购买商品')
        const goods = []
        for (let i of cart.select) {
            goods.push(cart.cart[i])
        }
        this.createOrder(goods)

    }
    createOrder(goods) {
        const id = this.props.agent.agent.default_address_id;
        const addresses = this.props.agent.address;
        let address = {}
        for (let item of addresses) {
            if (item.id == id) address = item;
        }
        this.props.dispatch({
            type: 'cart/createOrder', order: {
                address: address,
                goods: goods,
                isCloud: '0',
                isCreated: true,
                type: this.type
            }
        })

    }
    render() {
        const { cart, isEditor, select } = this.props.cart.shop;
        const isAll = cart.length == select.length && cart.length > 0;
        const { dispatch } = this.props;
        return (
            <View style={{ height: '100%', }}>
                <ScrollView style={{ overflow: 'hidden', paddingBottom: 60 }} >
                    {cart.map((key, i) => <CarItem
                        onSelect={this.onSelect}
                        updateCount={this.updateCount}
                        index={i}
                        toGoods={() => dispatch(NavigationActions.navigate({
                            routeName: 'goodsDtails', params: {
                                id: key.product.product_id,
                                name: key.product.name
                            }
                        }))}
                        select={select} goods={key} key={i} />)}
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableWithoutFeedback style={{ marginRight: 15 }} onPress={() => this.onAllSelect()}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                            <Image source={isAll ? require('../../res/images/select.png') : require('../../res/images/unselect.png')}
                                style={{ width: 20, height: 20 }} />
                            <Text style={{ fontSize: 11, color: '#585c64', marginLeft: 5, }}>{isAll ? "取消" : "全选"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        !isEditor ? <Text style={{ fontSize: 13, color: '#585c64', marginLeft: 10, }}>总计：<Text style={{ color: '#ff5d13', marginLeft: 2 }}>￥ {getALLPrice(cart, select) / 100}</Text></Text> : null
                    }
                    <Text onPress={() => this.handlerBtn()} style={styles.btn}>{!isEditor ? `去结算（${select.length}）` : `删除（${select.length}）`}</Text>
                </View>
            </View>
        )
    }
}
function getALLPrice(cart, select) {

    let total = 0
    for (let item of cart) {
        if (select.indexOf(cart.indexOf(item)) != -1) total += item.count * item.product.price
    }
    return total
}
function stateToProps(state) {

    return {
        cart: state.cart,
        router: state.router,
        agent: state.agent
    }
}
export default connect(stateToProps)(CartShop)