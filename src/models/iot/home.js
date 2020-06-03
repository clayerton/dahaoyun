import { queryHome } from '@/services/iot/home';
export default {
    namespace: 'overview',
    state: {
        homeList: [],
    },
    effects: {
        *fetchHome({ payload }, { call, put }) {
            const response = yield call(queryHome, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                homeList: payload,
            }
        }
    }
}