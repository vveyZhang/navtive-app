import React, { Component } from 'react';

import { View, Text, ScrollView, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import { List, Button, } from 'antd-mobile'

import { tipFail, tipSuccess } from '../../../utils/tips'

const ListItem = List.Item;

import { uploadPic } from '../../perfect/uploadPic'

import { connect } from 'react-redux';

import { NavigationActions, getProps } from '../../../utils/index';

import { request } from '../../../utils/request'

import { formatMobile } from '../../../utils/format'

// <View style={{backgroundColor:'#fff',position:'absolute',height:'100%',width:'100%',zIndex:22}}></View>
class MineCenter extends Component {
    updateAvatar = (url) => {
        const { dispatch } = this.props.navigation;
        request({
            url: '/update/avatar',
            data: {
                avatar: url
            }
        }).then(data => {
            if (data.error.ErrorCode != 0) return tipFail('更新失败');
            tipSuccess('更新成功')
            dispatch({ type: 'agent/queryAgent' })
        }
            )
    }
    render() {
        const { dispatch } = this.props
        const agent = this.props.agent.agent;
        return (
            <ScrollView style={{ height: '100%', backgroundColor: '#f3f5f9' }}>
                <List>
                    <ListItem

                        onClick={() => uploadPic(this.updateAvatar)}
                        arrow="horizontal"
                        extra={<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: agent.avatar }} />}
                    >
                        <Text style={styles.listTile}>头像</Text>

                    </ListItem>
                    <ListItem

                        extra={<Text style={styles.listContent}>{agent.name}</Text>}
                    >
                        <Text style={styles.listTile}>姓名</Text>

                    </ListItem>
                    <ListItem
                        extra={<Text style={styles.listContent}>{formatMobile(agent.phone)}</Text>}
                        onClick={() => { dispatch(NavigationActions.navigate({ routeName: 'ModifyPhone' })) }}
                        arrow="horizontal"
                    >
                        <Text style={styles.listTile}>修改手机</Text>
                    </ListItem>
                    <ListItem

                        onClick={() => { dispatch(NavigationActions.navigate({ routeName: 'ModifyPassword' })) }}
                        arrow="horizontal"
                    >
                        <Text style={styles.listTile}>修改登录密码</Text>
                    </ListItem>
                </List>
                <List style={{ marginTop: 20 }}>
                    {/* <ListItem
                        onClick={() => { }}
                        arrow="horizontal"
                        extra={<Text style={styles.listContent}>未授权</Text>}
                    >
                        <Text style={styles.listTile}>授权证书</Text>

                    </ListItem> */}
                    <ListItem
                        onClick={() => { dispatch(NavigationActions.navigate({ routeName: 'Idcard' })) }}
                        arrow="horizontal"
                        extra={<Text style={styles.listContent}>身份认证</Text>}
                    >
                        <Text style={styles.listTile}>已认证</Text>

                    </ListItem>
                </List>
                <List style={{ marginTop: 20 }}>
                    <ListItem

                        onClick={() => { dispatch(NavigationActions.navigate({ routeName: 'Address' })) }}
                        arrow="horizontal"
                    >
                        <Text style={styles.listTile}>常用地址</Text>
                    </ListItem>
                </List>
                {/* <List style={{ marginTop: 20 }}>
                    <ListItem

                        onClick={() => { }}
                        arrow="horizontal"
                    >
                        <Text style={styles.listTile}>清楚缓存</Text>
                    </ListItem>
                </List> */}
                <TouchableWithoutFeedback onPress={() => dispatch({ type: 'app/outlogin' })} >
                    <View style={styles.btn}  ><Text style={{ color: '#fff', fontSize: 14, padding: 0 }}> 退出登录</Text></View>
                </TouchableWithoutFeedback>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    listTile: {
        fontSize: 15,
        fontWeight: '200',
        color: "#4a4a4a",
        marginLeft: 7
    },
    listContent: {
        fontSize: 15,
        color: "#7b7d8b",
        fontWeight: '200',
    },
    btn: {
        width: '86%', marginLeft: '7%', marginRight: '7%', padding: 0, height: 40, marginBottom: 40, backgroundColor: "#ff5353", marginTop: 40, alignItems: 'center',
        justifyContent: 'center',
    }

})

export default connect(getProps('agent'))(MineCenter)