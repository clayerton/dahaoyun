import { router } from 'umi';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  // if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  //   return ['admin'];
  // }
  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('authority', JSON.stringify(proAuthority));
}

export function authNameByCompany(company) {
  if (company && company.type && company.state && company.state === 'normal') {
    return COMPANY_TYPE[company.type];
  }
  return COMPANY_TYPE.none;
}

export const COMPANY_TYPE = {
  none: 'NONE',
  admin: 'ADMIN',
  vendor: 'VENDOR',
  factory: 'FACTORY',
  undefined: 'NONE',
};

export function jumpToNextScreen(type) {
  switch (type) {
    case COMPANY_TYPE.admin:
      router.push('/dahao');
      break;
    case COMPANY_TYPE.vendor:
      router.push('/vendor');
      break;
    case COMPANY_TYPE.factory:
      router.push('/factory');
      break;
    default:
      // router.push('/cloud/my-company');
      null;
      break;
  }
}
