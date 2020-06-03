import React from 'react';
import styles from '../style.less';
import Header from './Header';
import { Table, Tag } from 'antd';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';

const Order = props => {
  const items = props && props.items;
  return (
    <div className={styles.order}>
      <Header title={'订单状态'} />
      <div className={styles.orderItem}>
        <ul className={styles.thead}>
          <li>
            <span className={styles.line}>订单名称</span>
            <span>计划</span>
            <span>完成</span>
            <span>订单进度</span>
            <span>金额</span>
            <span>状态</span>
            <span className={styles.user_line}>购买用户</span>
            <span>日期</span>
          </li>
          {items &&
            items.map((v, i) => {
              return (
                <li key={v.id}>
                  <span className={styles.orderName}>
                    <img src={require('@/assets/home/user_icon.png')} />
                    <span>{v.name}</span>
                  </span>
                  <span>200</span>
                  <span>200</span>
                  <span>
                    <div className={styles.progress}>
                      <div className={styles.process}></div>
                    </div>
                    <span className={styles.processItem}>80%</span>
                  </span>
                  <span>¥{v.total}</span>
                  <span className={styles.paySuccess}>
                    <span>{formatMessage({ id: v.state })}</span>
                  </span>
                  <span className={styles.user}>
                    <img src={require('@/assets/home/user_icon.png')} />
                    <span>{v.customer}</span>
                  </span>
                  <span className={styles.dateTime}>{moment(v.created).format('YYYY-MM-DD')}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default Order;
