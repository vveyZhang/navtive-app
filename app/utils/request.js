import axios from 'axios'
import qs from 'qs'
import { tipFail } from './tips'
import { store } from '../index'
import { NavigationActions } from './index'
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://debug.berkgen.com:8000/';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
});
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */


export const request = (options) => {
    return axios.post(options.url, options.data).then(data => {
        if (data.data.error.ErrorCode != 0) {
            tipFail(data.data.error.ErrorMsg);
        }
        return data.data
    }).catch(e => {
        const { dispatch } = store;
        const status = e.request.status;
        if (e.request.status == 401 && options.url == "/login") return;
        console.log(e)
        // if (e.request.status == 401) return dispatch(NavigationActions.navigate({ routeName: 'login' }));
        return tipFail(codeMessage[status])
    })
}