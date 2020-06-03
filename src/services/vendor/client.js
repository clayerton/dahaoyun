import { stringify } from 'qs';
import request from '@/utils/myRequest';

export async function getClient(params) {
  return request(`/lic/api/v1/customer?${stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function addClient(params) {
  return request(`/lic/api/v1/customer`, {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function delClient(params) {
  return request(`/lic/api/v1/customer/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function upClient(params) {
  return request(`/lic/api/v1/customer`, {
    method: 'PUT',
    data: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
