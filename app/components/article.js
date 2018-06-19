import React, { Component } from "react";
import { connect } from "react-redux";
import { WebView } from "react-native";

@connect(({ home }) => ({
  news: home.news
}))
export default class Article extends Component {
  render() {
    const index = this.props.navigation.state.params.index;
    const article = this.props.news[index];
    return (
      <WebView source={{ uri: article.Payload.content.news_item[0].url }} style={{height:'100%'}} />
    );
  }
}
