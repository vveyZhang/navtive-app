import { request } from '../utils/request';

import { NavigationActions, delay } from '../utils/index';

import { tipFail, tipSuccess } from '../utils/tips'

export default {
    namespace: 'account',
    state: {
        alipay: {
        },
        back: {

        }
    },
    reducers: {
        initAccount(state, { data }) {
            let back = {}, alipay = {}
            for (let item of data.receipts) {
                if (item.receipt_type == 1) {
                    alipay = item
                }
                else {
                    back = item
                }
            }
            return { ...state, back: back, alipay: alipay }
        }
    },
    effects: {
        *getAccount({ payload }, { call, put }) {
            const data = yield call(request, {
                url: "/receipt/select",
            });
            if (data.error.ErrorCode != 0) return;
            yield put({ type: 'initAccount', data: data })
        },
        *addAccount({ account }, { call, put }) {
            const data = yield call(request, {
                url: "/receipt/create",
                data: account
            });
            if (data.error.ErrorCode != 0) return;
            
            yield put({ type: 'getAccount' })
            tipSuccess('添加成功')
            yield call(delay, 1500);
            yield put(NavigationActions.back())
        },
        *editorAccount({ account }, { call, put }) {
            const data = yield call(request, {
                url: "/receipt/update",
                data: account
            });
            if (data.error.ErrorCode != 0) return;
            yield put({ type: 'getAccount' });
            tipSuccess('修改成功')
            yield call(delay, 1500);
            yield put(NavigationActions.back())

        }
    },
    subscriptions: {},
};
