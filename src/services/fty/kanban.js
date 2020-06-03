import { stringify } from 'qs';
import request from '@/utils/myRequest';

export async function device(params) {
  return request(`/fty/api/v1/kanban/device?${stringify(params)}`);
}

export async function deviceLive(params) {
  return request(`/fty/api/v1/kanban/device/live?${stringify(params)}`);
}

export async function watchboardGeneral(params) {
  return request(`/fty/api/v1/kanban/general?${stringify(params)}`);
}

export async function watchboardConcise(params) {
  return request(`/fty/api/v1/kanban/concise?${stringify(params)}`);
}