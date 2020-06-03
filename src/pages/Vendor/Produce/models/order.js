import {
  getOrderList,
  delOrder,
  addOrder,
  updateOrder,
  orderProduct,
  delOrderProduct,
  addOrderProduct,
  updateOrderProduct,
  orderScheduling,
} from '@/services/vendor/order';
import { checkResponse } from '@/utils/utils';
import { dedupeCraftList } from '@/utils/listdeduplication';

export default {
  namespace: 'vdrOrder',

  state: {
    orderList: [],
    orderProductList: []
  },

  effects: {
    *getOrderMenu({ payload }, { call, put }) {
      // 查询
      const response = yield call(getOrderList, payload);
      let newResponse = response; //下一页为空请求上一页数据
      if (response && response.items && response.items.length === 0 && payload && payload.page > 0) {
        newResponse = yield call(getOrderList, { ...payload, page: payload.page - 1 });
      }
      yield put({
        type: 'save',
        payload: newResponse,
      });
    },
    *delOrder({ payload }, { call, put }) {
      // 删除某条订单
      const response = yield call(delOrder, payload.del);
      checkResponse(response);
      yield put({ type: 'getOrderMenu', payload: payload.fetch });
    },
    *addOrder({ payload, callback }, { call, put }) {
      // 增加
      const response = yield call(addOrder, payload.add);
      checkResponse(response, callback);
      yield put({ type: 'getOrderMenu', payload: payload.fetch });
    },
    *updateOrder({ payload, callback }, { call, put }) {
      // 修改
      const response = yield call(updateOrder, payload.upd);
      checkResponse(response, callback);
      yield put({ type: 'getOrderMenu', payload: payload.fetch });
    },
    *orderProduct({ payload, callback }, { call, put }) {
      // 查询
      const response = yield call(orderProduct, {count: 100,...payload});
      yield put({
        type: 'order',
        payload: {response, payload},
      });
    },
    *addOrderProduct({ payload, callback }, { call, put }) {
      // 增加
      const response = yield call(addOrderProduct, payload.add);
      checkResponse(response, callback);
      // yield put({ type: 'orderProduct', payload: payload.fetch });
    },
    *delOrderProduct({ payload, callback }, { call, put }) {
      // 
      const response = yield call(delOrderProduct, payload.del);
      checkResponse(response, callback);
      yield put({ type: 'orderProduct', payload: payload.fetch });
      yield put({ type: 'getOrderMenu', payload:{}});

    },
    *updateOrderProduct({ payload, callback }, { call, put }) {
      // 
      const response = yield call(updateOrderProduct, payload.upd);
      checkResponse(response, callback);
      yield put({ type: 'orderProduct', payload: payload.fetch });
      yield put({ type: 'getOrderMenu', payload:{}});
    },
    *orderScheduling({ payload, callback }, { call, put }) {
      // 
      const response = yield call(orderScheduling, payload.upd);
      checkResponse(response, callback);
      yield put({ type: 'orderProduct', payload: payload.fetch });
    },
  },
    reducers: {
      save(state, action) {
        return {
          ...state,
          orderList: action.payload,
        };
      },
      order(state, action) {
        return {
          ...state,
          orderProductList: dedupeCraftList([
            { orderid: action.payload.payload.id, value: action.payload.response },
            ...state.orderProductList,
          ]),
        };
      },
    },
  };
