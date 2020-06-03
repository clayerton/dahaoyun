import error from './zh-CN/errorCode';
import exception from './zh-CN/exception';
import login from './zh-CN/login';
import menu from './zh-CN/menu';
import parameter from './zh-CN/parameter';
import pwa from './zh-CN/pwa';
import request from './zh-CN/request';
import settingDrawer from './zh-CN/settingDrawer';
import form from './zh-CN/form';
import main from './zh-CN/main';
import _request from './zh-CN/_request';
export default {
  'navBar.lang': '语言',
  ...exception,
  ...login,
  ...menu,
  ...form,
  ...settingDrawer,
  ...pwa,
  ...request,
  ...parameter,
  ...error,
  ...main,
  ..._request,
};
