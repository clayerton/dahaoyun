import { runFet, runReason, runState, runUtilize } from '@/services/iot/run';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';

const color = {
  run: '#00b01a',
  stop: '#ff8400',
  error: '#bd0000',
  offline: '#838383',
}
let reportList = [];
export default {
  namespace: 'run',

  state: {
    report: null,
    nextReport: null,
    reason: null,
    stateList: [],
    live: {},
    utilize: [],
  },

  effects: {
    *runFet({ payload }, { call, put }) {
      !payload.page && (reportList = []);

      const response = yield call(runFet, payload);
      if (response && response.items) {
        reportList = reportList.concat(response.items || []);
      };
      yield put({
        type: 'saveRun',
        payload: { response, reportList },
      });
    },
    *runState({ payload }, { call, put }) {
      const response = yield call(runState, payload);
      let newResponse = response.slice(0);
      if (response && Object.prototype.toString.call(response) == '[object Array]') {
        newResponse = response.slice(0);
        newResponse.forEach(element => {
          //由于无固定顺序--> ['field', colors]，将数据值映射至指定的颜色值 color，此时用于通常映射分类数据；
          element.color = color[element.state];
          element.state = formatMessage({ id: `device.${element.state}` })
        });
      }
      yield put({
        type: 'saveState',
        payload: newResponse,
      });
    },
    *runReason({ payload }, { call, put }) {
      const response = yield call(runReason, payload);
      // 次数,时长,防止在render重复计算
      let count, duration;
      if (response && Object.prototype.toString.call(response) == '[object Array]') {
        count = response.reduce(function (pre, curr) {
          return pre + curr.count;
        }, 0)
        duration = response.reduce((pre, curr) => {
          return pre + curr.duration;
        }, 0)
      }
      yield put({
        type: 'saveReason',
        payload: { response, count, duration },
      });
    },
    *runUtilize({ payload }, { call, put }) {
      const response = yield call(runUtilize, payload);
      let newDate = response && response.items;
      let newResponse = [];
      // 稼动率图标exhort数据规范
      if (newDate) {
        newDate.forEach(item => {
          newResponse.push({
            date: moment(item.date).format('YYYY-MM-DD'),
            ratio: item.ratio,
          })
        })
      }
      yield put({
        type: 'saveUtilize',
        payload: newResponse,
      });
    },
  },

  reducers: {
    saveRun(state, { payload }) {
      return {
        ...state,
        report: payload.reportList,
        nextReport: payload.response && payload.response.next,
      };
    },
    saveState(state, action) {
      return {
        ...state,
        stateList: action.payload,
      }
    },
    saveReason(state, { payload }) {
      return {
        ...state,
        reason: payload.response,
        reasonCount: payload.count,
        reasonDuration: payload.duration,
      }
    },
    saveUtilize(state, action) {
      return {
        ...state,
        utilize: action.payload,
      }
    },
  },
};
