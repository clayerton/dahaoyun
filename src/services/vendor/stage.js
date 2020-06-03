import { stringify } from 'qs';
import request from '@/utils/myRequest';
import requestExport from '@/utils/request_export';

// 查询出库单
export async function getStage(params) {
  return request(`/lic/api/v1/outorder?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 增加出库单
export async function addOutOrder(params) {
  return request('/lic/api/v1/outorder', {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 删除出库单
export async function delStage(params) {
  return request(`/lic/api/v1/outorder/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 查询出库单产品列表
export async function getOutProduct(params) {
  return request(`/lic/api/v1/outproduct?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 修改出库单产品列表
export async function updateOutProduct(params) {
  return request('/lic/api/v1/outproduct', {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 删除出库单产品列表
export async function delOutProduct(params) {
  return request(`/lic/api/v1/outproduct/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 查询出库单分期列表
export async function getInstallmentList(params) {
  return request(`/lic/api/v1/installmentList?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 查询出库单中一期设备解密信息
export async function getInstallmentDeviceList(params) {
  return request(`/lic/api/v1/installmentDeviceList?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 查询出库单中一期设备解密信息
export async function outproductDetails(params) {
  return request(`/lic/api/v1/outproductDetails?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function updateDevice(params) {
  return request('/lic/api/v1/device', {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 设备解除绑定
export async function delOutDevice(params) {
  return request(`/lic/api/v1/device/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 查询设备分期详情
export async function deviceInstallmentDetail(params) {
  return request(`/lic/api/v1/deviceInstallmentDetail?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 设备授权
export async function installmentAuthorize(params) {
  return request('/lic/api/v1/installmentAuthorize', {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 取消设备授权
export async function cancelInstallmentAuthorize(params) {
  return request('/lic/api/v1/cancelInstallmentAuthorize', {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 设备解密
export async function manualEncrypt(params) {
  return request('/lic/api/v1/manualDeviceDecrypt', {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
// 导出密码
export async function exportPassword(params) {
  return requestExport('/lic/api/v1/exportPassword', {
    method: 'POST',
    body: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 设备绑定 (测试)
export async function deviceBind(params) {
  return request('/lic/api/v1/deviceBind', {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// 设备加密（测试）
export async function encrypt(params) {
  return request(`/lic/api/v1/device/encrypt?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
