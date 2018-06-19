import { StackNavigator } from 'react-navigation'

import { HomeNavigator } from './router.home';

import { Back } from './back.js'

import { TouchableOpacity, Text } from 'react-native'

import React from 'react'

import MineCenter from '../components/main/center/index'

import ModifyPassword from '../components/main/center/modify.password';

import ModifyPhone from '../components/main/center/modify.phone';

import Idcard from '../components/main/center/idcard'

import Address from '../components/main/center/address'

import { NavigationActions } from '../utils/index';

import AddAddress from '../components/main/center/add.address';

import EditorAddress from '../components/main/center/editor.address';

import { navigationOptions } from './navigationOptions';



export const CenterNavigator = StackNavigator({
    MineCenter: {
        screen: MineCenter,
        navigationOptions: {
            headerTitle: '个人中心',
            ...navigationOptions
        }
    },
    ModifyPassword: {
        screen: ModifyPassword,
        navigationOptions: {
            headerTitle: '修改密码',
            ...navigationOptions
        }
    },
    ModifyPhone: {
        screen: ModifyPhone,
        navigationOptions: {
            headerTitle: '修改手机号',
            ...navigationOptions
        }
    },
    Idcard: {
        screen: Idcard,
        navigationOptions: {
            headerTitle: '身份认证',
            ...navigationOptions
        }
    },
    Address: {
        screen: Address,
        navigationOptions: ({ navigation }) => {
            return ({
                headerTitle: '发货地址',
                ...navigationOptions,
                headerRight: <TouchableOpacity onPressIn={() => navigation.dispatch(NavigationActions.navigate({ routeName: 'AddAddress' }))}>
                    <Text style={{ color: '#030303', fontSize: 14, marginRight: 12 }}>新增地址</Text></TouchableOpacity>,
            })
        }
    },
    AddAddress: {
        screen: AddAddress,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '添加地址',
            ...navigationOptions,
        })
    },
    EditorAddress: {
        screen: EditorAddress,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '修改地址',
            ...navigationOptions,
        })
    }

},
    {
        mode: 'card',
        headerMode: 'screen',
        initialRoute: 'MineCenter'
    }
)
