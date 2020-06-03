import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/common/global.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/common/menu.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/common/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/common/user.js').default) });
app.model({ namespace: 'department', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/core/department.js').default) });
app.model({ namespace: 'user', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/core/user.js').default) });
app.model({ namespace: 'kanban', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/fty/kanban.js').default) });
app.model({ namespace: 'order', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/fty/order.js').default) });
app.model({ namespace: 'product', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/fty/product.js').default) });
app.model({ namespace: 'deploy', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/deploy.js').default) });
app.model({ namespace: 'design', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/design.js').default) });
app.model({ namespace: 'device', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/device.js').default) });
app.model({ namespace: 'group', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/group.js').default) });
app.model({ namespace: 'home', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/home.js').default) });
app.model({ namespace: 'plan', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/plan.js').default) });
app.model({ namespace: 'run', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/run.js').default) });
app.model({ namespace: 'yield', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/iot/yield.js').default) });
app.model({ namespace: 'client', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/vendor/client.js').default) });
app.model({ namespace: 'product', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/vendor/product.js').default) });
app.model({ namespace: 'stage', ...(require('/Users/liuhaoyu/Desktop/dh-cloud/src/models/vendor/stage.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
