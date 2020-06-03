import React from 'react';
import styles from './box.less';
import { Progress, Carousel } from 'antd';
import { parseUnit } from '@/utils/constants';
import { calcProgress } from '@/utils/parse';

export default class Component extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  NestMap = ({ data }) => {
    const Item = this.Item;
    return (
      <Carousel autoplay dotPosition="right">
        {data.map((_, index) => {
          if (index % 6 === 0)
            return (
              <div className={styles.box4ListWindow} key={index + ''}>
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

  Item = ({ item }) => (
    <div className={styles.box4Item}>
      <div className={styles.box4ItemLeft}>
        <div className={styles.box4ItemLeftTextBlock}>{item.device}</div>
      </div>
      <div className={styles.box4ItemCenter}>
        <div className={styles.box4ItemCenterTop}>
          <Progress
            className={styles.bax4ItemProgress}
            strokeColor={{ from: '#0336ff', to: '#01b4ff' }}
            percent={calcProgress(item.valid, item.quantity)}
            showInfo={false}
            strokeWidth={25}
            status="active"
          />
        </div>
        <div className={styles.box4ItemCenterBottom}>
          <span className={styles.box4ItemCenterBottomText}>{item.name}</span>
          <span className={styles.box4ItemCenterBottomText} style={{ textAlign: 'right' }}>
            {item.product}
          </span>
        </div>
      </div>
      <div className={styles.box4ItemRight}>
        {`${item.valid}/${item.quantity}${parseUnit(item.unit)}`}
      </div>
    </div>
  );

  render() {
    const { data } = this.props;
    const NestMap = this.NestMap;
    return (
      <div className={styles.container} style={{ overflow: 'hidden' }} >
        <div className={styles.title} style={{ paddingBottom: '10px' }}>
          <span className={styles.titleLgColor}>当前工单情况</span>
        </div>
        <div className={styles.chart} style={{ overflow: 'hidden' }}>
          <NestMap data={data || []} />
        </div>
      </div>
    );
  }
}
