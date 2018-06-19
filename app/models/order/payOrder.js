import { NavigationActions, delay } from '../../utils/index'

import { request } from '../../utils/request'

import { tipSuccess, tipFail } from '../../utils/tips'

export default {
  namespace: 'payOrder',
  state: {
    isLeave: false
  },
  reducers: {
    isLeave(state, { isLeave }) {
      return { ...state, isLeave }
    }
  },
  effects: {
    *sureLeave(action, { put }) {
      yield put({ type: "isLeave", isLeave: false })

      yield put(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'orderCenter', params: {
              order_type: 1
            }
          })
        ]
      }))
    },
    *toPay({ params }, { call, put }) {
      const data = yield call(request, {
        url: "/order/payment",
        data: params
      });
      if (data.error.ErrorCode != 0) return   tipFail(data.error.ErrorMsg, 2);;
      tipSuccess("支付成功", 2);
      yield call(delay, 2000)
      yield put({
        type: 'order/queryOrder', params: {
          order_status: "all",
          page: 1,
          limit: 5
        }
      });
      yield put(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'orderCenter', params: {
              order_type: 1
            }
          })
        ]
      }))
    }
  },
  subscriptions: {},
};
