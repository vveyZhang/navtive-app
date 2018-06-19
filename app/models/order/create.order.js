
import { request } from '../../utils/request';

import { tipSuccess } from '../../utils/tips'

import { NavigationActions } from '../../utils/index';

import { Modal } from 'antd-mobile'
export default {
    namespace: 'createOrder',
    state: {
        address: {},
        goods: [],
        isCloud: '0',
        mark: '',
        freight: 0,
        isCreated: false,
        isLeave: false,
        isPurchase: false

    },
    reducers: {
        updataOrder(state, { order }) {
            return { ...state, ...order }
        },
        clearOrder(state) {
            return {
                address: {},
                goods: [],
                isCloud: 0,
                mark: '',
                freight: 0,
                isCreated: false,
                isLeave: false,
                isPurchase: false,
            }
        },
        isLeave(state, { isLeave }) {
            return { ...state, isLeave }
        }
    },
    effects: {
        *countFreight({ order }, { call, put }) {
            yield put({ type: 'updataOrder', order: order })
        },
        *submitOrder({ order }, { call, put, select }) {
            let data = {}, url = "";
            if (order.isPurchase) {

                url = order.isCloud ? "/store/cloud/fetch" : "/store/local/fetch";

                const params = {
                    address_id: order.address_id,
                    store_items: order.order_items
                }
                console.log(params)
                data = yield call(request, {
                    url: url,
                    data: params
                });
            } else {
                
                data = yield call(request, {
                    url: '/order/create',
                    data: order
                });
                
            }
            if (data.error.ErrorCode != 0) return;
            
            const type = order.isPurchase ? 'fetch' : 'shop'
            yield put({
                type: 'cart/deleteGoods', params: {
                    type: type
                }
            });
            const carts = yield select(state => state.cart)
            const { cart } = carts[type]
            yield put({
                type: 'cart/batchUpdate', params: {
                    type: order.isPurchase ? '1' : '2',
                    cart,
                }
            });
            tipSuccess('下单成功')
            if (order.isPurchase) {
                yield put(NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'orderCenter', params: {
                                order_type: 2
                            }
                        })
                    ]
                }))
                return;
            }
            yield put(NavigationActions.navigate({
                routeName: 'payOrder', params: {
                    pay: order.total,
                    order_id: data.order.order_id
                }
            }));
        },
        *sureLeave(action, { put, select }) {
            const createOrder = select(state => state.createOrder)
            yield put(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'orderCenter', params: {
                            order_type: createOrder.isPurchase ? 2 : 1
                        }
                    })
                ]
            }))
            yield put({ type: 'clearOrder' })
        }
    },
    subscriptions: {},
};
