import React from 'react';
import styles from './box.less';
import { formatMessage } from 'umi-plugin-react/locale';

export default class Component extends React.PureComponent {
  render() {

    const { label, quantity, percentage } = this.props;

    return (
      <div className={styles.deviceBox}>
        <div className={styles.deviceBoxContent}>
          <div className={styles.deviceBoxContentTop}>{label}</div>
          <div className={styles.deviceBoxContentCenter}>{quantity}</div>
          <div className={styles.deviceBoxContentBottom}>{formatMessage({id: 'total.share.ratio'})}<span className={styles.red}>{`${percentage}%`}</span></div>
        </div>
      </div>
    )
  }
}