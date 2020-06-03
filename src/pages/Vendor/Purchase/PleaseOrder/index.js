import React, { PureComponent } from 'react';
// import { connect } from 'dva';
import {} from 'antd';
// import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
// import styles from './index.less';

class PleaseOrder extends PureComponent {
  state = {};

  componentDidMount() {
    // const { dispatch } = this.props;
  }

  render() {
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.purchase.order' })}>
        <div>22</div>
      </PageHeaderWrapper>
    );
  }
}

export default PleaseOrder;
