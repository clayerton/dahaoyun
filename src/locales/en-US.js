import exception from './en-US/exception';
import login from './en-US/login';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import form from './en-US/form';
import request from './en-US/request';
import error from './en-US/errorCode';
import parameter from './en-US/parameter';
import main from './en-US/main';
export default {
  'navBar.lang': 'Languages',
  ...exception,
  ...form,
  ...login,
  ...menu,
  ...request,
  ...settingDrawer,
  ...pwa,
  ...error,
  ...parameter,
  ...main,
};
