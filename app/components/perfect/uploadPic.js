import { ActionSheet, } from 'antd-mobile';
import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios'
import { request } from '../../utils/request'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
export const uploadPic = (callback, options) => {
    const BUTTONS = ['拍摄', '从手机相册中选择', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
        'data-seed': 'logId',
        wrapProps,
    },
        (buttonIndex) => {
            if (buttonIndex == BUTTONS.length - 1) return;
            buttonIndex == 1 ? opentPicker(callback, options) : openCamera(callback, options)
        });
}
const opentPicker = (callback, options) => {
    options = options ? options : {
        width: 300,
        height: 300
    }
    ImagePicker.openPicker({
        width: options.width,
        height: options.height,
        cropping: true,
        includeBase64: true,
    }).then(image => {
        upload(callback, image);

    })
}
const openCamera = (callback, options) => {
    options = options ? options : {
        width: 300,
        height: 300
    }
    ImagePicker.openCamera({
        width: options.width || 300,
        height: options.height || 300,
        includeBase64: true,
        cropping: true
    }).then(image => {

        upload(callback, image);

    })
}

function upload(callback, image) {

    let file = { name: 'image.jpg', file: image.data };
    return request({
        url: '/uploadbase64',
        data: file
    }).then(data => {
        if (data.error.ErrorCode != 0) {
            return
        }
        if (callback) callback(data.url)
    })

}