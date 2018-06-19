import React from 'react'

import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { container, barHeight } from '../../utils/index';

import { Back } from '../../router/back';

export const TeamLoading = () => {
    return (
        <View style={container}>
            <View style={styles.header}>
                <Back />
                <View style={{ flex: 1, }}><Text style={styles.headerTitle}>--的团队</Text></View>
                <View style={{ width: 100, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity >
                        <Text style={{ color: '#030303', fontSize: 14, marginRight: 12, textAlign: 'right' }}>--的上级</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView >
                <View style={{ backgroundColor: '#fff', paddingBottom: 10, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10, marginBottom: 10 }}>
                        <Image source={require('../../res/images/pic-profile-50.png')} style={{ width: 70, height: 70, borderRadius: 35 }} />
                    </View>
                    <View style={styles.row}>
                            <View style={styles.rowItem} >
                                <Text style={[styles.agentText, { textAlign: 'right' }]}>--</Text>
                            </View>
                            <View style={styles.rowItem} >
                                <Text style={styles.agentText}>--</Text>
                            </View>

                        </View>
                        <View style={[styles.row, { alignItems: 'flex-start' }]}>
                            <View style={styles.rowItem} ><Text style={[styles.agentText, { textAlign: 'right' }]}>等级:--</Text></View>
                            <View style={[{ flex: 1, justifyContent: "flex-start" }, styles.rowItem]} >
                                <Text style={styles.agentText}>余额：--元</Text>
                                <Text style={styles.agentText}>收入：--元</Text>
                            </View>
                        </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <View style={styles.line} />
                    <Text style={{ fontSize: 13, textAlign: 'center', color: '#343434' }}>--的下级</Text>
                    <View style={styles.line} />
                </View>

            </ScrollView>
        </View>
    )
}

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        marginTop: barHeight
    },
    headerTitle: {
        color: '#030303',
        fontSize: 16,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    line: {
        height: 1,
        width: 20,
        marginHorizontal: 5,
        backgroundColor: '#676767'
    },
    agentText: {
        fontSize: 14,
        color: '#343434',
        marginHorizontal: 8,
        marginBottom: 5

    },
    listTile: {
        fontSize: 13,
        fontWeight: '200',
        color: "#4a4a4a",
        marginLeft: 7
    },
    listContent: {
        fontSize: 13,
        color: "#7b7d8b",
        fontWeight: '200',
    },
    listRow: {
        flexDirection: 'row', alignItems: "center"
    },
    rowItem:{
        flex:1
    }
})