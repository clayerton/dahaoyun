import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

class Users extends PureComponent {
  state = {};

  componentDidMount() {
    // const { dispatch } = this.props;
  }

  render() {
    return (
      <PageHeaderWrapper
        title={formatMessage({ id: 'vendor.menu.factory.user' })}
      ></PageHeaderWrapper>
    );
  }
}

export default Users;
