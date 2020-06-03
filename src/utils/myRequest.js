import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import {fty, core, iot} from '@/utils/getUrl'
function raceFetch(url, options, tout = 30) {
  const second = tout * 1000;
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => {
        const err = new Error('fetch timeout');
        err.name = 444;
        reject(err);
      }, second)
    ),
  ]);
}

const checkStatus = async response => {
  const text = await response.text();
  let responseJson = {};
  try {
    responseJson = JSON.parse(text);
  } catch (e) {
    // 不处理
  }
  if (response.status >= 200 && response.status < 300) {
    return responseJson;
  }
  const error = new Error();
  error.name = response.status;
  error.response = responseJson;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(urlBase, options = {}) {
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  let url = urlBase;
  if(url.includes('core')) url = core + url.slice(5); 
  if(url.includes('iot')) url = iot + url.slice(4); 
  if(url.includes('fty')) url = fty + url.slice(4); 

  const newOptions = {  ...defaultOptions,...options, body: options.data || null };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
   
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      newOptions.body = JSON.stringify(newOptions.data);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
    }
  }

  return raceFetch(url, newOptions)
    .then(checkStatus)
    .catch(e => {
      const status = e.name;
      const body = e.response;
      const content = e.message;
      const UNKNOWN = typeof body === 'object' && body.errors;

      if (status === 400) {
        notification.error({
          message: UNKNOWN
            ? formatMessage({ id: `request.unknown` })
            : formatMessage({ id: `request.${body}` }),
          description: UNKNOWN ? JSON.stringify(body) : null,
        });
      } else if (status > 400) {
        notification.error({
          message: formatMessage({ id: `request.${status}` }),
        });
      } else if (status === 'TypeError' && content === 'Failed to fetch') {
        notification.error({
          message: formatMessage({ id: `request.${content}` }),
        });
      }

      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'user_global/logout',
        });
        return;
      }
      // // environment should not be used
      if (status === 403) {
        router.push('/factory/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        return;
      }
    });
}
