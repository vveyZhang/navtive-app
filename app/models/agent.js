import { request } from '../utils/request'
import { tipSuccess } from '../utils/tips'
import { NavigationActions, delay } from '../utils/index'
export default {
    namespace: 'agent',
    state: {
        agent: {},
        master: {},
        address: []
    },
    reducers: {
        initAgent(state, { data }) {
            return { ...state, ...data }
        }
    },
    effects: {
        *queryAgent({ payload }, { call, put }) {
            const data = yield call(request, {
                url: '/agent/detail',
            });
            yield put({ type: 'initAgent', data: data })
        },
        *addAddress({ address, routeName }, { call, put }) {
            const data = yield call(request, {
                url: '/address/create',
                data: address
            });
            if (data.error.ErrorCode != 0) return
            tipSuccess('添加成功');
            yield call(delay, 500)
            yield put({ type: 'queryAgent' })
            yield put(NavigationActions.back());

        },
        *deleteAddress({ address_id }, { call, put }) {
            const data = yield call(request, {
                url: '/address/delete',
                data: {
                    id: address_id
                }
            });
            if (data.error.ErrorCode != 0) return
            tipSuccess('删除成功');
            yield put({ type: 'queryAgent' });

        },
        *editorAddress({ address, routeName }, { call, put }) {
            const data = yield call(request, {
                url: '/address/update',
                data: address
            });
            if (data.error.ErrorCode != 0) return;
            tipSuccess('修改成功');
            yield call(delay, 500)
            yield put({ type: 'queryAgent' })
            yield put(NavigationActions.back());


        },
        *setDefaultAddress({ address }, { call, put }) {
            const data = yield call(request, {
                url: '/address/update',
                data: address
            });
            if (data.error.ErrorCode != 0) return;
            Toast.success('设置成功');
            yield put({ type: 'queryAgent' })
        }
    },
    subscriptions: {},
};
