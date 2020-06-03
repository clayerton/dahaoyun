import {deviceT} from '@/utils/statusType';
import { Cascader } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.less';
import DeviceHeader from '@/components/DeviceHeader';
class Header extends PureComponent {
  state = {
    select: 'all',
  };
  onChange = value => {
    const { onChangeSelect } = this.props;
    onChangeSelect && onChangeSelect(value);
  };
  onAddClick = () => {
    console.log('onAddClick')
  }
  _onClickStatus = value => {
    const { onClickStatus } = this.props;
    this.setState({
      select: value,
    });
    onClickStatus && onClickStatus(value);
  };
  render() {
    const { department, devices } = this.props;
    const { select } = this.state;
    const parentData = {
      department,
      onChangeSelect: this.onChange,
      onHandleClick: this.onAddClick
    }
    return (
      <DeviceHeader {...parentData} >
        <div className={styles.status}>
          {deviceT.map((v, i) => {
            return (
              <div
                className={styles.deviceStatus}
                onClick={this._onClickStatus.bind(this, v.type)}
                style={{
                  background: v.type === select && v.color,
                  borderColor: v.color,
                }}
                key={i}
              >
                <span
                  className={styles.block}
                  style={{ background: (v.type === select && '#fff') || v.color }}
                ></span>
                <span style={{ color: (v.type === select && '#fff') || v.color }}>
                  {v.name}：{(devices && devices[v.clump])}
                </span>
              </div>
            );
          })}
        </div>
      </DeviceHeader>
    );
  }
}
export default Header;