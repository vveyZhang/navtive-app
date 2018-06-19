

import React from 'react';

import { View, Text } from 'react-native'

import QRCode from 'react-native-qrcode';

import { request } from '../../utils/request'

import { List, Radio, Modal, Button, } from 'antd-mobile';

import { tipInfo } from '../../utils/tips'


const RadioItem = Radio.RadioItem

class InviteCode extends React.PureComponent {
    componentWillMount() {
        request({
            url: '/role/get',
        }).then(data => {
           
            this.setState({
                roles: data.roles || []
            })
        })
    }
    state = {
        code: null,
        level: null,
        modal: false,
        roles: []
    }
    getCodeUrl(level) {
        this.setState({
            level: level
        })
    }
    onCreate() {
        if (this.state.level == null) return tipInfo('请选择代理')
        request({
            url: "/agent/invite",
            data: {
                level: this.state.level
            }
        }).then(data => {
            this.setState({
                code: data.url,
                modal: true
            })
        })
    }
    render() {
        const levels = [];
        const roles = this.state.roles;
     
        return <View style={{ height: "100%", backgroundColor: '#f3f5f9' }}>
            <List renderHeader={() => '选择邀请代理等级'}>
                {roles.map((key,i) => (
                    <RadioItem key={i} checked={this.state.level === key.Level} onChange={() => this.getCodeUrl(key.Level)}>
                        邀请等级：{key.Name}
                    </RadioItem>
                ))}
            </List>
            <Modal

                visible={this.state.modal}
                onClose={() => this.setState({
                    modal: false
                })}
                transparent={true}
                maskClosable={true}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {
                        this.state.code ? <QRCode
                            value={this.state.code}
                            size={240}
                            bgColor='black'
                            fgColor='white' />
                            : null
                    }
                </View>
            </Modal>
            <Button style={{ margin: 40 }} onClick={() => this.onCreate()} type="primary">生成二维码</Button>
        </View>
    }
}
export default InviteCode