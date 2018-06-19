import React from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getProps, NavigationActions } from '../utils/index'

const Agree = (props) => {
    const { dispatch } = props;
    console.log(props)
    return (<View style={{ height: "100%", backgroundColor: '#fff' }} >
        <ScrollView style={{ height: "100%", }} >
            <View style={{ paddingBottom: 45, paddingTop: 30, paddingHorizontal: 25 ,}}>
                <Text style={{fontSize:10,color:"#333333"}} >{props.app.content}</Text>
            </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', paddingHorizontal: 15, backgroundColor: "#fff", height: 45, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.refuse} onPress={() => {
                dispatch(NavigationActions.back())
            }} >拒绝</Text>
            <Text onPress={()=>{
                 dispatch(NavigationActions.navigate({ routeName: 'perfect'}))
            }} style={styles.agree} >同意</Text>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    refuse: {
        borderColor: "#3a76d2",
        color: '#3a76d2',
        fontSize: 14,
        lineHeight: 14,
        paddingVertical: 7,
        borderWidth: 1,
        width: 78,
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign:'center',
        marginHorizontal:10,
        borderRadius:4
    },
    agree: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 14,
        paddingVertical: 8,
        backgroundColor: '#3a76d2',
        width: 80,
        textAlign:'center',
        marginHorizontal:10,
        borderRadius:4
    }

})
export default connect(getProps('app'))(Agree)