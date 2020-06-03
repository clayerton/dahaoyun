import request from '@/utils/myRequest';

export default async function queryError(code) {
  return request(`/api/${code}`);
}
