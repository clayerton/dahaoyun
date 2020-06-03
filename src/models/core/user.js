import { fetchUserOne } from '@/services/core/user';

export default {
  namespace: 'user',
  state: {
    userInfo: null,
  },
  effects: {
    *fetchUserOne({payload}, {call,put}) {
        const response = yield call(fetchUserOne, payload)
        yield put({
            type: 'save',
            payload: response,
        })
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};
