import React, { Component } from "react";

import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  WebView,
  TouchableWithoutFeedback
} from "react-native";

import { NoticeBar } from "antd-mobile";

import { barHeight, NavigationActions } from "../../utils/index";

import storage from "../../utils/storage";

import { connect } from "react-redux";
@connect(({ home }) => ({
  news: home.news
}))
export default class Home extends Component {
  componentWillMount() {
    this.props.dispatch({ type: "home/queryAricle" });
  }
  render() {
    const { news } = this.props;
    return (
      <ScrollView style={{ height: "100%", backgroundColor: "#f3f5f9" }}>
        <ImageBackground
          style={{ width: "100%", height: 185 }}
          source={require("../../res/images/pic-banner.jpg")}
        >
          <View style={styles.header}>
            <Image
              source={require("../../res/images/ic-like.png")}
              style={styles.headerIcon}
            />
            <View style={styles.headerSearch}>
              <Image
                source={require("../../res/images/ic-search.png")}
                style={styles.headerIcon}
              />
              <Text style={{ fontSize: 14, color: "#9b9b9b" }}>
                加乐活多肽蛋白质粉
              </Text>
            </View>
            <Image
              source={require("../../res/images/ic-chat.png")}
              style={styles.headerIcon}
            />
          </View>
        </ImageBackground>
        <View style={styles.homeEnter}>
          <View style={styles.enterItem}>
            <View style={[styles.enterIcon, { backgroundColor: "#1db777" }]} />
            <Text style={styles.enterName}>加乐活系列</Text>
          </View>
          <View style={styles.enterItem}>
            <View style={[styles.enterIcon, { backgroundColor: "#fa980d" }]} />
            <Text style={styles.enterName}>尘肺领域</Text>
          </View>
          <View style={styles.enterItem}>
            <View style={[styles.enterIcon, { backgroundColor: "#33a4f8" }]} />
            <Text style={styles.enterName}>眼睛领域</Text>
          </View>
          <View style={styles.enterItem}>
            <View style={[styles.enterIcon, { backgroundColor: "#ffbf05" }]} />
            <Text style={styles.enterName}>特医领域</Text>
          </View>
        </View>
        {/* <View style={styles.notice}>
                <NoticeBar style={{ backgroundColor: '#fff' }} marqueeProps={{ loop: true, style: { paddingHorizontal: 7 } }}>
                    <Text style={styles.noticeItem}>测试测试测试测试测试测试测试测试测试测试</Text>
                    <Text style={styles.noticeItem}>测试测试测试测试测试测试测试测试测试测试</Text>
                </NoticeBar>
            </View> */}
        {/* <View style={styles.seriesContainer} />
        <View /> */}
        {this.props.news.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() =>
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: "article",
                  params: {
                    index: index
                  }
                })
              )
            }
          >
            <View style={styles.articleContainer}>
              <View style={styles.articleTitle}>
                <Text style={styles.articleTitleText}>{item.Title}</Text>
              </View>
              <Image
                source={{ uri: item.Image }}
                style={{ width: "100%", height: 200 }}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginTop: 12,
    paddingVertical: 10
  },
  articleTitle: {
    marginBottom: 10
  },
  articleTitleText: {
    fontSize: 14,
    color: "#343434",
    lineHeight: 26
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10 + barHeight
  },
  headerIcon: {
    width: 32,
    height: 32
  },
  headerSearch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
    height: 32,
    borderRadius: 16
  },
  homeEnter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#fff"
  },
  enterItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  },
  enterIcon: {
    width: 42,
    height: 42,
    borderRadius: 16
  },
  enterName: {
    fontSize: 12,
    color: "#585c64",
    fontWeight: "200",
    textAlign: "center",
    marginTop: 7
  },
  notice: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderTopColor: "#f0f0f0",
    borderTopWidth: 1
  },
  noticeItem: {
    fontSize: 12,
    color: "#585c64",
    fontWeight: "200",
    marginRight: 30
  },
  seriesContainer: {
    height: 98
  }
});
