import { StackNavigator } from 'react-navigation'

import { navigationOptions } from './navigationOptions'

import Warehouse from '../components/main/warehose'

const warehouseNavigator = StackNavigator({
    warehouse: {
        screen: Warehouse,
        navigationOptions: {
            headerTitle:'我的仓库',
            ...navigationOptions
        }
    }

}, {
        mode: 'card',
        headerMode: 'screen',
        initialRoute: 'warehouse'
    });


export default warehouseNavigator