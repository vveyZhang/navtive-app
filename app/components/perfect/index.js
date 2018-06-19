
import { View, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight, Picker, Dimensions, PanResponder } from 'react-native';

import { ImagePicker, PickerView, InputItem, Button } from 'antd-mobile';

import React, { Component } from 'react';

import { uploadPic } from './uploadPic'

import Baisc from './basic';

import { IdCard } from './idCard'

import { connect } from 'react-redux'

import { SecurityDeposit } from './securityDeposit'

const { height, width } = Dimensions.get('window');

import { request } from '../../utils/request'

import { NavigationActions, container, barHeight, getProps } from '../../utils/index'

import { Back } from '../../router/back';

import { tipFail, tipSuccess, tipInfo } from '../../utils/tips'

import bank from '../../utils/bank.json'

const HeadPortrait = (props) => {

    return <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => uploadPic(props.getAvatar)}>
            <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={props.info.avatar ? { uri: props.info.avatar } : require('../../res/images/logo-512.png')}
            />
        </TouchableOpacity>
    </View>
}
const step = [{
    title: '上传头像',
}, {
    title: '填写基本信息'
}, {
    title: '身份认证'
}, {
    title: '缴纳保证金'
}]
class Perfect extends Component {
    state = {
        current: 0,
        avatar: null,
        name: null,
        age: null,
        sex: 0,
        id_card: null,
        id_card_img_a: null,
        id_card_img_b: null,
        deposit_voucher: null,
        backcard: ''
    }
    nextStep() {
        if (this.state.current < 3) {
            switch (this.state.current) {
                case 0:
                    if (!this.state.avatar) return tipInfo('头像不能为空');
                    break;
                case 1:
                    if (!this.getBasic()) return;
                    break;
                case 2:
                    if (!this.state.id_card_img_a || !this.state.id_card_img_b) return tipInfo('请上传身份照片');
                    break;
                default:
                    break;
            }
            this.setState({
                current: this.state.current + 1
            });
            return;
        }
        if (!this.state.deposit_voucher) return tipInfo('请上传凭证');
        this.uploadAll();
    }

    uploadAll = () => {
        const params = this.state;
        params.sex = params.sex[0];
        params.age = parseInt(params.age);

        request({
            url: '/update/info',
            data: params
        }).then(data => {
            if (data.error.ErrorCode != 0) return;
            request({
                url: '/update/deposit',
                data: {
                    deposit_voucher: params.deposit_voucher
                }
            }).then(data => {

                if (data.error.ErrorCode != 0) return;
                tipSuccess('上传成功');
                this.props.dispatch(NavigationActions.navigate({ routeName: 'auditing' }))
            })
        })

    }
    getAvatar = (url) => {
        this.setState({
            avatar: url
        })
    }
    perStep() {
        const { current } = this.state;
        const { getFieldsValue } = this.basic.props.form;
        if (current == 1) {
            console.log(getFieldsValue())
            this.setState({
                ...getFieldsValue(),
                current: current - 1
            })
            return;
        };
        this.setState({
            current: current - 1
        })

    }
    basic = {};
    getBasic() {
        const { isFieldsTouched, getFieldsError, getFieldsValue } = this.basic.props.form;
        if (!isFieldsTouched()) {
            tipInfo('请完善信息');
            return false;
        }
        if (getFieldsValue(['id_card']).id_card.length != 18) {
            tipInfo('请填写正确的身份证号');
            return false
        }
        for (let key in getFieldsError()) {
            if (getFieldsError()[key]) {
                tipInfo(getFieldsError()[key][0]);
                return false;
            }

        }
        for (let i in getFieldsValue()) {
            if (!getFieldsValue()[i]) {
                tipInfo('请完善信息');
                return false;
            }

        }
        this.setState({
            ...getFieldsValue()
        })
        return true;
    }
    getid_cardA = (url) => {
        this.setState({
            id_card_img_a: url
        })
    }
    getid_cardB = (url) => {
        this.setState({
            id_card_img_b: url
        })
    }
    getDeposit = (url) => {
        this.setState({
            deposit_voucher: url
        })
    }
    render() {
        const { current, avatar, name, age, sex, id_card, id_card_img_a, id_card_img_b } = this.state;
        const { deposit } = this.props.app
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Back />
                    <View style={{ flex: 1, }}><Text style={styles.headerTitle}>{step[this.state.current].title}</Text></View>
                    <View style={{ width: 100, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.current > 0 ? <TouchableOpacity style={{ width: 100 }} onPressIn={() => {
                            this.perStep()
                        }}>
                            <Text style={{ color: '#030303', fontSize: 14, marginRight: 12, textAlign: 'right' }}>上一步</Text>
                        </TouchableOpacity> : null
                        }

                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: 10, justifyContent: 'center', height: 40 }}></View>
                {current == 0 ? <HeadPortrait info={this.state} getAvatar={this.getAvatar} /> : null}
                {current == 1 ? <Baisc info={this.state} wrappedComponentRef={(inst) => this.basic = inst} /> : null}
                {current == 2 ? <IdCard info={this.state} getid_cardA={this.getid_cardA} getid_cardB={this.getid_cardB}  /> : null}
                {current == 3 ? <SecurityDeposit info={this.state} getDeposit={this.getDeposit} bank={bank} deposit={deposit ? deposit : 0} /> : null}
                <View style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
                    <Button style={styles.btn} onClick={() => this.nextStep()} >
                        <Text style={{ fontSize: 12, color: '#fff' }}>{this.state.current < 3 ? '下一步' : '完成'}</Text>
                    </Button>
                </View>

                <View style={{ position: "absolute", bottom: 20, width: '100%' }}><Text style={{ fontSize: 13, color: '#b0b3c1', textAlign: 'center' }}>伯克生物仅用于身份验证，我们会确保您的信息安全</Text></View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        marginTop: barHeight
    },
    headerTitle: {
        color: '#030303',
        fontSize: 16,
        textAlign: 'center'
    },
    container: {
        backgroundColor: '#f3f5f9',
        height: height,
    },
    title: {
        fontSize: 14,
        color: "#030303"
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3a76d2',
        height: 40,
        borderRadius: 4,
        marginTop: 40
    }
})
export default connect(getProps('app'))(Perfect);