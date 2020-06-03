import { login, modifyAccount, modifyPassword, querySms, register, unit, updatePas } from '@/services/common/user';
import { authNameByCompany, COMPANY_TYPE, jumpToNextScreen, setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { checkResponse } from '@/utils/utils';
import router from 'umi/router';

export default {
  namespace: 'user_global',

  state: {
    status: undefined,
    bSend: false,
    currentUser: null,
    account: null,
  },

  effects: {
    *getSms({ payload, callback }, { call, put }) {
      const response = yield call(querySms, payload);
      checkResponse(response, callback, '短信已发送，请注意查收');
      if (response) {
        yield put({ type: 'changeStep', payload: true });
      }
    },
    *register({ payload, callback }, { call }) {
      const response = yield call(register, payload);
      checkResponse(response, callback);
    },
    *updatePassword({ payload, callback }, { call }) {
      const response = yield call(updatePas, payload);
      checkResponse(response, callback);
    },
    *modifyAccount({ payload, callback }, { call }) {
      const response = yield call(modifyAccount, payload);
      checkResponse(response, callback);
    },
    *modifyPassword({ payload, callback }, { call }) {
      const response = yield call(modifyPassword, payload);
      checkResponse(response, callback);
    },
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response) {
        localStorage.setItem('userId', response.user.id); // 页面显示判断的值
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user)); // 存用户   localstorage存对象需要把对象转成字符串
        localStorage.setItem('role', JSON.stringify(response.user.role)); // 存角色
        localStorage.setItem('company', JSON.stringify(response.company)); // 工厂
        const unitResponse = yield call(unit, {});
        localStorage.setItem('unit', JSON.stringify(unitResponse.items)); // 页面显示判断的值
        yield put({ type: 'authHandle', payload: authNameByCompany(response.company) });
        yield put({ type: 'accountHandle', payload: response.user });
        
        jumpToNextScreen(authNameByCompany(response.company));
      }
    },
    *logout({ }, { put }) {
      yield put({ type: 'authHandle', payload: COMPANY_TYPE.none });
      yield put({ type: 'accountHandle', payload: null });
      localStorage.clear();
      router.push('/user/login');
    },
    *unit({ }, { call, put }) {
      const response = yield call(unit, {});
      if (response) {
        localStorage.setItem('unit', JSON.stringify(response.items)); // 页面显示判断的值
      }
    },
  },

  reducers: {
    authHandle(state, { payload }) {
      setAuthority(payload);
      reloadAuthorized();
      return {
        ...state,
      };
    },
    accountHandle(state, { payload }) {
      return {
        ...state,
        account: { ...payload },
      };
    },
    changeStep(state, { payload }) {
      return {
        ...state,
        bSend: payload,
      };
    },
  },
};
