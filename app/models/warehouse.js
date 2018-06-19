import { request } from '../utils/request';

import { NavigationActions, delay } from '../utils/index';

export default {
    namespace: 'warehouse',
    state: {
        store_items: []
    },
    reducers: {
        updata(state, { data }) {
            return { ...state, store_items: data.store_items }
        }
    },
    effects: {
        *queryWarehouse({ payload }, { call, put }) {
            const data = yield call(request, {
                url: "/store/get"
            })
            if (data.error.ErrorCode != 0) return;
            yield put({ type: 'updata', data: data })
        }
    },
    subscriptions: {},
};
