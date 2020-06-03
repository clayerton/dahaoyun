import request from '@/utils/myRequest';
import { stringify } from 'qs';

// 查询设备产量
export async function yieldByDevice(params) {
    return request(`/iot/api/v1/yield/device?${stringify(params)}`);
}