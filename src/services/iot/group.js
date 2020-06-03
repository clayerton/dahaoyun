import { stringify } from 'qs';
import request from '@/utils/myRequest';

// 查询分组
export async function queryGroup(params) {
  return request(`/iot/api/v1/group?${stringify(params)}`);
}

// 添加分组
export async function addGroup(params) {
  return request(`/iot/api/v1/group?${stringify(params)}`, {
    method: 'POST',
    data: params,
  });
}

// 删除分组
export async function delGroup(params) {
  return request(`/iot/api/v1/group?${stringify(params)}`,{
    method: 'DELETE',
    data: params,
  });
}

// 获取分组
export async function queryGroupKey(params) {
  return request(`/iot/api/v1/group/one?${stringify(params)}`);
}