import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/factory',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__factory__BasicLayout" */ '../../layouts/factory/BasicLayout'),
          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/factory/BasicLayout').default,
    name: 'factory',
    Routes: [require('../Authorized').default],
    authority: ['FACTORY'],
    routes: [
      {
        path: '/factory',
        redirect: '/factory/statistics/homepage',
        exact: true,
      },
      {
        path: '/factory/statistics',
        name: 'statistics',
        icon: 'bar-chart',
        routes: [
          {
            path: '/factory/statistics/homepage',
            name: 'homepage',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Monitor" */ '../Factory/Monitor'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Monitor').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/factory/market',
        name: 'market',
        icon: 'ordered-list',
        routes: [
          {
            path: '/factory/market/order-list',
            name: 'order-list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Order" */ '../Factory/Order'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Order').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/market/order-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Order" */ '../Factory/Order'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Order').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/factory/market/product',
            name: 'product',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Product" */ '../Factory/Product'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Product').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/market/product',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Product" */ '../Factory/Product/ProductList'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Product/ProductList').default,
                exact: true,
              },
              {
                path: '/factory/market/product/add-product',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Product" */ '../Factory/Product/AddOrEditPro'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Product/AddOrEditPro').default,
                exact: true,
              },
              {
                path: '/factory/market/product/edit-product',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Product" */ '../Factory/Product/AddOrEditPro'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Product/AddOrEditPro').default,
                exact: true,
              },
              {
                path: '/factory/market/product/product-detail',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Product" */ '../Factory/Product/ProductDetail'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Product/ProductDetail').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/factory/produce',
        name: 'produce',
        icon: 'ordered-list',
        routes: [
          {
            path: '/factory/produce/plan',
            name: 'work',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Plan" */ '../Factory/Plan'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Plan').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/produce/plan',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Plan" */ '../Factory/Plan'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Plan').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/factory/produce/device',
            name: 'device',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Device').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/produce/device',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device/DeviceList'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Device/DeviceList').default,
                exact: true,
              },
              {
                path: '/factory/produce/device/info',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device/DeviceDetail'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Device/DeviceDetail').default,
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/factory/produce/device/info',
                    redirect: '/factory/produce/device/info/detail',
                    exact: true,
                  },
                  {
                    path: '/factory/produce/device/info/detail',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device/DeviceDetail/Detail'),
                          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../Factory/Device/DeviceDetail/Detail')
                          .default,
                    exact: true,
                  },
                  {
                    path: '/factory/produce/device/info/statistics',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device/DeviceDetail/Statistics'),
                          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../Factory/Device/DeviceDetail/Statistics')
                          .default,
                    exact: true,
                  },
                  {
                    path: '/factory/produce/device/info/record',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device/DeviceDetail/Record'),
                          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../Factory/Device/DeviceDetail/Record')
                          .default,
                    exact: true,
                  },
                  {
                    path: '/factory/produce/device/info/design',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device/DeviceDetail/Design'),
                          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../Factory/Device/DeviceDetail/Design')
                          .default,
                    exact: true,
                  },
                  {
                    path: '/factory/produce/device/info/yield',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "p__Factory__Device" */ '../Factory/Device/DeviceDetail/Yield'),
                          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../Factory/Device/DeviceDetail/Yield').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/factory/produce/design-list',
            name: 'design-list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Design" */ '../Factory/Design'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Design').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/produce/design-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Design" */ '../Factory/Design/DesignList'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Design/DesignList').default,
                exact: true,
              },
              {
                path: '/factory/produce/design-list/design-detail',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Design" */ '../Factory/Design/DesignDetail'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Design/DesignDetail').default,
                exact: true,
              },
              {
                path: '/factory/produce/design-list/design-edit',
                name: 'design-edit',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Design" */ '../Factory/Design/DesignDetail/DesignEdit'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Design/DesignDetail/DesignEdit')
                      .default,
                exact: true,
              },
              {
                path: '/factory/produce/design-list/deploy-list',
                name: 'design-edit',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Design" */ '../Factory/Design/Deploy'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Design/Deploy').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/factory/produce/output-statistics',
            name: 'output-statistics',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Statistics__YieldStatistics" */ '../Factory/Statistics/YieldStatistics'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Statistics/YieldStatistics').default,
            exact: true,
          },
          {
            path: '/factory/produce/pay',
            name: 'pay',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Pay" */ '../Factory/Pay'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Pay').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/factory/setting',
        name: 'setting',
        icon: 'tool',
        routes: [
          {
            path: '/factory/setting/user',
            redirect: '/factory/setting/user/info',
            exact: true,
          },
          {
            path: '/factory/setting/user',
            name: 'user',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Setting__User" */ '../Factory/Setting/User'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Setting/User').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/setting/user/info',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Setting__User" */ '../Factory/Setting/User/Information'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Setting/User/Information').default,
                exact: true,
              },
              {
                path: '/factory/setting/user/safe',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Setting__User" */ '../Factory/Setting/User/Safe'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Setting/User/Safe').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/factory/setting/system',
            redirect: '/factory/setting/system/department',
            exact: true,
          },
          {
            path: '/factory/setting/system',
            name: 'system',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Setting__System" */ '../Factory/Setting/System'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Setting/System').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/setting/system/department',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Setting__System" */ '../Factory/Setting/System/Department'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Setting/System/Department').default,
                exact: true,
              },
              {
                path: '/factory/setting/system/role',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Setting__System" */ '../Factory/Setting/System/Role'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Setting/System/Role').default,
                exact: true,
              },
              {
                path: '/factory/setting/system/user',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Setting__System" */ '../Factory/Setting/System/User'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Setting/System/User').default,
                exact: true,
              },
              {
                path: '/factory/setting/system/unit',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Setting__System" */ '../Factory/Setting/System/Unit'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Setting/System/Unit').default,
                exact: true,
              },
              {
                path: '/factory/setting/system/internet',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Factory__Setting__System" */ '../Factory/Setting/System/Internet'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Factory/Setting/System/Internet').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/factory/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/factory/exception/403',
            name: 'not-permission',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Factory__Exception__models__error.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Factory/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Exception__403" */ '../Factory/Exception/403'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Exception/403').default,
            exact: true,
          },
          {
            path: '/factory/exception/404',
            name: 'not-find',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Factory__Exception__models__error.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Factory/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Exception__404" */ '../Factory/Exception/404'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Exception/404').default,
            exact: true,
          },
          {
            path: '/factory/exception/500',
            name: 'server-error',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Factory__Exception__models__error.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Factory/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Exception__500" */ '../Factory/Exception/500'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Exception/500').default,
            exact: true,
          },
          {
            path: '/factory/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Factory__Exception__models__error.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Factory/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Factory__Exception__TriggerException" */ '../Factory/Exception/TriggerException'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Factory/Exception/TriggerException').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/vendor',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__factory__BasicLayout" */ '../../layouts/factory/BasicLayout'),
          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/factory/BasicLayout').default,
    name: 'vendor',
    Routes: [require('../Authorized').default],
    authority: ['VENDOR'],
    routes: [
      {
        path: '/vendor',
        redirect: '/vendor/produce/Product',
        exact: true,
      },
      {
        path: '/vendor/produce',
        name: 'produce',
        icon: 'tool',
        routes: [
          {
            path: '/vendor/produce/product',
            name: 'product',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Vendor__Produce__models__category.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/category.js').then(
                      m => {
                        return { namespace: 'category', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Vendor__Produce__models__order.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/order.js').then(
                      m => {
                        return { namespace: 'order', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Vendor__Produce__Product" */ '../Vendor/Produce/Product'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Vendor/Produce/Product').default,
            exact: true,
          },
          {
            path: '/vendor/produce/order',
            name: 'order',
            hideChildrenInMenu: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Vendor__Produce__models__category.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/category.js').then(
                      m => {
                        return { namespace: 'category', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Vendor__Produce__models__order.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/order.js').then(
                      m => {
                        return { namespace: 'order', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Vendor__Produce__Order" */ '../Vendor/Produce/Order'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Vendor/Produce/Order').default,
            routes: [
              {
                path: '/vendor/produce/order',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Vendor__Produce__models__category.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/category.js').then(
                          m => {
                            return { namespace: 'category', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Vendor__Produce__models__order.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/order.js').then(
                          m => {
                            return { namespace: 'order', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__Produce__Order" */ '../Vendor/Produce/Order/OrderList'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/Produce/Order/OrderList').default,
                exact: true,
              },
              {
                path: '/vendor/produce/order/newOrder',
                name: 'newOrder',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Vendor__Produce__models__category.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/category.js').then(
                          m => {
                            return { namespace: 'category', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Vendor__Produce__models__order.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/order.js').then(
                          m => {
                            return { namespace: 'order', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__Produce__Order" */ '../Vendor/Produce/Order/AddOrder'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/Produce/Order/AddOrder').default,
                exact: true,
              },
              {
                path: '/vendor/produce/order/addPlan',
                name: 'addPlan',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Vendor__Produce__models__category.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/category.js').then(
                          m => {
                            return { namespace: 'category', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Vendor__Produce__models__order.js' */ '/Users/liuhaoyu/Desktop/dh-cloud/src/pages/Vendor/Produce/models/order.js').then(
                          m => {
                            return { namespace: 'order', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__Produce__Order" */ '../Vendor/Produce/Order/AddPlan'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/Produce/Order/AddPlan').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/vendor/afterSale',
        name: 'after-sale',
        icon: 'tool',
        routes: [
          {
            path: '/vendor/afterSale/stage',
            name: 'stage',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Vendor__AfterSale__Stage" */ '../Vendor/AfterSale/Stage'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Vendor/AfterSale/Stage').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/vendor/afterSale/stage',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__AfterSale__Stage" */ '../Vendor/AfterSale/Stage/StageList'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/AfterSale/Stage/StageList').default,
                exact: true,
              },
              {
                path: '/vendor/afterSale/stage/orderList',
                name: 'orderList',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__AfterSale__Stage" */ '../Vendor/AfterSale/Stage/StageDetail'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/AfterSale/Stage/StageDetail').default,
                exact: true,
              },
              {
                path: '/vendor/afterSale/stage/machineList',
                name: 'machine',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__AfterSale__Stage" */ '../Vendor/AfterSale/Stage/MachineStageList'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/AfterSale/Stage/MachineStageList')
                      .default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/vendor/afterSale/warranty-list',
            name: 'warranty-list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Vendor__AfterSale__Warranty" */ '../Vendor/AfterSale/Warranty'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Vendor/AfterSale/Warranty').default,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/vendor/afterSale/warranty-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__AfterSale__Warranty" */ '../Vendor/AfterSale/Warranty/WarrantyList'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/AfterSale/Warranty/WarrantyList')
                      .default,
                exact: true,
              },
              {
                path: '/vendor/afterSale/warranty-detail',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Vendor__AfterSale__Warranty" */ '../Vendor/AfterSale/Warranty/AddWarranty'),
                      LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Vendor/AfterSale/Warranty/AddWarranty').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/vendor/afterSale/newOrder',
            name: 'newOrder',
            hideInMenu: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Vendor__AfterSale__Stage__NewOrder" */ '../Vendor/AfterSale/Stage/NewOrder'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Vendor/AfterSale/Stage/NewOrder').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/vendor/factory',
        name: 'factory',
        icon: 'tool',
        routes: [
          {
            path: '/vendor/factory/client',
            name: 'client',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Vendor__Factory__Client" */ '../Vendor/Factory/Client'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Vendor/Factory/Client').default,
            exact: true,
          },
          {
            path: '/vendor/factory/users',
            name: 'user',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Vendor__Factory__Users" */ '../Vendor/Factory/Users'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Vendor/Factory/Users').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/dashboard',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__dashboard__BasicLayout" */ '../../layouts/dashboard/BasicLayout'),
          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/dashboard/BasicLayout').default,
    routes: [
      {
        path: '/dashboard',
        name: 'deviceBoard',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Dashboard__DeviceInfoBoard" */ '../Dashboard/DeviceInfoBoard'),
              LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                .default,
            })
          : require('../Dashboard/DeviceInfoBoard').default,
        exact: true,
      },
      {
        path: '/dashboard/statistic',
        name: 'statisticalBoard',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Dashboard__WatchBoardNew" */ '../Dashboard/WatchBoardNew'),
              LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                .default,
            })
          : require('../Dashboard/WatchBoardNew').default,
        exact: true,
      },
      {
        path: '/dashboard/statistic2',
        name: 'statisticalBoard2',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Dashboard__StatisticalBoard" */ '../Dashboard/StatisticalBoard'),
              LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                .default,
            })
          : require('../Dashboard/StatisticalBoard').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__public__CommonLayout" */ '../../layouts/public/CommonLayout'),
          LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/public/CommonLayout').default,
    routes: [
      {
        path: '/',
        name: 'home',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Public__CommonPages__Home" */ '../Public/CommonPages/Home'),
              LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                .default,
            })
          : require('../Public/CommonPages/Home').default,
        exact: true,
      },
      {
        path: '/user',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Public__User" */ '../Public/User'),
              LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                .default,
            })
          : require('../Public/User').default,
        routes: [
          {
            path: '/user/login',
            name: 'login',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Public__User__Login" */ '../Public/User/Login'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Public/User/Login').default,
            exact: true,
          },
          {
            path: '/user/register',
            name: 'register',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Public__User__Register" */ '../Public/User/Register'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Public/User/Register').default,
            exact: true,
          },
          {
            path: '/user/register-result',
            name: 'register.result',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Public__User__RegisterResult" */ '../Public/User/RegisterResult'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Public/User/RegisterResult').default,
            exact: true,
          },
          {
            path: '/user/forgotpwd',
            name: 'forgotpwd',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Public__User__ForgotPwd" */ '../Public/User/ForgotPwd'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../Public/User/ForgotPwd').default,
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/liuhaoyu/Desktop/dh-cloud/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/liuhaoyu/Desktop/dh-cloud/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
