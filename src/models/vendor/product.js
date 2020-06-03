import { addProduct, delProduct, getProductList, updateProduct, getProductType } from '@/services/vendor/product';
import { checkResponse } from '@/utils/utils';

export default {
  namespace: 'vdrProduct',

  state: {
    productList: [],
    productType: [],
  },

  effects: {
    *getProductMenu({ payload }, { call, put }) {
      // 查询
      const response = yield call(getProductList, payload);
      let newResponse = response; //下一页为空请求上一页数据
      if (response && response.items && response.items.length === 0 && payload && payload.page > 0) {
        newResponse = yield call(getProductList, { ...payload, page: payload.page - 1 });
      }
      yield put({
        type: 'save',
        payload: newResponse,
      });
    },
    *delProduct({ payload }, { call, put }) {
      // 删除某条产品
      const reponse = yield call(delProduct, payload.del);
      checkResponse(reponse);
      yield put({ type: 'getProductMenu', payload: payload.fetch });
    },
    *addProduct({ payload, callback }, { call, put }) {
      // 增加
      const reponse = yield call(addProduct, payload.add);
      checkResponse(reponse, callback);
      yield put({ type: 'getProductMenu', payload: payload.fetch });
    },
    *updateProduct({ payload, callback }, { call, put }) {
      // 修改
      const reponse = yield call(updateProduct, payload.upd);
      checkResponse(reponse, callback);
      yield put({ type: 'getProductMenu', payload: payload.fetch });
    },
    *getProductType({ payload, callback }, { call, put }) {
      // 查询
      const response = yield call(getProductType, payload);
      yield put({
        type: 'productType',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        productList: action.payload,
      };
    },
    productType(state, action) {
      return {
        ...state,
        productType: action.payload,
      };
    },
  },
};
