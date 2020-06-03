import { stringify } from 'qs';
import request from '@/utils/myRequest';

export async function queryOverview(params) {
  return request(`/fty/api/v1/overview?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function queryWorkshop(params) {
  return request(`/fty/api/v1/yield/workshop?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function queryDevice(params) {
  return request(`/fty/api/v1/yield/device?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function queryProduct(params) {
  return request(`/fty/api/v1/yield/product?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function queryDesign(params) {
  return request(`/fty/api/v1/yield/design?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
