import { delay, NavigationActions, getCurrentScreen } from '../utils'

import { routerReducer } from '../router';

const actions = [
  NavigationActions.BACK,
  NavigationActions.INIT,
  NavigationActions.NAVIGATE,
  NavigationActions.RESET,
  NavigationActions.SET_PARAMS,
  NavigationActions.URI,
]

export default {
  namespace: 'router',
  state: {
    ...routerReducer(),
  },
  reducers: {
    apply(state, { payload: action }) {
      return routerReducer(state, action)
    },
  },
  effects: {
    watch: [
      function* watch({ take, call, put, select }) {
        const loop = true
        while (loop) {
          const payload = yield take(actions)
          if (payload.type === 'Navigation/BACK') {
            const router = yield select(state => state.router);
            if (getCurrentScreen(router) == "createOrder") {
              yield put({ type: 'createOrder/isLeave', isLeave: true });
              continue;
            }
            if (getCurrentScreen(router) == "payOrder") {
              yield put({ type: 'payOrder/isLeave', isLeave: true });
              continue;
            }
            if (getCurrentScreen(router) == "myTeam") {
 
              yield put({ type: 'team/delayOutStack', index: 'pageOne' });
            } 
            if (getCurrentScreen(router) == "myTeamOther") {
              yield put({ type: 'team/delayOutStack', index: 'pageTwo' });
            }
          }
          yield put({
            type: 'apply',
            payload,
          })
          // debounce, see https://github.com/react-community/react-navigation/issues/271
          if (payload.type === 'Navigation/NAVIGATE') {
            yield call(delay, 500)
          }

        }
      },
      { type: 'watcher' },
    ],
  },
}
