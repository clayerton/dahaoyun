import MachineOfDesign from '@/components/MachineOfDesign';
import { Button, Modal, notification } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.less';

@connect(
  ({ device, group, loading }) => ({
    devices: device.devices,
    group,
    loading: loading.effects['device/fetchDevice'],
  }),
  dispatch => ({
    getDevices: (payload, callback) => dispatch({ type: 'device/fetchDevice', payload, callback }),
    addDeploy: (payload, callback) => dispatch({ type: 'design/addDeploy', payload, callback }),
    getGroup: (payload, callback) => dispatch({ type: 'group/fetchGroup', payload, callback }),
  })
)
export default class ModalDistribution extends Component {
  constructor(props) {
    super(props);
    this.machineModal = null;
    this.state = {
      page: 0,
      count: 10000,  //穿梭框分页bug
      workshop: null,
    };
  }

  _handleSubmit = () => {
    const { addDeploy, designId, _modalDistributionCancel } = this.props;
    const activeSn = this.machineModal._getDataSn();
    if (!activeSn || activeSn.length < 1) {
      notification.warn({ message: formatMessage({ id: 'please.select.device' }), duration: 1.5 });
      return;
    }
    addDeploy({
      add: { designId, sn: activeSn },
      fetch: { designId },
    },
      _modalDistributionCancel
    );
  };

  shouldComponentUpdate(props, nextState) {
    if ((!this.props.visible && props.visible) || this.state.page !== nextState.page) {
      const { getDevices, getGroup } = this.props;
      const { count } = this.state;
      getDevices({
        page: nextState.page,
        count: count,
        workshop: null, // 'null全部'，~为分类
      });
      getGroup({
        count: 100,
        type: 'workshop',
        workshop: null
      })
    }
    return true;
  }
  prev() {
    const { page } = this.state;
    page > 0 && this.setState(state => ({ page: state.page - 1 }));
  }

  next() {
    const { devices } = this.props;
    const { count, page } = this.state;
    let countPage = (devices && devices.total / count) || 0;
    page < countPage - 1 && this.setState(state => ({ page: state.page + 1 }));
  }

  render() {
    const { devices, visible, _modalDistributionCancel, group: { groupList } } = this.props;
    const { count } = this.state;
    let groupListAll = groupList && groupList.items || [];

    return (
      <Modal
        visible={visible}
        onCancel={_modalDistributionCancel}
        style={{ minWidth: '1000px' }}
        width={'90%'}
        footer={null}
      >
        <div className={styles.titles}>
          <div className={styles.titleL}>
            <span>{formatMessage({ id: 'check.the.device.to.be.assigned' })}</span>
            {/* <Button
              className={styles.buttonL}
              type="primary"
              onClick={() => {
                this.prev();
              }}
            >
              前{count}页
            </Button>
            <Button
              className={styles.buttonL}
              type="primary"
              onClick={() => {
                this.next();
              }}
            >
              后{count}页
            </Button> */}
          </div>
          <div className={styles.titleR}>{formatMessage({ id: 'checked.the.device' })}</div>
        </div>
        <MachineOfDesign groupList={groupListAll} devices={devices} ref={ref => (this.machineModal = ref)} />
        <div className={styles.btns}>
          <Button type="primary" onClick={this._handleSubmit}>
            {formatMessage({ id: 'sure' })}
          </Button>
          <span className={styles.btnGap} />
          <Button type="default" onClick={_modalDistributionCancel}>
            {formatMessage({ id: 'cancel' })}
          </Button>
        </div>
      </Modal>
    );
  }
}
