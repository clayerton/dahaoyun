import React, { Children } from 'react';
// import Redirect from 'umi/redirect';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { getAuthority, COMPANY_TYPE } from '@/utils/authority';
// import Exception403 from '@/pages/Exception/403';
import Redirect from 'umi/redirect';

// function jump() {
//   window.location.href = 'http://localhost:8000';
// }

function AuthComponent({ children, location, routerData }) {
  const auth = getAuthority();
  // const isLogin = auth && auth[0] !== COMPANY_TYPE.none;
  const getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach(route => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      // noMatch={isLogin ? <Exception403 /> : <Redirect to="/user/login" />}
      noMatch={<Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
}

export default connect(({ menu: menuModel }) => ({
  routerData: menuModel.routerData,
}))(AuthComponent);
