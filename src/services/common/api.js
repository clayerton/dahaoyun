import { stringify } from 'qs';
import request from '@/utils/request';
export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}
