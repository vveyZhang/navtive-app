import { request } from "../utils/request";
export default {
  namespace: "home",
  state: {
    news: []
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    *queryAricle({ payload }, { call, put }) {
      const data = yield call(request, {
        url: "/wx/mp_media/select"
      });
      if (data.error.ErrorCode != 0) return;
      yield put({
        type: "update",
        payload: {
          news: data.news
        }
      });
    }
  },
  subscriptions: {}
};
