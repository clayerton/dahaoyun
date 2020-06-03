import { stringify } from 'qs';
import request from '@/utils/myRequest';

// 获取用户
export async function fetchUserOne(params) {
  return request(`/core/api/v1/user/one?${stringify(params)}`);
}