
import React from 'react'

import { View, Text, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback,Keyboard } from 'react-native';

import { List, Button } from 'antd-mobile';
import { barHeight } from '../utils/index'

const { width, height } = Dimensions.get('window')

export class FooterModal extends React.PureComponent {
    state = {
        opacity: new Animated.Value(0.0),
        bottom: new Animated.Value(-100),
        display: false
    };
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow(e){
        Animated.timing(this.state.bottom, {
            toValue: e.endCoordinates.height,
            duration: 300,
        }).start()
    }

    _keyboardDidHide(e){
        Animated.timing(this.state.bottom, {
            toValue: 0,
            duration: 300,
        }).start()
    }
    showModal = () => {
        this.setState({
            display: true
        })
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 1.0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.bottom, {
                toValue: 0,
                duration: 300,
            }),
        ]).start()
    }       
    hideModal = () => {
        this.props.hideModal();
        this.setState({
            display: false
        })
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0.0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.bottom, {
                toValue: -100,
                duration: 300,
            }),
        ]).start()
    }
    render() {
        return (<View style={{ display: this.state.display ? 'flex' : 'none', }}>
            <TouchableWithoutFeedback onPress={()=>{this.hideModal()}} >
                <Animated.View style={[styles.layout, { opacity: this.state.opacity }]}>
                    <TouchableWithoutFeedback   onPress={(e) => e.stopPropagation()} >
                        <Animated.View style={[styles.layoutContent, { bottom: this.state.bottom }]}>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 25 }} >
                                <Text style={styles.title}>{this.props.title}</Text>
                                {
                                    React.Children.map(this.props.children, (child) => {
                                        return child
                                    })
                                }
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>

                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
        )
    }
}
export class AlertModal extends React.PureComponent {
    state = {
        opacity: new Animated.Value(0.0),
        display: false,
    };

    showModal = () => {
        this.setState({
            display: true
        })
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 1.0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    }       
    hideModal = () => {
        this.props.hideModal();
        this.setState({
            display: false
        })
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0.0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    }
    render() {
        return (<View style={{ display: this.state.display ? 'flex' : 'none', }}>
            <TouchableWithoutFeedback onPress={()=>{this.hideModal()}} >
                <Animated.View style={[styles.layoutAlert, { opacity: this.state.opacity }]}>
                    <TouchableWithoutFeedback   onPress={(e) => e.stopPropagation()} >
                        <Animated.View style={[styles.alertLayoutContent, { bottom: this.state.bottom }]}>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 25 ,}} >
                                <Text style={styles.title}>{this.props.title}</Text>
                                {
                                    React.Children.map(this.props.children, (child) => {
                                        return child
                                    })
                                }
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    layout: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,.4)",
        left: 0,
        zIndex: 1000,
        top: 0,
        width: width,
        height: height - barHeight - 40
    },
    layoutAlert:{
        justifyContent:'center',
        alignItems:'center'
    },
    layoutContent: {
        backgroundColor: "#ffffff",
        position: 'absolute',
        left: 0,
        width: '100%',
        zIndex: 20,
    },
    alertLayoutContent:{
        backgroundColor: "#ffffff",
        width: '100%'
    },
    title: {
        fontSize: 14,
        color: "#343434",
        textAlign: 'center',
        marginBottom: 20
    },
    btn: {
        height: 38
    },
    btnText: {
        fontSize: 14,
        color: '#ffffff',
    }
})

