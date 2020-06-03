import requestImg from '@/utils/myRequestImg';

// 获取文件 [iot_design_download]
export async function getImage(params) {
    return requestImg(`/iot/api/v1/blob/one?id=${params}`, {
        responseType: 'arrayBuffer',
    });
}