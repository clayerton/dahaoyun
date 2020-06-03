import React from 'react';
import styles from './box.less';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';

export default class Component extends React.PureComponent {
  Item = ({ item }) => (
    <div className={styles.box3Item}>
      <div className={styles.box3ItemLeft}><div className={styles.box3ItemLeftText}>{item.name}</div></div>
      <div className={styles.box3ItemCenter}>
        {formatMessage({ id: `error-code-${item.reason}` }).includes('error-code-')
          ? item.reason
          : formatMessage({ id: `error-code-${item.reason}` })}
      </div>
      <div className={styles.box3ItemRight}>
        {item.time && moment(item.time).format('HH:mm:SS')}
      </div>
    </div>
  );

  render() {
    const Item = this.Item;
    const { data } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.title} style={{ paddingBottom: '10px' }}>
          <span className={styles.titleLgColor}>最近故障信息</span>
        </div>
        <div className={styles.chart} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          {data && data.map((obj, index) => <Item item={obj} key={index + ''} />)}
        </div>
      </div>
    );
  }
}
