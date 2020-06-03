import request from '@/utils/myRequest';
import requestImg from '@/utils/myRequestImg';
import { stringify } from 'qs';

// 上传花样
export async function uploadDes(params) {
  return request('/iot/api/v1/design', {
    method: 'POST',
    data: params,
  });
}

// 查询花样
export async function fetchDes(params) {
  return request(`/iot/api/v1/design?${stringify(params)}`);
}

// 关键词查询
export async function fetchDesKey(params) {
  return request(`/iot/api/v1/design/key?${stringify(params)}`)
}

// 根ID获取花样
export async function fetchDesById(params) {
  return request(`/iot/api/v1/design/one?${stringify(params)}`);
}

// 删除花样
export async function delDes(params) {
  return request(`/iot/api/v1/design?${stringify(params)}`, {
    method: 'DELETE',
  });
}

// 修改花样
export async function updDes(params) {
  return request('/iot/api/v1/design', {
    method: 'PUT',
    data: params,
  });
}

// 修改名称
export async function updDesName(params) {
  return request('/iot/api/v1/design/name', {
    method: 'PUT',
    data: params,
  });
}

// 修改分组
export async function updDesGroup(params) {
  return request('/iot/api/v1/design/group', {
    method: 'PUT',
    data: params,
  });
}