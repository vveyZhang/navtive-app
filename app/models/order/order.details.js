import { request } from '../../utils/request';

import goodsStore from '../goods.store'

export default {
    namespace: 'orderDetails',
    state: {},
    reducers: {
        updataOrder(state, { order }) {
            return {...state,...order,items:goodsStore.findGoods(order.items)}
        }
    },
    effects: {
        *queryOrder({ params }, { call, put }) {
            let data={}
            if(params.order_type!=3){
                data = yield call(request, {
                    url: "/order/get",
                    data: {
                        order_id:params.order_id
                    }
                });
            }else{
                data = yield call(request, {
                    url: "/order/sale-get",
                    data: {
                        order_id:params.order_id
                    }
                });
            }
         
            yield put({ type: 'updataOrder', order: data.orders[0] })
        }
    },
    subscriptions: {},
};
