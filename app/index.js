import React from "react";

import { AppRegistry, StyleSheet } from "react-native";

import dva from "./utils/dva";

import Router from "./router";

import appModel from "./models/app";

import routerModel from "./models/router";

import addressModel from "./models/agent";

import goodsModel from "./models/shop/goods";

import cartModel from "./models/shop/cart";

import createOrderModel from "./models/order/create.order";

import orderModel from "./models/order/order";

import payOrderModel from "./models/order/payOrder";

import orderDetailsModel from "./models/order/order.details";

import TeamModel from "./models/center/team";

import accountModel from "./models/myAccount";

import warehouseModel from "./models/warehouse";

import paymentsModel from "./models/payments";

import paymentsDetailsModel from "./models/payments.details";

import homeModel from "./models/home";

import { tipOffline } from "./utils/tips";

import { NavigationActions } from "./utils/index";

import SplashScreen from "react-native-splash-screen";

const app = dva({
  initialState: {},
  models: [
    appModel,
    routerModel,
    addressModel,
    goodsModel,
    cartModel,
    createOrderModel,
    orderModel,
    payOrderModel,
    orderDetailsModel,
    TeamModel,
    accountModel,
    warehouseModel,
    paymentsModel,
    paymentsDetailsModel,
    homeModel
  ]
});

export const store = app.getStore();

const App = app.start(<Router />);

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}

export default App;
