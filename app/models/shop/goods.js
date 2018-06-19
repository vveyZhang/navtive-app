import { request } from '../../utils/request'

import goodsStore from '../goods.store';

import { NavigationActions } from '../../utils/index'

export default {
    namespace: 'goods',
    state: {
        product: [],
    },
    reducers: {
        updateGoods(state, { data }) {
            goodsStore.updataGoods(data.product)
            return { ...state, product: data.product }
        }
    },
    effects: {
        *queryGoods({ params }, { call, put }) {
            const data = yield call(request, {
                url: '/product/get'
            });
            yield put({ type: 'updateGoods', data: data })
        },
        *createOrder({ order }, { call, put, select }) {
            const agent = yield select(state => state.agent);
            const id = agent.agent.default_address_id;
            const addresses = agent.address;
            let address = {}
            for (let item of addresses) {
                if (item.id == id) address = item;
            }
            
            yield put({
                type: 'createOrder/countFreight', order: {
                    address: address,
                    goods: order.goods,
                    isCloud: '0',
                    isCreated: true,
                    isPurchase:order.isPurchase
                }
            });
            yield put(NavigationActions.navigate({ routeName: 'createOrder' }))
        }
    },
    subscriptions: {},
};
