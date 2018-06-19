export { NavigationActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export const getProps = (name) => (state) => {
    return {
        [name]: state[name]
    }
}

// export function getMultipleProps(arguments) {
//     const arg = arguments;
//     return function (state) {
//         let newProps = {}
//         for (let item of arg) {
//             newProps = {
//                 ...newProps,
//                 [item]: state[item]
//             }
//         }
//         return newProps
//     }
// }
export function getPropsWithLoading(name) {
    return (state) => {
        return {
            [name]: state[name],
            loading: state.loading.models[name]
        }
    }
}

export function getCurrentScreen(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getCurrentScreen(route)
    }
    return route.routeName
}

export const telPhone = "051783797123"

export const container = { height: '100%', backgroundColor: '#f3f5f9' }

export function format(time, fmt) {
    fmt = fmt || 'yyyy-M-d h:m:s'
    const date = new Date(time)
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

import { StatusBar, Platform, StatusBarIOS } from 'react-native';


export const barHeight=20

