import React from 'react';
import styles from './box.less';
import { Progress, Carousel } from 'antd';
import { parseUnit } from '@/utils/constants';
import { calcProgress } from '@/utils/parse';
import { formatMessage } from 'umi-plugin-react/locale';

export default class Component extends React.PureComponent {

  Item = ({ item }) => (
    <div className={styles.workBoxItem}>
      <div className={styles.workBoxItemLeft}>
        {item.name}
      </div>
      <div className={styles.workBoxItemCenter}>
        <Progress
          className={styles.workBoxItemProgress}
          strokeColor={'#999999'}
          percent={calcProgress(item.valid, item.quantity)}
          showInfo={false}
          strokeWidth={20}
          status="active"
          strokeLinecap='square'
        />
      </div>
      <div className={styles.workBoxItemRight}>
        {`${item.valid}/${item.quantity}${parseUnit(item.unit)}`}
      </div>
    </div>
  );

  NestMap = ({ data }) => {
    const Item = this.Item;
    return (
      <Carousel dotPosition="right" autoplay autoplaySpeed={4000}>
        {data.map((_, index) => {
          if (index % 6 === 0)
            return (
              <div className={styles.workBoxContentWindow} key={index + ''}>
                {data.map((obj2, index2) => {
                  if (Math.ceil((index + 1) / 6) === Math.ceil((index2 + 1) / 6))
                    return <Item item={obj2} key={index2 + ''} />;
                })}
              </div>
            );
        })}
      </Carousel>
    );
  };

  render() {
    const NestMap = this.NestMap;
    const { data } = this.props;

    return (
      <div className={styles.box}>
        <div className={styles.title}>
          {formatMessage({id: 'current.work.order.progress'})}
        </div>
        <div className={styles.workBoxContent}>
          <NestMap data={data || []} />
        </div>
      </div>
    )
  }
}