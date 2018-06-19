import { request } from '../utils/request'

export default {
    namespace: 'paymentsDetails',
    state: {
        type: 0,
        loading: false,
        count: 0,
        page: 1,
        limit: 20,
        isAll: false,
        cause: 0,
        orders: [],
        withdraw_status: 0
    },
    reducers: {
        updata(state, { data }) {
         
            const isAll = data.page * data.limit >= data.count ? true : false
            return { ...state, ...data, isAll: isAll }
        },
        loadMore(state, { data }) {
          
            const isAll = data.page * data.limit >= data.count ? true : false
            const orders=state.orders;
            return { ...state, ...data, isAll: isAll,orders:[...orders,...data.orders] }
        },
    },
    effects: {
        *queryDeatils({ params }, { call, put }) {
            yield put({
                type: 'updata', data: {
                    loading: true
                }
            })
            const data = yield call(request, {
                url: '/turnover/select'
            })
            if (!data.orders || data.orders.length <= 0){
                yield put({
                    type: 'updata', data: {
                        loading: false
                    }
                })
                return;
            }

            yield put({
                type: 'updata', data: {
                    ...params,
                    orders: data.orders,
                    count: data.count,
                    loading: false
                }
            })
        },
        *queryMore({ params }, { call, put }) {
            yield put({
                type: 'updata', data: {
                    loading: true
                }
            })
            const data = yield call(request, {
                url: '/turnover/select'
            })
            if (!data.orders || data.orders.length <= 0) return;
            yield put({
                type: 'loadMore', data: {
                    ...params,
                    orders: data.orders,
                    count: data.count,
                    loading: false
                }
            })
        }
    },
    subscriptions: {},
};
