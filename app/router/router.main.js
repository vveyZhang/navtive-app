import React from "react";

import { StackNavigator } from "react-navigation";

import { HomeNavigator } from "./router.home";

import { CenterNavigator } from "./router.center";

import payMentsNavigator from "./router.payments";

import depositNavigator from "./router.deposit";

import orderNavigator from "./router.order";

import warehouseNavigator from "./router.warehome";

import myAccountNavigator from "./router.myAccount";

import MineHelp from "../components/main/help/index";

import GoodsDetails from "../components/shop/goods.details";

import InviteCode from "../components/main/qrcode";

import MyAccount from "../components/main/myAccount";

import { navigationOptions } from "./navigationOptions";

import Article from "../components/article";

import TeamNavigator from "./router.team";

export const MainNavigator = StackNavigator(
  {
    HomeNavigator: {
      screen: HomeNavigator,
      navigationOptions: {
        header: null
      },
      gesturesEnabled: false
    },
    centerNavigator: {
      screen: CenterNavigator,
      navigationOptions: {
        header: null
      }
    },
    teamNavigator: {
      screen: TeamNavigator,
      navigationOptions: {
        header: null
      }
    },
    orderNavigator: {
      screen: orderNavigator,
      navigationOptions: {
        header: null
      }
    },
    payMentsNavigator: {
      screen: payMentsNavigator,
      navigationOptions: {
        header: null
      }
    },
    depositNavigator: {
      screen: depositNavigator,
      navigationOptions: {
        header: null
      }
    },
    warehouseNavigator: {
      screen: warehouseNavigator,
      navigationOptions: {
        header: null
      }
    },
    myAccountNavigator: {
      screen: myAccountNavigator,
      navigationOptions: {
        header: null
      }
    },
    goodsDtails: {
      screen: GoodsDetails,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.name,
        ...navigationOptions
      })
    },
    MineHelp: {
      screen: MineHelp,
      navigationOptions: {
        headerTitle: "联系总部",
        ...navigationOptions
      }
    },
    myCode: {
      screen: InviteCode,
      navigationOptions: {
        headerTitle: "我的邀请码",
        ...navigationOptions
      }
    },
    article: {
      screen: Article,
      path: "article",
      navigationOptions: {
        headerTitle: "文章詳情",
        ...navigationOptions
      }
    }
  },
  {
    mode: "card",
    headerMode: "screen",
    initialRoute: "HomeNavigator"
  }
);
