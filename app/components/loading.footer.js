
import React from 'react'

import { View, Text, StyleSheet } from 'react-native';

export const LoadingFooter = (props) => {
    const isAll = props.isAll || false;
    const loading = props.loading
   
    if(props.hidden) return <View></View>
    return (<View style={styles.container}>
        <View style={styles.line} />
        {isAll ? <Text style={styles.footerText}>已全部加载</Text> : <Text style={styles.footerText}>{!loading ? '上拉加载更多' : "正在加载"}</Text>}
        <View style={styles.line} />
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25
    },
    line: {
        height: 1,
        width: 30,
        backgroundColor: '#666666',
        marginHorizontal: 8
    },
    footerText: {
        fontSize: 13,
        color: '#666666',
        textAlign:'center'
    }
})