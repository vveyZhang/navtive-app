import React from 'react';

import { Text, View, Dimensions, StyleSheet } from 'react-native'

import { container, getProps } from '../../utils/index';

import { styles } from './cart.style'

import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');

import CartShop from './cart.shop.js'

import CartPurchase from './cart.purchase'


import { Tabs, Badge } from 'antd-mobile';

const tabs = [

    { title: "购物" },
    { title: "取货" },
];

class Cart extends React.Component {
    state={
        index:0
    }
    onEditor = (type) => {
        this.props.dispatch({ type: 'cart/onEditor',params:{
            type:type
        } });
    }
    render() {
        const type=this.state.index?'fetch':'shop'
        const { isEditor } = this.props.cart[type];
        return (
            <View style={container}>
                <View style={styles.header}>
                    <Text style={{ width: 40 }} ></Text>
                    <Text style={{ fontSize: 16, color: '#030303', textAlign: 'center', flex: 1 }}>购物车</Text>
                    <Text style={{ width: 40, textAlign: 'center' }} onPress={() => this.onEditor(type)} style={{ color: '#222222', fontSize: 14 }}>{isEditor ? '完成' : '编辑'}</Text>
                </View>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor: "#3a76d2" }}
                    style={{ height: 40}}
                    tabBarActiveTextColor="#3a76d2"
                    tabBarInactiveTextColor="#585c64"
                    onChange={(tab, index) => { this.setState({
                        index:index
                    })}}
                    onTabClick={(tab, index) => { this.setState({
                        index:index
                    })}}
                >
                    <CartShop />
                    <CartPurchase />
                </Tabs>

            </View>
        )
    }
}

export default connect(getProps('cart'))(Cart)

const barStyles=StyleSheet.create({
    barTab:{
        
    }
})