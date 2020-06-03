import { getClient, addClient, delClient, upClient } from '@/services/vendor/client';
import { checkResponse } from '@/utils/utils';

export default {
  namespace: 'vdrClient',

  state: {
    client: [],
    proxy: [],
  },

  effects: {
    *getClientList({ payload }, { call, put }) {
      const response = yield call(getClient, payload);
      let newResponse = response; //下一页为空请求上一页数据
      if (response && response.items.length === 0 && payload && payload.page > 0) {
        newResponse = yield call(getClient, { ...payload, page: payload.page - 1 });
      }
      if (payload.type == 0) {
        yield put({ type: 'save', payload: newResponse });
      } else {
        yield put({ type: 'save1', payload: newResponse });
      }
    },

    *addClient({ payload, callback }, { call, put }) {
      const response = yield call(addClient, payload.add);
      checkResponse(response, callback);
      yield put({ type: 'getClientList', payload: payload.fetch });
    },
    *delClient({ payload }, { call, put }) {
      const response = yield call(delClient, payload);
      checkResponse(response);
      yield put({ type: 'getClientList', payload: payload.fetch });
    },
    *upClient({ payload, callback }, { call, put }) {
      const response = yield call(upClient, payload.up);
      checkResponse(response, callback);
      yield put({ type: 'getClientList', payload: payload.fetch });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        client: action.payload,
      };
    },
    save1(state, action) {
      return {
        ...state,
        proxy: action.payload,
      };
    },
  },
};
