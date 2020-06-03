import { stringify } from 'qs';
import request from '@/utils/myRequest';

// 获取订单
export async function fetchOrder(params) {
  return request(`/fty/api/v1/order?${stringify(params)}`);
}
// 获取订单产品
export async function fetchOrderOne(params) {
  return request(`/fty/api/v1/order/one?${stringify(params)}`);
}
// 关键字查询
export async function fetchOrderKey(params) {
  return request(`/fty/api/v1/order/key?${stringify(params)}`);
}
