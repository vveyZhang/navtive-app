import { StackNavigator } from 'react-navigation'

import { navigationOptions } from './navigationOptions'

import Payments from '../components/main/payments/payments'

import PaymentsDetails from '../components/main/payments/payment.details'

import Withdrawals from "../components/main/payments/withdrawals"

const payMentsNavigator = StackNavigator({
    payments: {
        screen: Payments,
        navigationOptions: {
            headerTitle: '账户余额',
            header: null
        }
    },
    paymentsDetails: {
        screen: PaymentsDetails,
        navigationOptions: {
            headerTitle: "明细",
            ...navigationOptions
        }
    },
    withdrawals: {
        screen: Withdrawals,
        navigationOptions: {
            headerTitle: '提现',
            ...navigationOptions
        }
    },
}, {
        mode: 'card',
        headerMode: 'screen',
        initialRoute: 'payments'
    });


export default payMentsNavigator