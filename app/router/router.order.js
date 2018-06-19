import { StackNavigator } from 'react-navigation'

import React from 'react';

import { navigationOptions } from './navigationOptions'

import OrderAddress from '../components/order/order.address';

import CreateOrder from '../components/order/create.order';

import { TouchableOpacity, Text } from 'react-native'

import { NavigationActions } from '../utils/index';

import Order from '../components/order/index';

import PayOrder from '../components/order/pay.order'

import OrderDetails from '../components/order/details.order'

import { Back } from './back';

import AddAddress from '../components/main/center/add.address';

import EditorAddress from '../components/main/center/editor.address';

import OrderDeliver from '../components/order/order.deliver'

import { filterOrderType } from '../components/order/filter'

const orderNavigator = StackNavigator(
    {
        orderCenter: {
            screen: Order,
            navigationOptions: ({ navigation }) => {
                const type =!navigation.state.params||!navigation.state.params.order_type?1:navigation.state.params.order_type;
                return ({
                    headerTitle: `${filterOrderType(type)}订单`,
                    ...navigationOptions,
                })
            }
        },
        createOrder: {
            screen: CreateOrder,
            navigationOptions: {
                headerTitle: '填写订单',
                ...navigationOptions,
                gesturesEnabled: false
            }
        },
        orderDetails: {
            screen: OrderDetails,
            navigationOptions: {
                headerTitle: '订单性情',
                ...navigationOptions,
            }
        },
        orderDeliver: {
            screen: OrderDeliver,
            navigationOptions: {
                headerTitle: '确认发货',
                ...navigationOptions,
            }
        },
        payOrder: {
            screen: PayOrder,
            navigationOptions: {
                headerTitle: '订单支付',
                ...navigationOptions,
                gesturesEnabled: false
            }
        },
        orderAddress: {
            screen: OrderAddress,
            navigationOptions: ({ navigation }) => {
                return ({
                    headerTitle: '选择地址',
                    ...navigationOptions,
                    headerRight: <TouchableOpacity
                        style={{ width: 100 }}
                        onPressIn={() => navigation.dispatch(NavigationActions.navigate({
                            routeName: 'orderAddAddress',
                        }))}>
                        <Text style={{ color: '#030303', fontSize: 14, marginRight: 12, textAlign: 'right' }}>新增地址</Text>
                    </TouchableOpacity>,
                })
            }
        },
        orderAddAddress: {
            screen: AddAddress,
            navigationOptions: ({ navigation }) => ({
                headerTitle: '添加地址',
                ...navigationOptions,
            })
        },
        orderEditorAddress: {
            screen: EditorAddress,
            navigationOptions: ({ navigation }) => ({
                headerTitle: '修改地址',
                ...navigationOptions,
            })
        }
    }, {
        mode: 'card',
        headerMode: 'screen',
        initialRoute: 'orderCenter'
    }
)

export default orderNavigator