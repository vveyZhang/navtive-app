import React from 'react';

import { View, ScrollView, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions, } from '../../utils/index'

const OrderAddress = (props) => {
    const addresses = props.agent.address;
    const id = props.createOrder.address.id;
    const { goods, isCloud, } = props.createOrder
    return (
        <ScrollView style={{ backgroundColor: '#f3f5f9' }}>
            {
                addresses.map((address, i) => {
                    return (
                        <TouchableWithoutFeedback key={i} onPress={() => {
                            props.dispatch({
                                type: 'createOrder/countFreight', order: {
                                    address: address,
                                    goods: goods,
                                    isCloud: isCloud,
                                    isCreated:true
                                }
                            })
                            props.dispatch(NavigationActions.back())
                        }
                        }>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
                                {id == address.id ? <Image source={require('../../res/images/address-select.png')} style={{ width: 16, height: 16, marginRight: 10 }} /> : null}
                                <View style={{ marginHorizontal: 10, flex: 1, }}>
                                    <View style={styles.addressConent}>
                                        <Text style={styles.addressText}>收货人：{address.name}</Text>
                                        <Text style={styles.addressText}>联系电话：{address.phone} </Text>
                                    </View>
                                    <Text numberOfLines={3} style={styles.addressDetails}>{address.province + address.city + address.district + address.street}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={(e)=>{
                                    e.stopPropagation();
                                    props.dispatch(NavigationActions.navigate({routeName:'orderEditorAddress',params:{
                                        id:i,
                                        routeName:'orderAddress'
                                    }}))
                                }}>
                                    <Image source={require('../../res/images/editor.png')} style={{ width: 16, height: 16, marginLeft: 10 }} />
                                </TouchableWithoutFeedback>

                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </ScrollView>
    )
}
function stateToProps(state) {

    return {
        createOrder: state.createOrder,
        agent: state.agent
    }
}

export default connect(stateToProps)(OrderAddress)


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
})