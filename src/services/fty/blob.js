import requestImg from '@/utils/myRequestImg';

// 获取文件 
export async function getImage(params) {
    return requestImg(`/fty/api/v1/blob/one?id=${params}`, {
        responseType: 'arrayBuffer',
    });
}