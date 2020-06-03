import { stringify } from 'qs';
import request from '@/utils/myRequest';
// 稼动率查询
export async function queryUtilization(params) {
  return request(`/fty/api/v1/device/utilization?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function queryFault(params) {
  return request(`/fty/api/v1/device/error?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 绑定和解绑
export async function untiedDevice(params) {
  return request('/fty/api/v1/device/bind', {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
