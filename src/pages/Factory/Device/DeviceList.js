import { Spin } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
import { DeviceCeil, Header } from './Item';

@connect(({ department, device, loading }) => ({
  department: department.department,
  devices: device.devices,
  loading: loading.effects['device/fetchDevice'],
}))
class Device extends PureComponent {
  state = {
    workshopId: 0,
    state: 'none',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/fetchDepartment',
      payload: { type: 'workshop' },
    });
    dispatch({
      type: 'device/fetchDevice',
      payload: {},
    });
  }
  onChangeSelect = id => {
    const { dispatch } = this.props;
    const { state, workshopId } = this.state;
    if (id === workshopId) return;
    this.setState({
      workshopId: id,
    });
    dispatch({
      type: 'device/fetchDevice',
      payload: { workshopId: id, state },
    });
  };
  onClickStatus = stateType => {
    const { dispatch } = this.props;
    const { workshopId, state } = this.state;
    let status = stateType === 'all' ? 'none' : stateType;
    if (status === state) return;
    this.setState({
      state: status,
    });
    dispatch({
      type: 'device/fetchDevice',
      payload: { workshopId, state: status },
    });
  };
  render() {
    const { department, devices, loading } = this.props;
    const headerParent = {
      department,
      devices,
      onChangeSelect: this.onChangeSelect,
      onClickStatus: this.onClickStatus,
    };
    return (
      <Fragment>
        <div className={styles.box}>
          <Header {...headerParent} />
          <div className={styles.device} loading={loading + ''}>
            {devices &&
              devices.items &&
              devices.items.map((v, i) => {
                return <DeviceCeil key={i} {...v} />;
              })}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Device;