import React from 'react'

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'

import { List } from 'antd-mobile';

import { container, barHeight } from '../../utils/index';

import { formatMobile } from '../../utils/format'

import { Back } from '../../router/back';

import { connect } from 'react-redux';

import { getProps, NavigationActions } from '../../utils/index';

import { TeamLoading, styles } from './team.loading';

const ListItem = List.Item;

import roleStore from '../../models/role.store'

class MyTeam extends React.PureComponent {
    componentWillMount() {
        const agent_id = this.props.navigation.state.params.agent_id;
        this.queryAgent(agent_id)
    }
    queryAgent = (agent_id) => {
        this.props.dispatch({
            type: "team/queryAgent", team: {
                index: 'pageOne',
                agent_id: agent_id
            }
        });
    }
    checkOther = (agent_id) => {
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'myTeamOther', params: {
                agent_id: agent_id
            }
        }))
    }
    render() {
        const { agent_id } = this.props.team;
        const loading = this.props.team.loading;
        const currentStack = this.props.team.stack.pageOne;
        if (loading || currentStack.length <= 0) return <TeamLoading />
        const { master, isMine, agent, agents, } = currentStack[currentStack.length - 1];
        const sex = agent.sex ? "他" : "她"
        const info = isMine ? "我" : sex;
        const first = this.props.navigation.state.params.first;
     
        return (
            <View style={container}>
                <View style={styles.header}>
                    <Back backRouteName={first ? null : 'myTeam'} params={{ agent_id: agent_id, first: true }} />
                    <View style={{ flex: 1, }}><Text style={styles.headerTitle}>{info}的团队</Text></View>
                    <View style={{ width: 100, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            master.level == 0 ? null : <TouchableOpacity style={{ width: 100 }} onPressIn={() => {
                                this.checkOther(master.id)
                            }}>
                                <Text style={{ color: '#030303', fontSize: 14, marginRight: 12, textAlign: 'right' }}>{info}的上级</Text>
                            </TouchableOpacity>
                        }
                    </View>

                </View>
                <ScrollView >
                    <View style={{ backgroundColor: '#fff', paddingBottom: 10, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10, marginBottom: 10 }}>
                            <Image source={{ uri: agent.avatar }} style={{ width: 70, height: 70, borderRadius: 35 }} />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.rowItem} >
                                <Text style={[styles.agentText, { textAlign: 'right' }]}>{agent.name}</Text>
                            </View>
                            <View style={styles.rowItem} >
                                <Text style={styles.agentText}>{formatMobile(agent.phone)}</Text>
                            </View>

                        </View>
                        <View style={[styles.row, { alignItems: 'flex-start' }]}>
                            <View style={styles.rowItem} ><Text style={[styles.agentText, { textAlign: 'right' }]}>等级:{roleStore.filterRoleName(agent.level)}</Text></View>
                            <View style={[{ flex: 1, justifyContent: "flex-start" }, styles.rowItem]} >
                                <Text style={styles.agentText}>余额：{agent.balance / 100}元</Text>
                                <Text style={styles.agentText}>收入：{agent.income / 100}元</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <View style={styles.line} />
                        <Text style={{ fontSize: 13, textAlign: 'center', color: '#343434' }}>{info}的下级</Text>
                        <View style={styles.line} />
                    </View>
                    <List style={{ marginTop: 10, marginBottom: 20 }}>
                        {
                            agents.map((item, i) => <ListItem
                                onClick={() => { this.checkOther(item.id) }}
                                key={i}
                                arrow="horizontal"
                            >
                                <View style={styles.listRow}>
                                    <Image style={{ width: 22, height: 22, borderRadius: 11 }} source={item.avatar ? { uri: item.avatar } : require('../../res/images/pic-profile-50.png')} />
                                    <Text style={styles.listTile}>{item.name}</Text>
                                </View>
                            </ListItem>)
                        }
                    </List>

                </ScrollView>
            </View>
        )
    }
}

export default connect(getProps('team'))(MyTeam)
