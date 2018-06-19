import { StackNavigator } from 'react-navigation'

import { navigationOptions } from './navigationOptions'

import MyTeam from "../components/main/myTeam"

import MyTeamOther from "../components/main/myTeamOther"

const TeamNavigator = StackNavigator({
    myTeam: {
        screen: MyTeam,
        navigationOptions: {
            header: null,
        }
    },
    myTeamOther: {
        screen: MyTeamOther,
        navigationOptions: {
            header: null,
        }
    },
}, {
        mode: 'card',
        headerMode: 'screen',
        initialRoute: 'myTeam'
    });


export default TeamNavigator