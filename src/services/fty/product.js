import { stringify } from 'qs';
import request from '@/utils/myRequest';
// 查询产品
export async function productFetch(params) {
  return request(`/fty/api/v1/product?${stringify(params)}`);
}
// 关键字查询
export async function productKey(params) {
  return request(`/fty/api/v1/product/key?${stringify(params)}`);
}
// 添加产品
export async function addProduct(params) {
  return request(`/fty/api/v1/product`, {
    method: 'POST',
    data: params,
  })
}
// 查询分组
export async function groupFetch(params) {
  return request(`/fty/api/v1/group?${stringify(params)}`);
}
// 获取产品
export async function productOne(params) {
  return request(`/fty/api/v1/product/one?${stringify(params)}`);
}
// 修改产品
export async function productModify(params) {
  return request(`/fty/api/v1/product`, {
    method: 'PUT',
    data: params,
  })
}
// 删除产品
export async function delProduct(params) {
  return request(`/fty/api/v1/product?${stringify(params)}`, {
    method: 'DELETE',
  })
}