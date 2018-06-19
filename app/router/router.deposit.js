import { StackNavigator } from 'react-navigation'

import { navigationOptions } from './navigationOptions'

import MyDeposit from '../components/main/myDeposit/myDeposit'

import ReturnDeposit from '../components/main/myDeposit/return.deposit'

const depositNavigator = StackNavigator({
    myDeposit: {
        screen: MyDeposit,
        navigationOptions: {
            header: null
        }
    },
    returnDeposit:{
        screen: ReturnDeposit,
        navigationOptions: {
            headerTitle:"退还保证金",
            ...navigationOptions
        }
    }

}, {
        mode: 'card',
        headerMode: 'screen',
        initialRoute: 'myDeposit'
    });


export default depositNavigator