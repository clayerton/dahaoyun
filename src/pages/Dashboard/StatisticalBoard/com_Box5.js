import React from 'react';
import styles from './box.less';
import workImg from '../../../assets/dashboard/work.png';
import planImg from '../../../assets/dashboard/plan.png';
import orderImg from '../../../assets/dashboard/order.png';
import deviceImg from '../../../assets/dashboard/device.png';
import designImg from '../../../assets/dashboard/design.png';
import productImg from '../../../assets/dashboard/product.png';

export default class Component extends React.PureComponent {
  Item = ({ item, bGap }) => (
    <div className={`${styles.box5Item} ${bGap && styles.box5ItemGap}`}>
      <div className={styles.box5ItemImageBg}>
        <img src={item.image} className={styles.box5ItemImage} />
      </div>
      <div className={styles.box5ItemTextBlock}>
        <div className={styles.box5ItemLabel}>{item.label}</div>
        <div className={styles.box5ItemValue}>{item.value}</div>
      </div>
    </div>
  );

  render() {
    const Item = this.Item;
    const { data } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.box5Row}>
          <Item
            item={{ image: workImg, label: '工单', value: data && data.works && data.works.length }}
            bGap
          />
          <Item item={{ image: planImg, label: '计划', value: data && data.plans }} bGap />
          <Item item={{ image: orderImg, label: '订单', value: data && data.orders }} />
        </div>
        <div className={styles.box5Row}>
          <Item
            item={{
              image: deviceImg,
              label: '设备',
              value: data && data.device && data.device.total,
            }}
            bGap
          />
          <Item item={{ image: designImg, label: '花样', value: data && data.designs }} bGap />
          <Item item={{ image: productImg, label: '产品', value: data && data.products }} />
        </div>
      </div>
    );
  }
}
