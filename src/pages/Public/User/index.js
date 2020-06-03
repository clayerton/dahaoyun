import React, { PureComponent } from 'react';
import { Card } from 'antd';
import Link from 'umi/link';

import logo from '@/assets/logo-blue.png';
import styles from './index.less';

import { formatMessage } from 'umi-plugin-react/locale';

export default class User extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.contentTierUser}>
        <Link className={styles.link} to="/">
          <img className={styles.logo} src={require('@/assets/home/logo.png')} />
        </Link>
        {children}
      </div>
    );
  }
}
