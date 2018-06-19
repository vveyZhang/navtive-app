import { request } from "../utils/request";

import { NavigationActions } from "../utils/index";

import storage from "../utils/storage";

import { tipFail } from "../utils/tips";

import roleStore from "./role.store";

export default {
  namespace: "app",
  state: {
    content: "",
    role: {}
  },
  reducers: {
    updateUser(state, { user }) {
      return { ...state, ...user };
    }
  },
  effects: {
    *login({ user }, { call, put }) {
      const data = yield call(request, {
        url: "/login",
        data: {
          phone: user.phone,
          password: user.password
        }
      });
      if (data.error.ErrorCode != 0) {
        tipFail("账号或密码错误");
        return;
      }
      yield put({ type: "getRole" });
      yield put({ type: "updateUser", user: data.role });
      user.status = true;
      yield storage.set("user", user);

      if (data.agent.agent_status == 1) {
        if (data.agent.deposit_voucher) {
          yield put(NavigationActions.navigate({ routeName: "auditing" }));
          return;
        }
        const agreement = yield call(request, {
          url: "/terms/get"
        });
        if (agreement.error.ErrorCode != 0) return;

        yield put({
          type: "updateUser",
          user: { content: agreement.terms.content }
        });
        yield put(NavigationActions.navigate({ routeName: "agree" }));
        return;
      }
      yield put(NavigationActions.navigate({ routeName: "main" }));
    },
    *autoLogin({ user }, { call, put }) {
      const data = yield call(request, {
        url: "/login",
        data: {
          phone: user.phone,
          password: user.password
        }
      });
      if (data.error.ErrorCode != 0) {
        user.status = false;
        storage.set("user", user);
        // yield put(NavigationActions.navigate({ routeName: "login" }));
        return;
      }

      yield put({ type: "getRole" });
      yield put({ type: "updateUser", user: data.role });
      if (data.agent.agent_status == 1) {
        if (data.agent.deposit_voucher) {
          yield put(NavigationActions.navigate({ routeName: "auditing" }));
          return;
        }
        yield put(NavigationActions.navigate({ routeName: "login" }));
        return;
      }
      yield put(NavigationActions.navigate({ routeName: "main" }));
    },
    *getRole(action, { call, put }) {
      const data = yield call(request, {
        url: "/role/get"
      });
      roleStore.updataRoles(data.roles);
    },
    *outlogin({ paylod }, { call, put }) {
      let user = yield call(storage.get, "user");
      user.status = false;
      yield call(storage.set, "user", user);
      yield put(NavigationActions.navigate({ routeName: "login" }));
    },
    *clear({ paylod }, { call, put }) {
      storage.remove("user");
      yield put(NavigationActions.navigate({ routeName: "login" }));
    }
  },
  subscriptions: {}
};
