import React from 'react';

import { View, TouchableWithoutFeedback, Text, Image, StyleSheet } from 'react-native';

import picDefault from '../../../res/images/pic-default.png'

export const WarehouseItem = (props) => {
    const type = props.type;
    const { product, local, local_locked, cloud_locked, cloud } = props;
    return (
        <TouchableWithoutFeedback onPress={() => props.linkto(product.product_id, product.name)} >
            <View style={styles.row}>

                <Image source={product.thumb_url ? { uri: product.thumb_url } : picDefault} style={styles.goodsPic} />

                <View style={{ marginLeft: 10, flex: 1 }} >
                    <View style={{ height: 48 }} >
                        <Text numberOfLines={2} style={styles.goodsName} ><Text>【 加乐活系列 】</Text>{product.name}</Text>
                    </View>
                    <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.goodsPrice} >￥{product.price / 100}</Text>
                        <View style={styles.buyBtn}>
                            <Text style={styles.buyBtnText}>提货</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <Text style={styles.warelabel} >可用库存：<Text style={styles.warenumber}>{type == "cloud" ? cloud : local}</Text> 件</Text>
                        <Text style={styles.warelabel}>锁定库存：<Text style={styles.warenumber}>{type == "cloud" ? cloud_locked : local_locked}</Text> 件</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}




const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    buyBtn: {
        height: 24,
        backgroundColor: '#ff4444',
        width: 60,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    buyBtnText: {
        fontSize: 13,
        color: '#ffffff',
        textAlign: 'center',
    },
    goodsPic: {
        width: 120,
        height: 120
    },
    goodsName: {
        fontSize: 12,
        color: '#585c64',
        lineHeight: 24
    },
    goodsPrice: {
        fontSize: 14,
        color: '#ff5d13',
    },
    warelabel: {
        fontSize: 12,
        color: "#343434",
        marginRight: 10
    },
    warenumber: {
        color: "#ff4444"
    }
})