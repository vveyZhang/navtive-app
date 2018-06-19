import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Stepper } from 'antd-mobile'

const CarItem = (props) => {

    const goods = props.goods.product;
    const count = props.goods.count;
    const { select } = props;
    return (
        <View style={styles.item}>
            <TouchableWithoutFeedback onPress={() => props.onSelect(props.index)}>
                <Image source={
                    select.indexOf(props.index) > -1 ? require('../../res/images/select.png') : require('../../res/images/unselect.png')
                }
                    style={{ width: 20, height: 20, marginRight: 15 }} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => props.toGoods()}>
                <Image source={{ uri: goods.thumb_url }} style={{ width: 100, height: 100 }} />
            </TouchableWithoutFeedback>

            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text onPress={() => props.toGoods()} ellipsizeMode='tail' style={{ fontSize: 12, color: '#c3a86d', lineHeight: 18 }}>【 {goods.category ? goods.category : "加乐活系列"} 】<Text onPress={() => props.toGoods()} style={{ color: "#585c64" }}>{goods.name}</Text></Text>
                <Text style={{ fontSize: 12, color: '#585c64', lineHeight: 18 }}>{goods.describe}</Text>
                <Text style={{ fontSize: 10, color: '#9b9b9b', marginTop: 15 }}>重量：{goods.weight} 克</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, lineHeight: 20, color: '#ff5d13', }} >￥{goods.price/100}</Text>
                    <View
                        style={styles.btnWrap}>
                        <Text onPress={() => props.updateCount(props.index, count - 1)} style={styles.btn}>-</Text>
                        <TextInput
                            onChangeText={(value) => props.updateCount(props.index, value)}
                            value={count.toString()}
                            keyboardType='numeric' underlineColorAndroid='transparent' style={styles.number} />
                        <Text onPress={() => props.updateCount(props.index, count + 1)} style={styles.btn}>+</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: { flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10, backgroundColor: "#fff" },
    btnWrap: {
        flexDirection: 'row', overflow: "hidden", borderColor: "#f0f0f0",
        justifyContent: "center", alignItems: "center",
        borderWidth: 1, borderRadius: 10
    },
    btn: { fontSize: 14, color: '#222', width: 20, textAlign: 'center' },
    number: { width: 32, textAlign: 'center', fontSize: 10, height: 20, color: '#222', lineHeight: 14, padding: 0 }
})
export default CarItem