import { yieldByDevice } from '@/services/iot/yield';
export default {
    namespace: 'Yield',
    state: {
        device: [],
        deviceNext: null,
    },
    effects: {
        *yieldByDevice({ payload }, { call, put }) {
            const response = yield call(yieldByDevice, payload);
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
                device: payload.items,
                deviceNext: payload.next,
            }
        }
    }
}