import { fetchOrder, fetchOrderKey, fetchOrderOne } from '@/services/fty/order';
import { dedupeCraftList } from '@/utils/listdeduplication';
let orderList = [],
  designImg = [];

export default {
  namespace: 'order',

  state: {
    orderList: [],
    orderNext: null,
    orderProduct: [],
  },

  effects: {
    *fetchOrder({ payload }, { call, put }) {
      !payload.page && (orderList = []);

      const response = yield call(fetchOrder, payload);
      if (response && response.items) {
        orderList = orderList.concat(response.items || []);
      }
      yield put({
        type: 'save',
        payload: { response, orderList },
      });
    },
    *fetchOrderOne({ payload }, { call, put }) {
      const response = yield call(fetchOrderOne, payload);
      yield put({
        type: 'saveOne',
        response,
        payload,
      });
    },
    *fetchOrderKey({ payload }, { call, put }) {
      !payload.page && (orderList = []);
      const response = yield call(fetchOrderKey, payload);
      if (response && response.items) {
        orderList = orderList.concat(response.items || []);
      }
      yield put({
        type: 'save',
        payload: { response, orderList },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        orderList: payload.orderList,
        orderNext: payload.response && payload.response.next,
      };
    },
    saveOne(state, { payload, response }) {
      return {
        ...state,
        orderProduct: dedupeCraftList([
          { orderid: payload.id, value: response },
          ...state.orderProduct,
        ]),
      };
    },
  },
};
