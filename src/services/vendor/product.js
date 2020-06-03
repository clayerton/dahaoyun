import { stringify } from 'qs';
import request from '@/utils/myRequest';

export async function getProductList(params) {
  return request(`/lic/api/v1/product?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function delProduct(params) {
  return request(`/lic/api/v1/product/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 新增产品
export async function addProduct(params) {
  return request('/lic/api/v1/product', {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 修改产品
export async function updateProduct(params) {
  return request('/lic/api/v1/product', {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function getProductType(params) {
  return request(`/lic/api/v1/productType?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}