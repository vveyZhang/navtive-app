import React from 'react';

import { View, ImageBackground, Image, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { List } from 'antd-mobile';

import { container, barHeight, NavigationActions, getProps } from '../../../utils/index'

import { connect } from 'react-redux'

const ListItem = List.Item

const { width, height } = Dimensions.get('window');

const MyDeposit = (props) => {
   
    
    return (<View style={container} >
        <ImageBackground source={require('../../../res/images/bd-cash.png')} style={{ width: width, height: (342 / 375) * width }} >
            <View style={styles.header} >
                <TouchableWithoutFeedback onPress={() => props.navigation.dispatch(NavigationActions.back())} >
                    <View style={{ padding: 10, paddingLeft: 0, width: 40, }} >
                        <Image
                            style={{ width: 16, height: 16, }}
                            source={require('../../../res/images/left.withe.png')}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: 16, color: "#ffffff", backgroundColor: 'rgba(0,0,0,0)', flex: 1, textAlign: 'center' }}>保证金</Text>
                <View style={{ width: 50, height: 2 }} ></View>
            </View>
            <View style={{ marginTop: 60 * (height / 342) }} >
                <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(0,0,0,0)', textAlign: 'center' }} >已缴纳 （元）</Text>
                <Text style={{ fontSize: 30, color: "#ffffff", backgroundColor: 'rgba(0,0,0,0)', textAlign: 'center' }} >{props.agent.role.deposit}</Text>
            </View>
        </ImageBackground>
        <List style={{ marginTop: 15 }}>
            <ListItem
                arrow="horizontal"
                onClick={() => props.navigation.dispatch(NavigationActions.navigate({ routeName: "returnDeposit" ,params:{
                    number:props.agent.role.deposit
                }}))}
            >
                <View style={styles.listRow}>
                    <Image style={{ width: 22, height: 22 }} source={require('../../../res/images/ic-return.png')} />
                    <Text style={styles.listTile}>申请退还保证金</Text>
                </View>
            </ListItem>
        </List>
    </View>)
}

export default connect(getProps('agent'))(MyDeposit)

const styles = StyleSheet.create({
    header: {
        height: 40,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: barHeight
    },
    listTile: {
        fontSize: 15,
        fontWeight: '200',
        color: "#4a4a4a",
        marginLeft: 7,
        backgroundColor: "rgba(0,0,0,0)"
    },
    listContent: {
        fontSize: 15,
        color: "#7b7d8b",
        fontWeight: '200',
        backgroundColor: "rgba(0,0,0,0)"
    },
    listRow: {
        flexDirection: 'row', alignItems: "center"
    },
})