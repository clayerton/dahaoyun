import { stringify } from 'qs';
import request from '@/utils/myRequest';

export async function getOrderList(params) {
    return request(`/lic/api/v1/order?${stringify(params)}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

export async function delOrder(params) {
    return request(`/lic/api/v1/order/${params.id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

// 新增产品
export async function addOrder(params) {
    return request('/lic/api/v1/order', {
        method: 'POST',
        data: params,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

// 修改产品
export async function updateOrder(params) {
    return request('/lic/api/v1/order', {
        method: 'PUT',
        data: params,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

// 查询订单产品列表
export async function orderProduct(params) {
    return request(`/lic/api/v1/orderproduct?${stringify(params)}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
}
export async function delOrderProduct(params) {
    return request(`/lic/api/v1/orderproduct/${params.id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

export async function addOrderProduct(params) {
    return request('/lic/api/v1/orderproduct', {
        method: 'POST',
        data: params,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

export async function updateOrderProduct(params) {
    return request('/lic/api/v1/orderproduct', {
        method: 'PUT',
        data: params,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

export async function orderScheduling(params) {
    return request('/lic/api/v1/orderScheduling', {
        method: 'POST',
        data: params,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}