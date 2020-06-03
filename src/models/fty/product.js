import { productFetch, groupFetch, productKey, addProduct, productOne, productModify, delProduct } from '@/services/fty/product';
import { getImage } from '@/services/fty/blob';
import { checkResponse } from '@/utils/utils';

function thumbnail(data) {
    if (!(data && data.items)) return [];
    let { items } = data;
    let img = items.reduce(function (pre, curr) {
        return [...pre, curr.image]
    }, []);
    return img;
}
let productList = [], productImg = [];

export default {
    namespace: 'product',
    state: {
        productList: [],
        productNext: null, //page页数
        productImgList: null, //图片
        groupList: null,
        productOne: {},
        productListOne: null,
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            !payload.page && (productList = [], productImg = []);
            const response = yield call(productFetch, payload);
            let _thumbnail = thumbnail(response);
            const img = yield _thumbnail.map((item, i) => {
                if (!item) return;
                return call(getImage, item);
            })
            productImg = productImg.concat(img || []);
            if (response && response.items) {
                productList = productList.concat(response.items || []);
            };

            yield put({
                type: 'saveList',
                payload: { productList, response, productImg },
            });
        },
        *group({ payload }, { call, put }) {
            const response = yield call(groupFetch, payload);
            let items = response && response.items || [];
            items = [{ name: null }].concat(items)
            yield put({
                type: 'groupList',
                payload: items,
            });
        },
        *productKey({ payload }, { call, put }) {
            !payload.page && (productList = [], productImg = []);
            const response = yield call(productKey, payload);
            let _thumbnail = thumbnail(response);
            const img = yield _thumbnail.map((item, i) => {
                if (!item) return;
                return call(getImage, item);
            })
            productImg = productImg.concat(img || []);
            if (response && response.items) {
                productList = productList.concat(response.items || []);
            };
            yield put({
                type: 'saveList',
                payload: { productList, response, productImg },
            });
        },
        *addProduct({ payload, callback }, { call, put }) {
            const response = yield call(addProduct, payload);
            checkResponse(response, callback)
        },
        *productOne({ payload, callback }, { call, put }) {
            const response = yield call(productOne, payload);
            let _thumbnail = thumbnail(response);
            // const img = yield _thumbnail.map((item, i) => {
            //     if (!item) return;
            //     return call(getImage, item);
            // })
            const img = response && response.image && (yield call(getImage, response.image))

            console.log(response, img, _thumbnail)
            yield put({
                type: 'saveOne',
                payload: { response, img },
            });
        },
        *productModify({ payload, callback }, { call, put }) {
            const response = yield call(productModify, payload);
            checkResponse(response, callback)
        },
        *delProduct({ payload, callback }, { call, put }) {
            const response = yield call(delProduct, payload);
            checkResponse(response, callback)
        },

    },
    reducers: {
        saveList(state, { payload }) {
            return {
                ...state,
                productList: payload.productList,
                designNext: payload.response && payload.response.next,
                productImgList: payload.productImg,
            }
        },
        groupList(state, { payload }) {
            return {
                ...state,
                groupList: payload
            }
        },
        saveOne(state, { payload }) {
            return {
                ...state,
                productOne: payload.response,
                productImgOne: payload.img,
            }
        },
    }
}