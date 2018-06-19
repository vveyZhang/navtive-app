import React from 'react';

import { menuStyles } from './menu.style'

import { View, TouchableWithoutFeedback, Text, Image, StyleSheet, ScrollView } from 'react-native';

import { WarehouseItem } from './row.item'

import { connect } from 'react-redux'

import { getProps, NavigationActions } from '../../../utils/index'

class WareHouseLocal extends React.PureComponent {
    linkto = (product_id, name) => {
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'goodsDtails', params: {
                id: product_id,
                name: name,
                isPurchase: true
            }
        }))
    }
    render() {
        const { store_items } = this.props.warehouse
        return (
            <View>
                <ScrollView>
                    {store_items.map((key, i) =>{
                        console.log(key)
                       return <WarehouseItem type="local" linkto={this.linkto} key={i} { ...key} />
                    })}
                </ScrollView>
            </View>
        )
    }
}

export default connect(getProps('warehouse'))(WareHouseLocal)

{/* <View>
<View style={menuStyles.menuSelect}>
    <View style={menuStyles.menuSelectItem} >
        <Text style={menuStyles.condition}>条件一</Text>
    </View>
    <View style={menuStyles.menuSelectItem} >
        <Text style={menuStyles.condition}>条件一</Text>
    </View>
</View>
<View style={menuStyles.menuBar}>
    <TouchableWithoutFeedback style={{ flex: 1 }}>
        <View style={menuStyles.menuItem}><Text style={[menuStyles.menuName]}>综合筛选</Text><View style={[menuStyles.icon, menuStyles.bottomIcon]}></View></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback style={{ flex: 1 }}>
        <View style={menuStyles.menuItem}><Text style={[menuStyles.menuName]}>价格</Text>
            <View>
                <View style={[menuStyles.icon, menuStyles.topIcon]}></View>
                <View style={[menuStyles.icon, menuStyles.bottomIcon]}></View>
            </View>
        </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback style={{ flex: 1 }}>
        <View style={menuStyles.menuItem}><Text style={[menuStyles.menuName]}>销量</Text>
            <View>
                <View style={[menuStyles.icon, menuStyles.topIcon]}></View>
                <View style={[menuStyles.icon, menuStyles.bottomIcon]}></View>
            </View>
        </View>
    </TouchableWithoutFeedback>
</View>
</View> */}