import { addGroup, delGroup, queryGroup, queryGroupKey } from '@/services/iot/group';
import { checkResponse } from '@/utils/utils';

export default {
  namespace: 'group',

  state: {
    groupList: [],
  },

  effects: {
    *fetchGroup({ payload }, { call, put }) {
      const response = yield call(queryGroup, payload);
      let newResponse = response && response.items;
      if(newResponse) {
        newResponse = [{name: null}].concat(newResponse).concat([{name: '~'}])
      }
      yield put({
        type: 'save',
        payload: newResponse,
      });
    },
   
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        groupList: action.payload,
      };
    },
  },
};
