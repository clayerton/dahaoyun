import request from '@/utils/myRequest';
import { stringify } from 'qs';

// 查询首页
export async function queryHome(params) {
    return request(`/iot/api/v1/home?${stringify(params)}`);
}