
import React from 'react';

import { View, Text, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { List } from 'antd-mobile'

import { connect } from 'react-redux'

import { NavigationActions, barHeight, container } from '../../utils/index'
import { formatMobile } from '../../utils/format'

import moneyIcon from '../../res/images/ic-money.png'
import teamIcon from '../../res/images/ic-team.png'
import warehouseIcon from '../../res/images/ic-warehouse.png'
import buyIcon from '../../res/images/ic-buy.png'
import saleIcon from '../../res/images/ic-sale.png'

const ListItem = List.Item;

class Mine extends React.PureComponent {
    componentWillMount() {
        this.props.dispatch({ type: 'agent/queryAgent' });
    }
    render() {
        const { dispatch } = this.props;
        const { agent, role } = this.props.agent;
        const level = agent.level
        return (
            <View style={container}>
                <View style={{ backgroundColor: '#ffffff', height: barHeight }}></View>
                <ScrollView>
                    <View style={styles.headerTop}>
                        <TouchableWithoutFeedback onPress={() => dispatch(NavigationActions.navigate({ routeName: 'centerNavigator' }))}>
                            <View style={styles.header}>
                                <View style={{ flex: 1, marginTop: 8 }}>
                                    <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', }}>
                                        <Text style={styles.name}>{agent.name}</Text><Text style={styles.level}>lV.{level}</Text>
                                    </View>
                                    <Text style={styles.phone}>{formatMobile(agent.phone)}</Text>
                                </View>
                                <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={agent.avatar ? { uri: agent.avatar } : require('../../res/images/pic-profile-50.png')} />
                                    <Image style={{ width: 16, height: 16, marginLeft: 8 }} source={require('../../res/images/right.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.headerBar}>
                            <Text style={{ color: '#4a4a4a', fontSize: 13, marginRight: 20 }} >代理等级：{role ? role.level_name : null}</Text>
                            <Text style={{ color: '#4a4a4a', fontSize: 13 }} >账户余额：{agent.balance / 100}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#ffffff", marginVertical: 10 }}>
                        <View style={styles.gridRow} >
                            <TouchableWithoutFeedback
                                onPress={() => { dispatch(NavigationActions.navigate({ routeName: 'payMentsNavigator' })) }}
                                style={styles.gridItem}>
                                <View style={styles.gridItem}>
                                    <Image source={moneyIcon} style={styles.gridIcon} />
                                    <Text style={styles.gridText}>我的财富</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.gridLine}></View>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    dispatch(NavigationActions.navigate({
                                        routeName: 'teamNavigator', params: {
                                            agent_id: agent.id,
                                            first: true
                                        }
                                    }))
                                }}
                                style={styles.gridItem}>
                                <View style={styles.gridItem}>
                                    <Image source={teamIcon} style={styles.gridIcon} />
                                    <Text style={styles.gridText}>我的团队</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.gridLine}></View>
                            <TouchableWithoutFeedback
                                onPress={() => dispatch(NavigationActions.navigate({ routeName: 'warehouseNavigator' }))}
                                style={styles.gridItem}>
                                <View style={styles.gridItem}>
                                    <Image source={warehouseIcon} style={styles.gridIcon} />
                                    <Text style={styles.gridText}>我的仓库</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.gridLine2} />
                        <View style={styles.gridRow} >
                            <TouchableWithoutFeedback
                                onPress={() => dispatch(NavigationActions.navigate({
                                    routeName: 'orderNavigator', params: {
                                        order_type: 1
                                    }
                                }))}
                                style={styles.gridItem}>
                                <View style={styles.gridItem}>
                                    <Image source={buyIcon} style={styles.gridIcon} />
                                    <Text style={styles.gridText}>采购订单</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.gridLine}></View>
                            <TouchableWithoutFeedback
                                onPress={() => dispatch(NavigationActions.navigate({
                                    routeName: 'orderNavigator', params: {
                                        order_type: 2
                                    }
                                }))}
                                style={styles.gridItem}>
                                <View style={styles.gridItem}>
                                    <Image source={saleIcon} style={styles.gridIcon} />
                                    <Text style={styles.gridText}>取货订单</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.gridLine}></View>
                            <View style={styles.gridItem}>
                                <TouchableWithoutFeedback
                                    onPress={() => dispatch(NavigationActions.navigate({
                                        routeName: 'orderNavigator', params: {
                                            order_type: 3
                                        }
                                    }))}
                                    style={styles.gridItem}>
                                    <View style={styles.gridItem}>
                                        <Image source={buyIcon} style={styles.gridIcon} />
                                        <Text style={styles.gridText}>销售订单</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <List style={{ marginBottom: 20 }}>

                        <ListItem
                            onClick={() => { dispatch(NavigationActions.navigate({ routeName: 'depositNavigator' })) }}
                            arrow="horizontal"
                            extra={<Text style={styles.listContent}>已缴纳</Text>}
                        >
                            <View style={styles.listRow}>
                                <Image style={styles.icon} source={require('../../res/images/ic-cash.png')} />
                                <Text style={styles.listTile}>保证金</Text>
                            </View>
                        </ListItem>
                        <ListItem
                            onClick={() => { dispatch(NavigationActions.navigate({ routeName: 'myAccountNavigator' })) }}
                            arrow="horizontal"
                        >
                            <View style={styles.listRow}>
                                <Image style={styles.icon} source={require('../../res/images/ic-collection.png')} />
                                <Text style={styles.listTile}>收款账号</Text>
                            </View>
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                dispatch(NavigationActions.navigate({
                                    routeName: 'myCode', params: {
                                        level: level
                                    }
                                }))
                            }}
                            arrow="horizontal"
                        >
                            <View style={styles.listRow}>
                                <Image style={styles.icon} source={require('../../res/images/ic-friend.png')} />
                                <Text style={styles.listTile}>我的邀请码</Text>
                            </View>
                        </ListItem>
                        <ListItem

                            onClick={() => { dispatch(NavigationActions.navigate({ routeName: 'MineHelp' })) }}
                            arrow="horizontal"
                        >
                            <View style={styles.listRow}>
                                <Image style={styles.icon} source={require('../../res/images/ic-contact.png')} />
                                <Text style={styles.listTile}>联系总部</Text>
                            </View>
                        </ListItem>
                    </List>
                </ScrollView>
            </View>
        )
    }
}
function getProps() {
    return (state) => {
        return {
            agent: state.agent,
            router: state.router
        }
    }
}
export default connect(getProps())(Mine);

const styles = StyleSheet.create({
    gridRow: {
        flexDirection: 'row'
    },
    gridIcon: {
        width: 28,
        height: 28
    },
    gridText: {
        fontSize: 14,
        color: '#585c64',
        marginTop: 8
    },
    gridItem: {
        height: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridLine: {
        height: 100,
        width: 1,
        backgroundColor: "#e8eaee"
    },
    gridLine2: {
        height: 1,
        backgroundColor: "#e8eaee"
    },
    headerTop: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: '#e8eaee'
    },
    header: {
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    icon: { width: 22, height: 22 },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,

    },
    name: {
        fontSize: 16,
        fontWeight: '400',
        color: '#030303',
        lineHeight: 20
    },
    level: {
        color: "#fff",
        fontSize: 10,
        lineHeight: 10,
        backgroundColor: '#3a76d2',
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 8,
        marginLeft: 8,
        paddingVertical: 3

    },
    phone: {
        color: "#b0b3c1",
        fontSize: 12,
        lineHeight: 16
    },
    amountContainer: {
        flex: 1, alignItems: 'center',
    },
    amountName: {
        fontSize: 12,
        color: '#3a76d2',
        textAlign: 'center'
    },
    amount: {
        fontSize: 15,
        color: '#3a76d2',
        fontWeight: '200',

    },
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
    listRow: {
        flexDirection: 'row', alignItems: "center"
    }
})