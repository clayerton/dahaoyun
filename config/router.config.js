export default [
  {
    path: '/factory',
    component: '../layouts/factory/BasicLayout',
    name: 'factory',
    Routes: ['src/pages/Authorized'],
    authority: ['FACTORY'],
    routes: [
      { path: '/factory', redirect: '/factory/statistics/homepage' },
      {
        path: '/factory/statistics',
        name: 'statistics',
        icon: 'bar-chart',
        routes: [
          {
            path: '/factory/statistics/homepage',
            name: 'homepage',
            component: './Factory/Monitor',
          },
          // {
          //   path: '/factory/statistics/dashboard',
          //   name: 'dashboard',
          //   component: './DashBoard',
          // },
        ],
      },
      // market
      {
        path: '/factory/market',
        name: 'market',
        icon: 'ordered-list',
        routes: [
          {
            path: '/factory/market/order-list',
            name: 'order-list',
            component: './Factory/Order',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/market/order-list',
                component: './Factory/Order',
              },

            ],
          },
          {
            path: '/factory/market/product',
            name: 'product',
            component: './Factory/Product',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/market/product',
                component: './Factory/Product/ProductList',
              },
              {
                path: '/factory/market/product/add-product',
                component: './Factory/Product/AddOrEditPro',
              },
              {
                path: '/factory/market/product/edit-product',
                component: './Factory/Product/AddOrEditPro',
              },
              {
                path: '/factory/market/product/product-detail',
                component: './Factory/Product/ProductDetail',
              },
            ],
          },
        ],
      },
      // produce
      {
        path: '/factory/produce',
        name: 'produce',
        icon: 'ordered-list',
        routes: [
          {
            path: '/factory/produce/plan',
            name: 'work',
            component: './Factory/Plan',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/produce/plan',
                component: './Factory/Plan',
              },
           
            ],
          },
          {
            path: '/factory/produce/device',
            name: 'device',
            component: './Factory/Device',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/produce/device',
                component: './Factory/Device/DeviceList',
              },
              {
                path: '/factory/produce/device/info',
                component: './Factory/Device/DeviceDetail',
                hideChildrenInMenu: true,
                routes: [
                  { path: '/factory/produce/device/info', redirect: '/factory/produce/device/info/detail' },

                  {
                    path: '/factory/produce/device/info/detail',
                    component: './Factory/Device/DeviceDetail/Detail',
                  },
                  {
                    path: '/factory/produce/device/info/statistics',
                    component: './Factory/Device/DeviceDetail/Statistics',
                  },
                  {
                    path: '/factory/produce/device/info/record',
                    component: './Factory/Device/DeviceDetail/Record',
                  },
                  {
                    path: '/factory/produce/device/info/design',
                    component: './Factory/Device/DeviceDetail/Design',
                  },
                  {
                    path: '/factory/produce/device/info/yield',
                    component: './Factory/Device/DeviceDetail/Yield',
                  },
                ]
              },
            ],
          },
          {
            path: '/factory/produce/design-list',
            name: 'design-list',
            component: './Factory/Design',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/produce/design-list',
                component: './Factory/Design/DesignList',
              },
              {
                path: '/factory/produce/design-list/design-detail',
                component: './Factory/Design/DesignDetail',
              },
              {
                path: '/factory/produce/design-list/design-edit',
                name: 'design-edit',
                component: './Factory/Design/DesignDetail/DesignEdit',
              },
              {
                path: '/factory/produce/design-list/deploy-list',
                name: 'design-edit',
                component: './Factory/Design/Deploy',
              },
            ],
          },
          {
            path: '/factory/produce/output-statistics',
            name: 'output-statistics',
            component: './Factory/Statistics/YieldStatistics',
          },
          {
            path: '/factory/produce/pay',
            name: 'pay',
            component: './Factory/Pay',
          },
        ],
      },
      // setting
      {
        path: '/factory/setting',
        name: 'setting',
        icon: 'tool',
        routes: [
          { path: '/factory/setting/user', redirect: '/factory/setting/user/info' },
          {
            path: '/factory/setting/user',
            name: 'user',
            component: './Factory/Setting/User',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/setting/user/info',
                component: './Factory/Setting/User/Information',
              },
              {
                path: '/factory/setting/user/safe',
                component: './Factory/Setting/User/Safe',
              }
            ]
          },
          { path: '/factory/setting/system', redirect: '/factory/setting/system/department' },

          {
            path: '/factory/setting/system',
            name: 'system',
            component: './Factory/Setting/System',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/factory/setting/system/department',
                component: './Factory/Setting/System/Department',
              },
              {
                path: '/factory/setting/system/role',
                component: './Factory/Setting/System/Role',
              },
              {
                path: '/factory/setting/system/user',
                component: './Factory/Setting/System/User',
              },
              {
                path: '/factory/setting/system/unit',
                component: './Factory/Setting/System/Unit',
              },
              {
                path: '/factory/setting/system/internet',
                component: './Factory/Setting/System/Internet',
              }
            ]
          },
        ],
      },
     
      {
        name: 'exception',
        icon: 'warning',
        path: '/factory/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/factory/exception/403',
            name: 'not-permission',
            component: './Factory/Exception/403',
          },
          {
            path: '/factory/exception/404',
            name: 'not-find',
            component: './Factory/Exception/404',
          },
          {
            path: '/factory/exception/500',
            name: 'server-error',
            component: './Factory/Exception/500',
          },
          {
            path: '/factory/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Factory/Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/vendor',
    component: '../layouts/factory/BasicLayout',
    name: 'vendor',
    Routes: ['src/pages/Authorized'],
    authority: ['VENDOR'],
    routes: [
      { path: '/vendor', redirect: '/vendor/produce/Product' },
      {
        path: '/vendor/produce',
        name: 'produce',
        icon: 'tool',
        routes: [
          {
            path: '/vendor/produce/product',
            name: 'product',
            component: './Vendor/Produce/Product',
          },
          {
            path: '/vendor/produce/order',
            name: 'order',
            hideChildrenInMenu: true,
            component: './Vendor/Produce/Order',
            routes: [
              {
                path: '/vendor/produce/order',
                component: './Vendor/Produce/Order/OrderList',
              },
              {
                path: '/vendor/produce/order/newOrder',
                name: 'newOrder',
                component: './Vendor/Produce/Order/AddOrder',
              },
              {
                path: '/vendor/produce/order/addPlan',
                name: 'addPlan',
                component: './Vendor/Produce/Order/AddPlan',
              },
            ],
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
            component: './Vendor/AfterSale/Stage',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/vendor/afterSale/stage',
                component: './Vendor/AfterSale/Stage/StageList',
              },
              {
                path: '/vendor/afterSale/stage/orderList',
                name: 'orderList',
                component: './Vendor/AfterSale/Stage/StageDetail',
              },
              {
                path: '/vendor/afterSale/stage/machineList',
                name: 'machine',
                component: './Vendor/AfterSale/Stage/MachineStageList',
              },
            ],
          },
          {
            path: '/vendor/afterSale/warranty-list',
            name: 'warranty-list',
            component: './Vendor/AfterSale/Warranty',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/vendor/afterSale/warranty-list',
                component: './Vendor/AfterSale/Warranty/WarrantyList',
              },
              {
                path: '/vendor/afterSale/warranty-detail',
                // name: 'warranty-detail',
                component: './Vendor/AfterSale/Warranty/AddWarranty',
              },
            ],
          },

          {
            path: '/vendor/afterSale/newOrder',
            name: 'newOrder',
            hideInMenu: true,
            component: './Vendor/AfterSale/Stage/NewOrder',
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
            component: './Vendor/Factory/Client',
          },
          {
            path: '/vendor/factory/users',
            name: 'user',
            component: './Vendor/Factory/Users',
          },
        ],
      },
    ],
  },
  // 看板
  {
    path: '/dashboard',
    component: '../layouts/dashboard/BasicLayout',
    routes: [
      { path: '/dashboard', name: 'deviceBoard', component: './Dashboard/DeviceInfoBoard' },
      {
        path: '/dashboard/statistic',
        name: 'statisticalBoard',
        component: './Dashboard/WatchBoardNew',
      },
      {
        path: '/dashboard/statistic2',
        name: 'statisticalBoard2',
        component: './Dashboard/StatisticalBoard',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/public/CommonLayout',
    routes: [
      { path: '/', name: 'home', component: './Public/CommonPages/Home' },
      {
        path: '/user',
        component: './Public/User',
        routes: [
          { path: '/user/login', name: 'login', component: './Public/User/Login' },
          { path: '/user/register', name: 'register', component: './Public/User/Register' },
          {
            path: '/user/register-result',
            name: 'register.result',
            component: './Public/User/RegisterResult',
          },
          {
            path: '/user/forgotpwd',
            name: 'forgotpwd',
            component: './Public/User/ForgotPwd',
          },
          {
            component: '404',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
