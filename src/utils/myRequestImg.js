import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import { Redirect } from 'umi';
import {fty, core, iot} from '@/utils/getUrl'

function raceFetch(urlBase, options, tout = 30) {
  const second = tout * 1000;
  let url = urlBase;
  if(url.includes('iot')) url = iot + url.slice(4); 
  if(url.includes('fty')) url = fty + url.slice(4); 
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
  const text = await response.arrayBuffer();
  let responseJson = null;
  try {
    responseJson = 'data:image/png;base64,' + btoa(new Uint8Array(text).reduce((data, byte) => data + String.fromCharCode(byte), ''))
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
export default function request(url, options) {
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    responseType: 'arrayBuffer',
  };
  const newOptions = { ...defaultOptions };
  
  return raceFetch(url, newOptions)
    .then(checkStatus)
    .catch(e => {
      const status = e.name;
      const body = e.response;
      const content = e.message;
      const UNKNOWN = typeof body === 'object' && body.errors;

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
        router.push('/factory/exception/500');
        return;
      }
     
    });
}
