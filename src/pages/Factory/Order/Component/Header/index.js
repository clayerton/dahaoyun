import React from 'react';
import styles from './index.less';
import { Cascader } from 'antd';
import Header from '@/components/DeviceHeader';
function OrderHeader(props) {
    console.log(props)
    const { department,  onChangeSelect, onHandleClick} = props;
    const onChange = value => {
        let format = value[value.length - 1];
        onChangeSelect && onChangeSelect(format);
    }
    const {
        onChangeSelect,
        
    }
    return (
        <div className={styles.header}>

        <div className={styles.left}>
          <Cascader
            options={department}
            onChange={onChange}
            placeholder={['全部车间']}
            changeOnSelect
          />
          <input />
        
        </div>
        <div className={styles.right}>
          <img src={require('@/assets/home/plan.png')} />
          <span>新 增</span>
        </div>
      </div>
    )
}
export default OrderHeader;