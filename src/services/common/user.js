import request from '@/utils/myRequest';
import { stringify } from 'qs';

export async function query(params) {
  return request(`/core/api/v1/company/user?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/core/api/v1/company/user', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function delUser(params) {
  return request(`/core/api/v1/company/user/${params.id}`, {
    method: 'DELETE',
  });
}

export async function updUser(params) {
  return request(`/core/api/v1/company/user`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function querySms(params) {
  return request('/core/api/v1/sms/reset', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function register(params) {
  return request('/core/api/v1/user/register', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function login(params) {
  return request('/core/api/v1/user/login', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function updatePas(params) {
  return request('/core/api/v1/user/pwd/reset', {
    method: 'PUT',
    data: {
      ...params,
    }
  });
}

export async function modifyAccount(params) {
  return request('/core/api/v1/user', {
    method: 'PUT',
    data: {
      ...params,
    }
  });
}

export async function modifyPassword(params) {
  return request('/core/api/v1/user/pwd', {
    method: 'PUT',
    data: {
      ...params,
    }
  });
}

export async function unit(params) {
  return request(`/iot/api/v1/unit?${stringify(params)}`);
}
