import { stringify } from 'qs';
import request from '@/utils/myRequest';

// 查询部门
export async function fetchDepartment(params) {
  return request(`/core/api/v1/department?${stringify(params)}`);
}