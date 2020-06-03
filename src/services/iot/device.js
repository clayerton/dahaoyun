import { stringify } from 'qs';
import request from '@/utils/myRequest';

// 查询设备
export async function queryDevice(params) {
  return request(`/iot/api/v1/device?${stringify(params)}`);
}
// 获取设备详细信息
export async function deviceOne(params) {
  return request(`/iot/api/v1/device/one?${stringify(params)}`);
}
// 获取设备实时信息
export async function deviceLive(params) {
  return request(`/iot/api/v1/device/live?${stringify(params)}`);
}