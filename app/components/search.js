import React from 'react';

import { TextInput, View, Text, StyleSheet } from 'react-native'

import { barHeight, container } from '../utils/index'

const Search = (props) => {
    return (
        <View style={[container, { backgroundColor: "#ffffff" }]} >
            <View style={styles.header} >
                <TextInput underlineColorAndroid='rgba(0,0,0,0)' placeholder="加乐活" placeholderTextColor="#9b9b9b" style={styles.searchInput} />
                <Text style={styles.searchBtn}>搜索</Text>
            </View>
            <View style={{ paddingHorizontal: 10,paddingVertical:5 }} >
                <View style={{ marginVertical: 5 }} >
                    <Text style={{fontSize:14,color:"#585c64"}} >历史搜索</Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}} >
                    <Text style={styles.item} >加乐活</Text>
                    <Text style={styles.item} >加乐活</Text>
                    <Text style={styles.item} >加乐活</Text>
                    <Text style={styles.item} >加乐活</Text>
                    <Text style={styles.item} >加2乐活</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        paddingTop: barHeight + 10,
        backgroundColor: "#f3f5f9",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    searchInput: {
        paddingHorizontal: 10,
        fontSize: 14,
        lineHeight: 38,
        padding: 0,
        height: 32,
        flex: 1,
        marginRight: 8,
        color: "#333333",
        borderRadius: 16,
        backgroundColor: "#ffffff"
    },
    searchBtn: {
        fontSize: 14,
        color: "#333333",
        lineHeight: 14,
        paddingVertical: 9,
        paddingHorizontal: 4
    },
    item:{
        lineHeight:14,
        backgroundColor:"#f0f0f0",
        fontSize:14,
        color:'#585c64',
        textAlign:"center",
        paddingHorizontal:12,
        paddingVertical:8,
        borderRadius:16,
        marginRight:12,
        marginTop:12
    }
})

export default Search