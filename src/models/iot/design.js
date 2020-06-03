import { delDes, fetchDes, fetchDesById, fetchDesKey, updDes, updDesGroup, updDesName, uploadDes } from '@/services/iot/design';
import { checkResponse } from '@/utils/utils';
import {getImage} from '@/services/iot/blob';

function thumbnail(data) {
  if (!(data && data.items)) return [];
  let { items } = data;
  let img = items.reduce(function (pre, curr) {
    return [...pre, curr.thumbnail]
  }, [])
  return img
}
let designList = [], designImg = [];

export default {
  namespace: 'design',

  state: {
    designList: null, //花样列表
    designNext: null, //花样page页数
    designImgList: null, //花样图片
    desIdDetail: {}, //获取花样
    desIdDetailImg: null,
  },

  effects: {
    *fetchList({ payload, callback }, { call, put, all }) {
      !payload.page && (designList = [], designImg = []);
      const response = yield call(fetchDes, payload);
      let _thumbnail = thumbnail(response);
      const img = yield _thumbnail.map((item, i) => {
        if (!item) return;
        return call(getImage, item);
      })
      designImg = designImg.concat(img || []);
      if (response && response.items) {
        designList = designList.concat(response.items || []);
      };
      yield put({
        type: 'saveList',
        payload: { designList, response, designImg },
      });
    },
    *fetchDesKey({ payload }, { call, put }) {
      !payload.page && (designList = [], designImg = []);
      const response = yield call(fetchDesKey, payload)
      let _thumbnail = thumbnail(response);
      const img = yield _thumbnail.map((item, i) => {
        if (!item) return;
        return call(getImage, item);
      })
      designImg = designImg.concat(img || []);
      if (response && response.items) {
        designList = [...designList, ...response.items];
      };
      yield put({
        type: 'saveList',
        payload: { designList, response, designImg },
      });
    },
    *fetchDesById({ payload }, { call, put }) {
      const response = yield call(fetchDesById, payload);
      let image = response && response.image, img;
      if (!image) img = null;
      else img = yield call(getImage, image);
      yield put({
        type: 'saveDetail',
        payload: { response, img },
      })
    },
    *updDes({ payload, callback }, { call, put }) {
      const response = yield call(updDes, payload);
      checkResponse(response, callback)
    },
    *delDes({ payload, callback }, { call, put }) {
      const response = yield call(delDes, payload);
      checkResponse(response, callback)
    },
    *uploadDes({ payload, callback }, { call, put }) {
      const response = yield call(uploadDes, payload);
      checkResponse(response, callback)
      yield put({
        type: 'fetchList',
        payload: {
          size: 16
        }
      })
    },
    *updDesName({ payload, callback }, { call, put }) {
      const response = yield call(updDesName, payload);
      checkResponse(response, callback);
      if (response || response === 0) {
        yield put({
          type: 'fetchDesById',
          payload: {
            name: payload.newName,
          }
        })
      }
    },
    *updDesGroup({payload,callback},{call, put}) {
      const response = yield call(updDesGroup, payload);
      checkResponse(response, callback);
      if (response || response === 0) {
        yield put({
          type: 'fetchDesById',
          payload: {
            name: payload.name,
          }
        })
      }
    }

  },

  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        designList: payload.designList,
        designNext: payload.response && payload.response.next,
        designImgList: payload.designImg,
      };
    },
    saveDetail(state, { payload }) {
      return {
        ...state,
        desIdDetail: payload.response,
        desIdDetailImg: payload.img,
      }
    }
  },
};
