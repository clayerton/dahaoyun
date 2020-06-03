// import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { addCategory, search, delType, updateType } from '@/services/vendor/category';
import { checkResponse } from '@/utils/utils';

export default {
  namespace: 'vdrCategory',

  state: {
    typeList: [],
  },

  effects: {
    *fetchCategory({ payload }, { call, put }) {
      // 查询
      const response = yield call(search, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *submitCategory({ payload }, { call, put }) {
      // 新增
      const reponse = yield call(addCategory, payload.add);
      checkResponse(reponse);
      yield put({ type: 'fetchCategory', payload: payload.fetch });
    },

    *delCategory({ payload }, { call, put }) {
      // 删除
      const reponse = yield call(delType, payload.del);
      checkResponse(reponse);
      yield put({ type: 'fetchCategory', payload: payload.fetch });
    },

    *updateCategory({ payload }, { call, put }) {
      // 修改
      const reponse = yield call(updateType, payload.upd);
      checkResponse(reponse);
      yield put({ type: 'fetchCategory', payload: payload.fetch });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        typeList: action.payload,
      };
    },
  },
};
