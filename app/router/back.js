import React from 'react';

import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';

import { NavigationActions, getCurrentScreen, getProps } from '../utils/index'

class BackComponent extends React.PureComponent {
    render() {
        const props = this.props
        const back = () => {
            const params = props.params || {}

            if (props.backRouteName) return props.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: props.backRouteName, params }),
                ]
            }))
            props.dispatch(NavigationActions.back())
        }
        return <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'flex-start', alignItems: 'center', height: 45, width: 100 }}>
            <TouchableWithoutFeedback onPress={() => back()} >
                <View style={{ padding: 10, paddingLeft: 0 }} >
                    <Image
                        style={{ width: 16, height: 16, }}
                        source={require('../res/images/left.png')}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>

    }
}
export const Back = connect(getProps('router'))(BackComponent)