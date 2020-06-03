import {
    deploy, deployByDevice, delDeploy
} from '@/services/iot/deploy';
import { checkResponse } from '@/utils/utils';
import { getImage } from '@/services/iot/blob';

function thumbnail(data) {
    if (!(data && data.items)) return [];
    let { items } = data;
    let img = items.reduce(function (pre, curr) {
        return [...pre, curr.thumbnail]
    }, [])
    return img
}
let designList = [], designImg = [], deployList = [];

export default {
    namespace: 'deploy',

    state: {
        design: null,
        designList: [],
        designNext: null,
        designImgList: null,
    },

    effects: {
        *fetchDeploy({ payload }, { call, put }) {
            const response = yield call(deploy, payload);
            yield put({
                type: 'saveDeploy',
                payload: response,
            });
        },
        *deployByDevice({ payload }, { call, put }) {
            !payload.page && (designList = [], designImg = []);

            const response = yield call(deployByDevice, payload);
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
                type: 'saveDeployByDevice',
                payload: { designList, response, designImg },
            });
        },
        *delDeployByDesign({ del, fet, callback }, { call, put }) {
            const response = yield call(delDeploy, del);
            checkResponse(response, callback)

            yield put({
                type: 'fetchDeploy',
                payload: fet,
            });
        },
        *delDeploy({ del, fet }, { call, put }) {
            const response = yield call(delDeploy, del);
            yield put({
                type: 'deployByDevice',
                payload: fet,
            });
        },

    },

    reducers: {
        saveDeploy(state, action) {
            return {
                ...state,
                design: action.payload,
            };
        },
        saveDeployByDevice(state, { payload }) {
            return {
                ...state,
                designList: payload.designList,
                designNext: payload.response && payload.response.next,
                designImgList: payload.designImg,
            }
        },

    },
};
