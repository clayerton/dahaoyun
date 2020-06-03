import { queryPlan } from '@/services/iot/plan';
import { getImage } from '@/services/fty/blob';
function thumbnail(data) {
  if (!(data && data.items)) return [];
  let { items } = data;
  let img = items.reduce(function(pre, curr) {
    return [...pre, curr.image];
  }, []);
  return img;
}
let planList = [],
  planImg = [];
export default {
  namespace: 'plan',
  state: {
    planList: [],
    planNext: null,
    planImgList: [],
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      !payload.page && ((planList = []), (planImg = []));
      const response = yield call(queryPlan, payload);

      let _thumbnail = thumbnail(response);
      const img = yield _thumbnail.map((item, i) => {
        if (!item) return;
        return call(getImage, item);
      });
      planImg = planImg.concat(img || []);

      if (response && response.items) {
        planList = planList.concat(response.items || []);
      }
      planList.map((item, i) => {
        item.thumbnail = planImg[i];
      });
      console.log(planList);
      yield put({
        type: 'save',
        payload: { planList, response },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        planList: payload.planList,
        planNext: payload.response && payload.response.next,
      };
    },
  },
};
