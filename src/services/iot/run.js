import request from '@/utils/myRequest';
import { stringify } from 'qs';

// 查询记录
export async function runFet(params) {
    return request(`/iot/api/v1/run?${stringify(params)}`);
}
// 查询状态
export async function runState(params) {
    return request(`/iot/api/v1/run/state?${stringify(params)}`);
}
// 查询状态原因
export async function runReason(params) {
    return request(`/iot/api/v1/run/reason?${stringify(params)}`);
}
// 查询位置
export async function runPosition(params) {
    return request(`/iot/api/v1/run/position?${stringify(params)}`);
}
// 查询稼动率
export async function runUtilize(params) {
    return request(`/iot/api/v1/run/utilize?${stringify(params)}`);
}