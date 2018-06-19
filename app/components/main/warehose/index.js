import React from 'react';

import { View } from 'react-native';

import { Tabs } from 'antd-mobile'

import { container } from '../../../utils/index'

import { connect } from 'react-redux'

import WareHouseCloud from './cloud'

import WareHouseLocal from './local'

const tabs = [
    { title: "云仓库" },
    { title: "本地仓库" },
];
class Warehouse extends React.PureComponent {
    componentWillMount() {
        this.props.dispatch({ type: "warehouse/queryWarehouse" })
    }
    render() {
        return (
            <View style={container}>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarUnderlineStyle={{ width: 60, backgroundColor: "#3a76d2" }}
                    style={{ height: 40, backgroundColor: 'rgba(0,0,0,0)' }}
                    tabBarActiveTextColor="#3a76d2"
                    tabBarInactiveTextColor="#585c64"
                >
                    <WareHouseCloud />
                    <WareHouseLocal />
                </Tabs>
            </View>
        )
    }
}

export default connect()(Warehouse)

