import { stringify } from 'qs';
import request from '@/utils/myRequest';
// import fetch from 'dva/fetch';
import { iot } from '@/utils/getUrl'
const baseUrl = iot + '/api/v1/blob/one?';
const checkStatus = async response => {
  const text = await response.text();
  // let responseJson = {};
  // try {
  //   responseJson = JSON.parse(text);
  // } catch (e) {
  //   // 不处理
  // }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error();
  error.name = response.status;
  error.response = responseJson;
  throw error;
};
export async function getImageUrl(params) {
  let url = null;
  let imgUrl = null;
  try {
    let response = await fetch(baseUrl + stringify({ id: params }), {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      responseType: 'arrayBuffer',
    });
    if (response.status === 404) {
      return imgUrl;
    }
    // if (response.status >= 200 && response.status < 300) {
    url = await response.arrayBuffer();
    imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(url).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    // }
  } catch (e) {
    console.log('e', e)
  }
  return imgUrl;
}