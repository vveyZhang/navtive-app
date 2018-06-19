
import React from 'react';

import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView, Image } from 'react-native';

import { connect } from 'react-redux';

import { NavigationActions, getProps } from '../../../utils/index'
const AddressContainer = (props) => {

    const { address } = props.agent;
    const { dispatch } = props;
    const default_address_id = props.agent.agent.default_address_id;
    return (
        <ScrollView style={{ height: "100%", backgroundColor: '#f3f5f9' }}>
            {
                address ? address.map((key, i) => {
                    return (
                        <View style={styles.address} key={i}>
                            <View style={{ flexDirection: 'row', height: 20, }}>
                                <Text style={{ flex: 1, fontSize: 13, color: "#4a4a4a", textAlign: 'left' }}>{key.name}</Text>
                                <Text style={{ flex: 1, fontSize: 13, color: "#4a4a4a", textAlign: 'right' }}>152123456789</Text>
                            </View>
                            <Text numberOfLines={1} style={{ fontSize: 13, lineHeight: 20, marginVertical: 8, marginRight: 12, color: '#4a4a4a' }}>{key.province + key.city + key.district + key.street}</Text>
                            <View style={{ paddingTop: 10, borderTopColor: '#f3f3f3', borderTopWidth: 1 }}>
                                <TouchableWithoutFeedback onPress={() => {
                                    dispatch({
                                        type: 'agent/setDefaultAddress', address: {
                                            ...key,
                                            is_default: 1
                                        }
                                    })
                                }} style={{ alignSelf: 'flex-start' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ width: 13, height: 13 }} source={default_address_id == key.id ? require('../../../res/images/select.png') : require('../../../res/images/unselect.png')} /><Text style={key.is_default ? styles.select : styles.unselect}>设为默认</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: -13 }}>
                                    <TouchableWithoutFeedback onPress={() => dispatch(NavigationActions.navigate({
                                        routeName: 'EditorAddress', params: {
                                            id: i
                                        }
                                    }))}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 13, height: 13 }} source={require('../../../res/images/editor.png')} /><Text style={styles.unselect}>编辑</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => dispatch({ type: 'agent/deleteAddress', address_id: key.id })}>
                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                            <Image style={{ width: 13, height: 13 }} source={require('../../../res/images/delet.png')} /><Text style={styles.unselect}>删除</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View>
                            </View>
                        </View>
                    )
                }) : null
            }
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    address: {
        marginTop: 20,
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e8eaee',
        backgroundColor: '#fff'
    },
    unselect: {
        color: '#383f4a',
        fontSize: 12,
        marginLeft: 4,
        lineHeight: 12
    },
    select: {
        color: '#3a76d2',
        fontSize: 12,
        marginLeft: 4,
        lineHeight: 12
    },
})
export default connect(getProps('agent'))(AddressContainer)