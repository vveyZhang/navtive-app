import { request } from '../../utils/request';
import { tipFail, tipSuccess } from '../../utils/tips'
import { NavigationActions } from '../../utils/index'
export default {
    namespace: 'cart',
    state: {
        fetch: {
            isEditor: false,
            select: [],
            cart: []
        },
        shop: {
            isEditor: false,
            select: [],
            cart: []
        }

    },
    reducers: {
        updateCart(state, { data }) {
            return {
                ...state, fetch: {
                    isEditor: false, select: [], cart: data.fetch
                }, shop: {
                    isEditor: false, select: [], cart: data.shop
                }
            }
        },
        updateGoodsCount(state, { params }) {
            console.log(params)
            const { index, count, type } = params;
            const goodsRow = state[type].cart[index];
            return {
                ...state, [type]: {
                    ...state[type],
                    cart: [...state[type].cart.slice(0, index), {
                        ...goodsRow,
                        count: count
                    }, ...state[type].cart.slice(index + 1)]
                }
            }
        },
        onSelect(state, { params }) {
            const { index, type } = params;
            const select = state[type].select;
            if (select.indexOf(index) != -1) select.splice(select.indexOf(index), 1)
            else select.push(index)
            return {
                ...state, [type]: {
                    ...state[type],
                    select: select
                }
            }
        },
        onEditor(state, { params }) {
            const { type } = params;
            return {
                ...state, [type]: {
                    ...state[type],
                    isEditor: !state[type].isEditor
                }
            }
        },
        selectAll(state, { params }) {
            const { type } = params;
            if (state[type].select.length == state[type].cart.length) return {
                ...state, [type]: {
                    ...state[type],
                    select: []
                }
            }
            const newSelect = [];
            for (let i = 0; i < state[type].cart.length; i++) {
                newSelect.push(i)
            }

            return {
                ...state, [type]: {
                    ...state[type],
                    select: newSelect
                }
            }
        },
        deleteGoods(state, { params }) {
            const { type } = params;
            const newCart = [];
            const { select, cart } = state[type];
            if (select.length <= 0) {
                tipFail('未选中商品');
                return { ...state }
            }
            for (let i = 0; i < cart.length; i++) {
                if (select.indexOf(i) == -1) {
                    newCart.push({
                        count: cart[i].count,
                        product: cart[i].product
                    })
                }
            }
            return {
                ...state, [type]: {
                    select: [], cart: newCart, isEditor: false
                }
            }
        }
    },
    effects: {
        *addCart({ order }, { call, put }) {
            const data = yield call(request, {
                url: '/cart/update',
                data: {
                    product_id: order.goods.product.product_id,
                    count: order.goods.count,
                    type: order.type
                }
            });
            if (data.error.ErrorCode != 0) return;
            tipSuccess('添加成功');
            yield put({ type: 'queryCart' })
        },
        *queryCart({ goods }, { call, put }) {
            const data = yield call(request, {
                url: '/cart/get'
            });
            yield put({ type: 'updateCart', data })
        },
        *batchUpdate({ params }, { call, put }) {
            const { type, cart } = params;
            const cart_items = [];
            for (let item of cart) {
                cart_items.push({
                    ProductID: item.product.product_id,
                    Count: isNaN(parseInt(item.count)) ? 1 : parseInt(item.count)
                })
            }
            const data = yield call(request, {
                url: '/cart/batch-update',
                data: {
                    type: type,
                    cart_items: JSON.stringify(cart_items)
                }
            });

        },
        // *clearCart({ params }, { call, put }) {
        //     const { type} = params;
        //     const data = yield call(request, {
        //         url: '/cart/clear',
        //     });
        // },
        *createOrder({ order }, { call, put }) {

            yield put({ type: 'createOrder/countFreight', order: { ...order, isPurchase: order.type == "fetch" } });
            yield put(NavigationActions.navigate({ routeName: 'createOrder' }))
        }

    },
    subscriptions: {},
};
