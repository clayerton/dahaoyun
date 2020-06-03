import {
  queryDevice,deviceOne,deviceLive
} from '@/services/iot/device';
import { checkResponse } from '@/utils/utils';

export default {
  namespace: 'device',

  state: {
    devices: {},
    detail: {},
    live: {},
  },

  effects: {
    *fetchDevice({ payload }, { call, put }) {
      const response = yield call(queryDevice, payload);
      yield put({
        type: 'saveDevice',
        payload: response,
      });
    },
    *deviceOne({payload}, {call, put}) {
      const response = yield call(deviceOne, payload);
      yield put({
        type: 'saveDeviceOne',
        payload: response,
      }); 
    },
    *deviceLive({payload}, {call, put}) {
      const response = yield call(deviceLive, payload);
      yield put({
        type: 'saveDeviceLive',
        payload: response,
      }); 
    },
  },

  reducers: {
    saveDevice(state, action) {
      return {
        ...state,
        devices: action.payload,
      };
    },
    saveDeviceOne(state, action) {
      return {
        ...state,
        detail: action.payload,
      }
    },
    saveDeviceLive(state, action) {
      return {
        ...state,
        live: action.payload,
      }
    },
  },
};
