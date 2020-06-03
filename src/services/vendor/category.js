import { stringify } from 'qs';
import request from '@/utils/myRequest';

// 新增类型
export async function addCategory(params) {
  return request('/lic/api/v1/productType', {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 查询类型
export async function search(params) {
  return request(`/lic/api/v1/productType?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 删除类型
export async function delType(params) {
  return request(`/lic/api/v1/productType/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 修改类型
export async function updateType(params) {
  return request(`/lic/api/v1/productType`, {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
