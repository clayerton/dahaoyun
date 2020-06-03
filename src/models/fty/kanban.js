import { device, watchboardGeneral, watchboardConcise, deviceLive } from '@/services/fty/kanban';
import { checkResponse } from '@/utils/utils';

export default {
  namespace: 'kanBan',

  state: {
    deviceList: {},
    deviceLive: {},
    general: null,
    concise: null,
  },

  effects: {
    *deviceList({ payload, callback }, { call, put }) {
      // 查询设备看板
      const response = yield call(device, payload);
      callback && callback();
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *deviceLive({ payload }, { call, put }) {
      // 查询设备看板
      const response = yield call(deviceLive, payload);
      yield put({
        type: 'save1',
        payload: response,
      });
    },
    *watchboardGeneral({ payload }, { call, put }) {
      // 查询设备看板
      const response = yield call(watchboardGeneral, payload);
      yield put({
        type: 'set',
        payload: response,
      });
    },

    *watchboardConcise({ payload }, { call, put }) {
      const response = yield call(watchboardConcise, payload);
      yield put({
        type: 'setConcise',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        deviceList: action.payload,
      };
    },
    save1(state, action) {
      return {
        ...state,
        deviceLive: action.payload,
      };
    },
    set(state, action) {
      return {
        ...state,
        general: action.payload,
      };
    },
    setConcise(state, action) {
      return {
        ...state,
        concise: action.payload,
      };
    },
  },
};
