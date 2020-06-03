import request from '@/utils/myRequest';
import { stringify } from 'qs';

// 按花样查询排样
export async function deploy(params) {
    return request(`/iot/api/v1/deploy?${stringify(params)}`);
}

// 按设备查询排样
export async function deployByDevice(params) {
    return request(`/iot/api/v1/deploy/device?${stringify(params)}`);
}

// 删除排样
export async function delDeploy(params) {
    return request(`/iot/api/v1/deploy`, {
        method: 'DELETE',
        data: params,

    });
}