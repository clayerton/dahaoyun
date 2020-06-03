import { fetchDepartment } from '@/services/core/department';

function flagOption(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].value = data[i].id;
    data[i].label = data[i].name;
    if (data[i].children && data[i].children.length > 0) {
      flagOption(data[i].children)
    } else {
      data[i].children = null;
    }
  }
  return data
};
export default {
  namespace: 'department',
  state: {
    department: null,
  },
  effects: {
    *fetchDepartment({ payload }, { call, put }) {
      const response = yield call(fetchDepartment, payload);
      let newResponse;
      if(payload.type === 'workshop') {
        newResponse = [{ id: 0, name: '全部车间', type: 'workshop', children: [] }];
        newResponse = newResponse.concat(response);
        newResponse = flagOption(newResponse)
      }
      yield put({
        type: 'save',
        payload: newResponse,
      });

    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        department: payload,
      };
    },
  },
};
