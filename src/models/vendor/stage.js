import { getStage, addOutOrder, delStage, getOutProduct, updateOutProduct, delOutProduct, getInstallmentList, getInstallmentDeviceList, outproductDetails, updateDevice, delOutDevice, deviceInstallmentDetail, installmentAuthorize, cancelInstallmentAuthorize, manualEncrypt, exportPassword,deviceBind,encrypt } from '@/services/vendor/stage';
import { checkResponse } from '@/utils/utils';
import { dedupeCraftList } from '@/utils/listdeduplication';

export default {
    namespace: 'stage',
    state: {
        stageList: [], //分期管理列表
        installmentList: [], //出库单分期列表
        installmentDeviceList: [], //  出库单中一期设备解密信息
        outProduct: [],
        outproductDetails: [],
        deviceInstallmentDetail: [], //查询设备分期详情
    },
    effects: {
        *getStageList({ payload }, { call, put }) {
            const response = yield call(getStage, payload);
            let newResponse = response; //下一页为空请求上一页数据
            if (response && response.items && response.items.length === 0 && payload && payload.page > 0) {
                newResponse = yield call(getProductList, { ...payload, page: payload.page - 1 });
            }
            yield put({ type: 'save', payload: newResponse })
        },
        *addStageList({ payload, callback }, { call, put }) {
            // 增加
            const response = yield call(addOutOrder, payload.add);
            checkResponse(response, callback);
            yield put({ type: 'getStageList', payload: payload.fetch });
        },
        *delStageList({ payload }, { call, put }) {
            const response = yield call(delStage, payload.del);
            yield put({ type: 'getStageList', payload: payload.fet });
        },

        *getInstallmentList({ payload }, { call, put }) {
            const response = yield call(getInstallmentList, payload);
            yield put({ type: 'save1', payload: response })
        },
        *getInstallmentDeviceList({ payload }, { call, put }) {
            const response = yield call(getInstallmentDeviceList, payload);
            yield put({ type: 'save2', payload: response })
        },
        *getOutProduct({ payload }, { call, put }) {
            const response = yield call(getOutProduct, { count: 100, ...payload });
            yield put({ type: 'save3', payload: {response, payload} })
        },
        *delOutProduct({ payload }, { call, put }) {
            const response = yield call(delOutProduct, payload.del);
            checkResponse(response);
            yield put({ type: 'getOutProduct', payload: payload.fetch });
            yield put({ type: 'getStageList', payload: payload.fet });
        },
        *updateOutProduct({ payload, callback }, { call, put }) {
            const response = yield call(updateOutProduct, payload.upd);
            checkResponse(response, callback);
            yield put({ type: 'getOutProduct', payload: payload.fetch });
            yield put({ type: 'getStageList', payload: payload.fet });
        },
        *outproductDetails({ payload }, { call, put }) {
            const response = yield call(outproductDetails, payload);
            let newResponse = response; //下一页为空请求上一页数据
            if (response && response.items && response.items.length === 0 && payload && payload.page > 0) {
                newResponse = yield call(outproductDetails, { ...payload, page: payload.page - 1 });
            }
            yield put({ type: 'save4', payload: newResponse })
        },
        *updateDevice({ payload, callback }, { call, put }) {
            const response = yield call(updateDevice, payload.upd);
            checkResponse(response, callback);
            yield put({ type: 'outproductDetails', payload: payload.fetch });
        },
        *delOutDevice({ payload, callback }, { call, put }) {
            const response = yield call(delOutDevice, payload.del);
            checkResponse(response, callback);
            yield put({ type: 'outproductDetails', payload: payload.fetch });
        },
        *deviceInstallmentDetail({ payload, callback }, { call, put }) {
            const response = yield call(deviceInstallmentDetail, payload);
            yield put({ type: 'save5', payload: response })
        },
        *installmentAuthorize({ payload, callback }, { call, put }) {
            const response = yield call(installmentAuthorize, payload.add);
            checkResponse(response, callback);
            yield put({ type: 'deviceInstallmentDetail', payload: payload.fetch })
            yield put({ type: 'outproductDetails', payload: payload.fet });
        },
        *cancelInstallmentAuthorize({ payload, callback }, { call, put }) {
            const response = yield call(cancelInstallmentAuthorize, payload.add);
            checkResponse(response, callback);
            yield put({ type: 'deviceInstallmentDetail', payload: payload.fetch })
            yield put({ type: 'outproductDetails', payload: payload.fet });
        },
        *manualEncrypt({ payload, callback }, { call, put }) {
            const response = yield call(manualEncrypt, payload.add);
            checkResponse(response, callback);
            yield put({ type: 'deviceInstallmentDetail', payload: payload.fetch })
            yield put({ type: 'outproductDetails', payload: payload.fetchStage });
        },
        *exportPassword({ payload, callback }, { call, put }) {
            const response = yield call(exportPassword, payload);
        },
        *deviceBind({ payload, callback }, { call, put }) {
            const response = yield call(deviceBind, payload.add);
            checkResponse(response, callback);
            yield put({ type: 'getOutProduct', payload: payload.fetch });
            yield put({ type: 'getStageList', payload: payload.fet });
        },
        *encrypt({ payload, callback }, { call, put }) {
            const response = yield call(encrypt, payload.add);
            checkResponse(response);
            yield put({ type: 'outproductDetails', payload: payload.fetch });
        },
        
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                stageList: action.payload
            }
        },
        save1(state, action) {
            return {
                ...state,
                installmentList: action.payload
            }
        },
        save2(state, action) {
            return {
                ...state,
                installmentDeviceList: action.payload
            }
        },
        save3(state, action) {
            return {
                ...state,
                outProduct: dedupeCraftList([
                    { orderid: action.payload.payload.id, value: action.payload.response },
                    ...state.outProduct,
                ])
            }
        },
        save4(state, action) {
            return {
                ...state,
                outproductDetails: action.payload
            }
        },
        save5(state, action) {
            return {
                ...state,
                deviceInstallmentDetail: action.payload
            }
        },
    }
}