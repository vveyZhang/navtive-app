import { Toast } from 'antd-mobile'

export function tipFail(content, time) {
    const duration = time ? time : 0.6
    Toast.fail(content, duration)
}
export function tipSuccess(content, time) {
    const duration = time ? time : 0.6
    Toast.success(content, duration)
}
export function tipInfo(content, time) {
    const duration = time ? time : 0.6
    Toast.info(content, duration)
} 

export function tipOffline(content, time) {
    const duration = time ? time : 0.6
    Toast.offline(content, duration)
} 