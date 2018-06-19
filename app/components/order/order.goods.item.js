import React from 'react';

import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'

import { filterGoodsStatus } from './filter'

const OrderGoodsItem = (props) => {
    const product = props.product
    return (
        <View style={{ flexDirection: 'row', backgroundColor: props.color ? props.color : '#f3f5f9', padding: 10, marginBottom: props.top || 0 }}>
            <TouchableWithoutFeedback onPress={() => props.linktoGoods(product.product_id,product.name)} >
                <Image source={{ uri: product.thumb_url }} style={{ width: 90, height: 90 }} />
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 10, color: '#c3a86d', lineHeight: 18 }}>【{product.category ? product.category : '加乐活'}】
                <Text style={{ color: '#585c64' }}>{product.name}</Text></Text>
                <Text  style={{ fontSize: 11, color: '#585c64', lineHeight: 18, height: 18 }} numberOfLines={1} >商品状态：{filterGoodsStatus(product.product_status)}</Text>
                <Text style={{ color: '#9b9b9b', fontSize: 11, marginTop: 5 }}>重量：{product.weight}克</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontSize: 16, color: '#ff5d13' }}>￥{product.price / 100}</Text>
                    <Text style={{ fontSize: 14, color: '#585c64' }}>x{props.count}</Text>
                </View>
            </View>
        </View>
    )
}
export default OrderGoodsItem