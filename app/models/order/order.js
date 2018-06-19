import { request } from '../../utils/request';

import { tipFail, tipSuccess } from '../../utils/tips'

import goodsStore from '../goods.store'

import { NavigationActions } from '../../utils/index'

function filterOrder(orders) {
  const newOrders = []
  for (let order of orders) {
    newOrders.push({
      ...order,
      items: goodsStore.findGoods(order.items)
    })
  }
  return newOrders
}

function filterType(type) {
  switch (type) {
    case 2:
      return '&order_type=2&order_type=4&order_type=3';
    case 1:
      return '&order_type=1&order_type=4&order_type=5';
    default:
      return ''
  }
}

export default {
  namespace: 'order',
  state: {
    order_status: "all",
    orders: [],
    page: 1,
    limit: 5,
    count: 0,
    order_type: 1,
    id: ''
  },
  reducers: {
    updataOrder(state, { order }) {
      return { ...state, ...order, orders: filterOrder(order.orders) }
    },
    moreOrder(state, { order }) {
      return { ...state, ...order, orders: [...state.orders, ...filterOrder(order.orders)] }
    },
  },
  effects: {
    *queryOrder({ params }, { call, put, select }) {
      let queryParams = {}
      for (let i in params) {
        queryParams[i] = params[i]
      }

      let url = queryParams.order_type == 3 ? '/order/sale-get?' : '/order/get?'
      url = queryParams.order_status != "receive" ? url : `${url}order_status=3&order_status=4`;

      const type = filterType(queryParams.order_type);

      if (queryParams.order_status == "all" || queryParams.order_status == "receive") delete queryParams.order_status;
      delete queryParams.order_type;
      const data = yield call(request, {
        url: url + type,
        data: queryParams
      })
      console.log(data)
      if (data.error.ErrorCode != 0) return
      if (params.isMore) {
        yield put({
          type: 'moreOrder', order: {
            count: data.count,
            orders: data.orders,
            ...params
          }
        })
        return;
      }
      const { agent } = yield select(state => state.agent)

      yield put({
        type: 'updataOrder', order: {
          count: data.count,
          orders: data.orders,
          id: agent.id,
          ...params
        }
      })
    },
    *confirmReceipt({ params }, { call, put, select }) {
      const data = yield call(request, {
        url: '/order/deliver-confirm',
        data: params
      })
      if (data.error.ErrorCode != 0) return;
      const order = yield select(state => state.order)
      const { order_status, limit, order_type } = order
      yield put({
        type: "queryOrder", params: {
          order_status,
          limit,
          order_type,
          page: 1
        }
      })
    },
    *confirmDeliver({ params }, { call, put, select }) {
      console.log(params)
      const data = yield call(request, {
        url: '/order/deliver',
        data: params
      })

      if (data.error.ErrorCode != 0) return;
      const order = yield select(state => state.order)
      const { order_status, limit, order_type } = order
      yield put({
        type: "queryOrder", params: {
          order_status,
          limit,
          order_type,
          page: 1
        }
      })
      yield put(NavigationActions.back())
    }

  },
  subscriptions: {},
};
