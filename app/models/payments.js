
import { request } from '../utils/request'

import { NavigationActions, delay } from '../utils/index';

import { tipFail, tipSuccess } from '../utils/tips'

export default {
    namespace: 'payments',
    state: {
        balance: 0,
        proc: 0,
        succ: 0,
        back: {},
        alipay: {}
    },
    reducers: {
        updata(state, { data }) {
            return { ...state, ...data }
        }
    },
    effects: {
        *queryPayments(action, { call, put, select }) {
            const agent = yield select(state => state.agent);
            const balance = agent.agent.balance;

            const data = yield call(request, {
                url: "/withdraw/status"
            });
            const accountes = yield call(request, {
                url: "/receipt/select",
            });
            let back = {}, alipay = {}
            for (let item of accountes.receipts) {
                if (item.receipt_type == 1) {
                    alipay = item
                }
                else {
                    back = item
                }
            }
            yield put({
                type: "updata", data: {
                    balance: balance,
                    alipay: alipay,
                    back: back,
                    succ: data.succ,
                    proc: data.proc
                }
            })
        },
        *withdrawals({ params }, { call, put, select }) {
            const payments = yield select(state => state.payments)
            if(!payments[params.type].id) return tipFail('未添加账号')
            const data = yield call(request, {
                url: "/withdraw/request",
                data: {
                    amount: params.amount*100,
                    password: params.password,
                    receipt_id: payments[params.type].id
                }
            });

            console.log({
                amount: params.amount*100,
                password: params.password,
                receipt_id: payments[params.type].id
            })
            if (data.error.ErrorCode != 0) return;
            tipSuccess('申请成功')
             yield put({type:'queryPayments'});
             yield call(delay,1500);
             yield put(NavigationActions.back())

            // yield put({type:'agent/queryAgent'});

           
        }
    },
    subscriptions: {},
};
