import { StackNavigator } from 'react-navigation'

import { navigationOptions } from './navigationOptions'

import MyAccount from '../components/main/myAccount'

import AddAlipay from '../components/main/myAccount/add.alipay'

import EditorAlipay from '../components/main/myAccount/editor.alipay'

import EditorAccount from '../components/main/myAccount/editor.back'

import AddBack from '../components/main/myAccount/add.back'

const myAccountNavigator = StackNavigator({
    myAccount: {
        screen: MyAccount,
        navigationOptions: {
            headerTitle: '收款账号',
            ...navigationOptions
        }
    },
    addAlipay: {
        screen: AddAlipay,
        navigationOptions: {
            headerTitle: '添加支付宝账号',
            ...navigationOptions
        }
    },
    editorAlipay: {
        screen: EditorAlipay,
        navigationOptions: {
            headerTitle: '修改支付宝账号',
            ...navigationOptions
        }
    },
    addBack: {
        screen: AddBack,
        navigationOptions: {
            headerTitle: '添加银行卡',
            ...navigationOptions
        }
    },
    editorAccount: {
        screen: EditorAccount,
        navigationOptions: {
            headerTitle: '修改银行卡',
            ...navigationOptions
        }
    },

}, {
        mode: 'card',
        headerMode: 'screen',
        initialRoute: 'myAccount'
    });


export default myAccountNavigator