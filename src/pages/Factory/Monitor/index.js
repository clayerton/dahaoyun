import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { Device, Notice, Order, Plan, Statistics } from './Item';
import styles from './style.less';
const assembly = [
  {
    title: 'statistic',
    img: require('@/assets/home/statistic.png'),
    name: '今日产量',
  },
  {
    title: 'order',
    img: require('@/assets/home/order.png'),
    name: '未完成订单',
  },
  {
    title: 'plan',
    img: require('@/assets/home/plan.png'),
    name: '未完成计划',
  },
  {
    title: 'device',
    img: require('@/assets/home/device.png'),
    name: '在线设备',
  }
];
@connect(({ overview, loading }) => ({
  overview: overview.homeList,
  loading: loading.effects['overview/fetchHome'],
}))
class Monitor extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'overview/fetchHome',
      payload: {
        yieldCount: 1,
        planCount: 5,
        noticeCount: 5,
        orderCount: 5
      },
    });
  }

  render() {
    const { overview } = this.props;
    const { order, notice, plan, device } = overview || [];
    let  count = 0;
    if (overview && overview.yield && overview.yield.items && overview.yield.items[0]) {
      let end_date = moment(), date = overview.yield.items[0].date;
      let timeDiff = end_date.diff(date, 'days')
      if (timeDiff !== 0) count = 0;
      else count = Number((overview.yield.items[0].count).toFixed(2));
    }
    const data = {
      statistic: count,
      order: order && order.active,
      plan: plan && plan.active,
      device: device && device.runs,
    }
    return (
      <div className={styles.main}>
        <div className={styles.headerTop}>
          {
            assembly.map((v, i) => {
              return <Statistics {...v} count={data[v.title]} key={i} />
            })
          }
        </div>
        <div className={styles.headerContent}>
          <Order {...order} />
          {/* <Notice {...notice} /> */}
        </div>
        <div className={styles.headerBottom}>
          <Plan {...plan} />
          <Device {...device} />
        </div>
      </div>
    );
  }
}
export default Monitor;
