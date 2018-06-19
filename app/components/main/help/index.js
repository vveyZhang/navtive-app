import React from 'react';

import { View, Image, Text, Linking } from 'react-native'
import { List } from 'antd-mobile'
import { styles } from '../center/style'
import { telPhone } from '../../../utils/index'

const ListItem = List.Item;
const MineHelp = (props) => {
    return (
        <View style={{ height: "100%", backgroundColor: '#f3f5f9' }}>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Image style={{ width: 150, height: 150, shadowColor: 'rgba(0,0,0,0.4)', backgroundColor: '#fff' }} source={require('../../../res/images/logo-512.png')} />
                <Text style={{ color: '#383f4a', fontSize: 12, marginTop: 10 }}>公司微信销售客服</Text>
                <Text style={{ color: '#4b4e53', fontSize: 10, fontWeight: '100', marginTop: 4 }} >BERKGEN伯克生物</Text>
            </View>
            <List style={{ marginTop: 30 }}>
                <ListItem
                    onClick={() => { Linking.openURL(`tel:${telPhone}`) }}
                    arrow="horizontal"
                >
                    <View style={styles.listRow}>
                        <Image style={{ width: 22, height: 22 }} source={require('../../../res/images/ic-phone.png')} />
                        <Text style={styles.listTile}>联系总部</Text>
                    </View>
                </ListItem>
            </List>
        </View>
    )
}
export default MineHelp