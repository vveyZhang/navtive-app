import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  WebView
} from "react-native";
import {
  List,
  InputItem,
  WhiteSpace,
  WingBlank,
  Button,
  Modal
} from "antd-mobile";
import { createForm } from "rc-form";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { getProps } from "../../utils/index";
import storage from "../../utils/storage";
import { tipFail } from "../../utils/tips";
import SplashScreen from "react-native-splash-screen";
class Login extends Component {
  state = {
    phone: "",
    password: ""
  };
  componentWillMount() {
    const { dispatch } = this.props;
    storage.get("user").then(user => {
      if (user && user.status) {
        dispatch({ type: "app/autoLogin", user });
      }
      if(user)
        this.setState({
          phone: user.phone,
          password: user.password
        });
      setTimeout(() => SplashScreen.hide(), 2000);
    });
  }
  goLogin = () => {
    const { getFieldsError, getFieldsValue } = this.props.form;
    const errs = getFieldsError();
    for (let err in errs) {
      if (errs[err]) {
        tipFail(errs[err][0]);
        return;
      }
    }
    for (let err in getFieldsValue()) {
      if (!getFieldsValue()[err]) {
        tipFail("手机号或密码不能为空");
        return;
      }
    }
    this.props.dispatch({ type: "app/login", user: { ...getFieldsValue() } });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { app } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderColor: "#f3f5f9",
              borderWidth: 1
            }}
            source={require("../../res/images/logo.jpg")}
          />
        </View>
        <View style={{ margin: "10%", marginTop: "15%" }}>
          <InputItem
            {...getFieldProps("phone", {
              initialValue: this.state.phone,
              rules: [
                {
                  required: true,
                  message: "手机号不能为空"
                }
              ]
            })}
            clear
            type="number"
            placeholder="输入手机号"
          >
            手机号
          </InputItem>
          <WhiteSpace style={{ marginTop: 20 }} />
          <InputItem
            type="password"
            {...getFieldProps("password", {
              initialValue: this.state.password,
              rules: [
                {
                  required: true,
                  message: "密码不能为空"
                }
              ]
            })}
            clear
            placeholder="输入密码"
          >
            密码
          </InputItem>
          <WhiteSpace style={{ marginTop: 20 }} />

          <WingBlank style={{ marginTop: 40 }}>
            <Button type="primary" onClick={() => this.goLogin()}>
              登录
            </Button>
          </WingBlank>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: "100%",
    width: "100%"
  },
  logo: {
    alignItems: "center",
    marginTop: "15%"
  }
});
export default connect(getProps("app"))(createForm()(Login));
