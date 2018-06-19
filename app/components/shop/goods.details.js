import React, { PureComponent } from 'react';

import {
    View, Text, Image, ScrollView, Dimensions, StyleSheet,
    TouchableWithoutFeedback, TextInput, KeyboardAvoidingView
} from 'react-native';

import { Carousel } from 'antd-mobile';

import { connect } from 'react-redux';

import { NavigationActions, container } from '../../utils/index'

import { FooterModal } from '../modal';

const { height, width } = Dimensions.get('window');


class GoodsDetails extends PureComponent {
    state = {
        detailHeight: 0,
        cartModal: false,
        buyModal: true,
        count: 1,
        isCart: true,
        show: true
    }
    getGoods = () => {
        let goods = {}
        const id = this.props.navigation.state.params.id;
        for (let item of this.props.goods.product) {
            if (item.product_id == id) goods = item
        }
        return goods
    }
    showModal = (isCart) => {
        this.setState({
            isCart: isCart,
            show: false
        })
        this.refs.modal.showModal();
    }
    submit = (goods) => {
        const { dispatch } = this.props;
        const { isPurchase } = this.props.navigation.state.params;
        this.hideModal()
        if (this.state.isCart) {
            dispatch({
                type: 'cart/addCart', order: {
                    goods: {
                        count: this.state.count,
                        product: goods,
                    },
                    type: (isPurchase ? 1 : 2)

                }
            })

        }
        else dispatch({
            type: "goods/createOrder", order: {
                goods: [
                    {
                        count: this.state.count,
                        product: goods,
                    }
                ],
                isPurchase: (isPurchase ? true : false)

            }
        })


    }
    initGoods = () => {
        this.setState({
            isCart: true,
            count: 1,
            show: true
        })
    }
    hideModal = () => {
        this.refs.modal.hideModal();
        this.setState({
            show: true
        })
    }

    render() {
        const goods = this.getGoods()
        const { dispatch } = this.props;
        const { show } = this.state;
        const { isPurchase } = this.props.navigation.state.params;
        const cart = isPurchase ? this.props.cart.fetch : this.props.cart.shop;
        return (
            <KeyboardAvoidingView style={[container, { paddingBottom: 65 }]}>
                <ScrollView scrollEventThrottle={300} style={{ overflow: "hidden", zIndex: 0, position: 'absolute', height: "100%", }}>
                    <Carousel
                        autoplay={false}
                        infinite
                        selectedIndex={1}
                        ref="banner"

                    >
                        {
                            goods.imgs.map((key, i) => <Image key={i} style={{ width: width, height: width / 2 }} source={{ uri: key }} />)
                        }
                    </Carousel>
                    <View style={styles.goodsContainer}>
                        <View style={styles.price}>
                            <Text style={{ fontSize: 18, color: '#ff5d13' }}>￥{goods.price / 100}</Text>
                            <Text style={{ fontSize: 12, color: '#9b9b9b', }}>{goods.origin}</Text>
                        </View>
                        <View style={styles.name}>
                            <Text numberOfLines={2} style={{ color: '#c3a86d', lineHeight: 18, fontSize: 13 }}>【 {goods.category ? goods.category : "加乐活系列"} 】<Text numberOfLines={2} style={{ color: '#585c64', height: 120 }}>{goods.name}</Text></Text>
                            <Text numberOfLines={3} style={{ color: '#585c64', marginTop: 5, fontSize: 12, lineHeight: 18 }}>{goods.describe}</Text>
                        </View>
                    </View>
                    {/* <View style={[styles.goodsContainer, { marginTop: 20 }]}>
                        <Text style={{ fontSize: 14, color: '#222' }}>规格</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={[styles.spec, styles.spevSelect]}>16.5g x 15袋</Text>
                            <Text style={[styles.spec]}>16.5g x 5袋</Text>
                        </View>
                    </View> */}
                    {
                        goods.detail_img.length>0
                            ?
                            goods.detail_img.map((item,index)=><Image
                            key={index}
                            resizeMode="stretch"
                            style={{ width:"100%",height:400}}
                            source={{ uri: item }}
                        />)
                            :
                            null
                    }

                    <View style={{ paddingBottom: 65 }} ></View>
                </ScrollView>
                <View style={[styles.carBtnContainer, { display: show ? 'flex' : 'none', }]}>
                    <TouchableWithoutFeedback onPress={() => dispatch(NavigationActions.navigate({ routeName: 'cart' }))}>
                        <View style={{ marginHorizontal: 10, flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../res/images/ic-cart-blue.png')} style={{ width: 32, height: 32 }} />
                            <Text style={{ color: '#222222', fontSize: 10, textAlign: 'center', marginTop: -5 }}>购物车</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cart.cart.length}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 5, flex: 1, borderRadius: 3, overflow: 'hidden' }}>
                        <Text onPress={() => {

                            this.showModal(true)
                        }} style={[styles.carBtn, { backgroundColor: '#3a76d2' }]}>{isPurchase ? "加入提货" : "加入购物车"}</Text>
                        <Text onPress={() => {
                            this.showModal(false)
                        }} style={[styles.carBtn, { backgroundColor: '#ff4444' }]}>{isPurchase ? "立即提货" : "立即购买"}</Text>
                    </View>
                </View>
                <FooterModal ref='modal' title={goods.name} hideModal={() => this.initGoods()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: "#343434" }} >商品数量</Text>
                        <View
                            style={styles.btnWrap}>
                            <Text onPress={() => {
                                const count = this.state.count - 1 <= 1 ? 1 : this.state.count - 1
                                this.setState({
                                    count: count
                                })
                            }} style={styles.btn}>-</Text>
                            <TextInput
                                onChangeText={value => {
                                    value = isNaN(value) ? 0 : value;
                                    this.setState({
                                        count: value >= 0 ? value : 1
                                    })
                                }}
                                value={this.state.count.toString()}
                                keyboardType='numeric' underlineColorAndroid='transparent' style={styles.number} />
                            <Text onPress={() => {
                                const count = this.state.count - 1 <= 1 ? 1 : this.state.count - 1
                                this.setState({
                                    count: this.state.count + 1
                                })
                            }} style={styles.btn}>+</Text>
                        </View>
                    </View>
                    <Text
                        onPress={() => this.submit(goods)}
                        style={[styles.carModalBtn, { backgroundColor: this.state.isCart ? "#3a76d2" : '#ff4444' }]} >{this.state.isCart ? "加入购物车" : '立即购买'}</Text>
                </FooterModal>
            </KeyboardAvoidingView>
        )
    }
}
function getProps() {
    return (state) => ({
        goods: state.goods,
        cart: state.cart
    })
}
export default connect(getProps())(GoodsDetails)

const styles = StyleSheet.create({
    badge: {
        width: 13,
        height: 13,
        borderRadius: 10,
        backgroundColor: "#ff4444",
        position: 'absolute',
        right: 0,
        top: 3,
        alignItems: 'center',
        justifyContent: "center"
    },
    badgeText: {
        fontSize: 7,
        color: "#ffffff",
        textAlign: 'center'
    },
    goodsContainer: {
        padding: 10,
        backgroundColor: "#ffffff"
    },
    price: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
    },
    name: {
        marginTop: 5
    },
    spec: {
        flex: 0,
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 6,
        fontSize: 10,
        color: '#222222',
        borderColor: '#222222',
        borderWidth: 1,
        marginRight: 10
    },
    spevSelect: {
        color: '#3a76d2',
        borderColor: '#3a76d2',
    },
    carBtnContainer: {
        height: 54,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        zIndex: 4,
        left: 0,
        borderTopColor: 'rgba(0, 0, 0, 0.25)',
        borderTopWidth: 1
    },
    carBtn: {
        color: '#fff',
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 14,
        paddingVertical: 12
    },
    carModalBtn: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 14,
        paddingVertical: 12,
        marginTop: 20,
        borderRadius: 4
    }
    ,
    item: { flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10, backgroundColor: "#fff" },
    btnWrap: {
        flexDirection: 'row', overflow: "hidden", borderColor: "#f0f0f0",
        justifyContent: "center", alignItems: "center",
        borderWidth: 1, borderRadius: 10
    },
    btn: { fontSize: 14, color: '#222', width: 20, textAlign: 'center' },
    number: { width: 32, textAlign: 'center', fontSize: 10, height: 20, color: '#222', lineHeight: 14, padding: 0 }
})