import React, { PureComponent } from 'react';
import {} from 'antd';
// import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
// import styles from './index.less';

class SignOrder extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.purchase.order' })}>
        <div>111</div>
      </PageHeaderWrapper>
    );
  }
}

export default SignOrder;
