import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation'

import React, { PureComponent } from 'react'

import { BackHandler, Animated, Easing, Text, View, Image, StatusBar, Platform } from 'react-native'

import { connect } from 'react-redux'

import Login from '../components/login/index'

import Perfect from '../components/perfect/index'

import { MainNavigator } from './router.main'

// import Loading from '../components/loading'

import { Back } from './back'

import Auditing from '../components/auditing'

import Agree from '../components/agree'

import { navigationOptions } from './navigationOptions'


const AppNavigator = StackNavigator(
  {
    login: {
      screen: Login,
      path: ' login',
      navigationOptions: {
        header: null
      }
    },
    main: {
      screen: MainNavigator,
      path: 'main',
      navigationOptions: {
        header: null
      }
    },
    perfect: {
      screen: Perfect,
      path: 'perfect',
      navigationOptions: {
        header: null
      }
    },
    agree: {
      screen: Agree,
      path: 'agree',
      navigationOptions: {
        ...navigationOptions,
        title: '代理协议',
        headerLeft: <Back backRouteName={'login'} />
      }
    },

    auditing: {
      screen: Auditing,
      path: 'auditing',
      navigationOptions: {
        ...navigationOptions,
        title: '待审核',
        headerLeft: <Back backRouteName={'login'} />,
        gesturesEnabled: false
      }
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
    initialRoute: 'main',
    headerMode: 'screen',
    mode: 'card',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initWidth
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })
        return { opacity, transform: [{ translateX }] }
      },
    }),
  }
)


function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}
@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
  }
  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen == 'login') {
      return true
    }
    if (currentScreen == "home" || currentScreen == "shop" || currentScreen == "cart" || currentScreen == "mine" || currentScreen == 'auditing') {
      return false
    }
    this.props.dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { dispatch, app, router } = this.props;
    const navigation = addNavigationHelpers({ dispatch, state: router })
    return <View style={{ height: "100%", backgroundColor: "#f3f5f9" }}>
      <StatusBar backgroundColor={
        Platform.OS == "ios" ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)'}
        translucent
        hidden={false}
        barStyle='dark-content' />
      <AppNavigator navigation={navigation} />
    </View>


  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}


export default Router;