
import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
export const ShopItem = (props) => {
    const goods = props.goods
    if(goods.product_status!=1)return null;
    return (
        <TouchableWithoutFeedback onPress={() => { props.toGoods() }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 5, borderBottomColor: 'rgba(155, 155, 155, 0.5)', borderBottomWidth: 1, paddingVertical: 10 }}>

                <Image
                    style={{ width: 120, height: 120 }}
                    source={{ uri: goods.thumb_url }}
                />

                <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={{ height: 40 }}>
                        <Text numberOfLines={2} style={{ color: '#585c64', fontSize: 14, lineHeight: 20 }} >{goods.describe}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={{
                            fontSize: 10,
                            color: '#ff9000', borderColor: '#ff9000', borderWidth: 1, fontWeight: '200',
                            lineHeight: 16, paddingHorizontal: 3, borderRadius: 3,
                            marginTop: 15
                        }} >加乐活</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 20, marginTop: 10, alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, lineHeight: 20, color: '#ff5d13', }}>¥ {goods.price/100}</Text>
                        <Text style={{ fontSize: 13, lineHeight: 20, color: '#9b9b9b', marginLeft: 6 }} >{goods.sales}人近期进货</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                        <Text style={{ fontSize: 10, color: '#9b9b9b', lineHeight: 12 }}>{goods.origin}</Text>
                        <Image source={require('../../res/images/right.png')} style={{ alignSelf: 'flex-end', width: 12, height: 12 }} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}