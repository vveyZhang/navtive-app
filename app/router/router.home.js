import { TabBarBottom, TabNavigator } from 'react-navigation'

import React from 'react';

import { StyleSheet, Image } from 'react-native'

import Home from '../components/home/home';

import Shop from '../components/home/shop';

import Cart from '../components/home/cart';

import Mine from '../components/home/mine';


export const HomeNavigator = TabNavigator(
  {
    home: {
      screen: Home,
      path: 'home',
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? require('../res/images/ic-home-press.png') : require('../res/images/ic-home.png')}
            style={[styles.icon]}
          />
        ),
      }
    },
    shop: {
      screen: Shop,
      path: 'shop',
      navigationOptions: {
        tabBarLabel: '商城',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? require('../res/images/ic-shop-press.png') : require('../res/images/ic-shop.png')}
            style={[styles.icon]}
          />
        ),
      }
    },
    cart: {
      screen: Cart,
      path: 'car',
      navigationOptions: {
        tabBarLabel: '购物车',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? require('../res/images/ic-cart-press.png') : require('../res/images/ic-cart.png')}
            style={[styles.icon]}
          />
        ),
      }
    },
    mine: {
      screen: Mine,
      path: 'mine',
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? require('../res/images/ic-mine-press.png') : require('../res/images/ic-mine.png')}
            style={[styles.icon]}
          />
        ),
      }
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    scrollEnabled: true,
    pressOpacity: true,
    lazyLoad: true,
    pressColor: 'material',
    showIcon: true,
    tabBarOptions: {
      style: {
        height: 50,
        backgroundColor: '#fff',
        borderTopColor: 'rgba(0, 0, 0, 0.25)',
        borderTopWidth: 0.5,
      },
      labelStyle: {
        fontSize: 10,
        color: '#222222',
      },
    }
  },
)
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height:24,
  }
})