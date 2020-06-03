import React, { PureComponent } from 'react';
// import { connect } from 'dva';
import { Tabs, Card, Badge, Button } from 'antd';
// import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import WarrantyPage from './Processed';
import AddWarrantyModal from './AddWarranty/AddWarrantyModal';
import styles from './index.less';
const { TabPane } = Tabs;

class Warranty extends PureComponent {
  state = {
    visible: false,
  }

  componentDidMount() { }

  onChange = () => {

  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleSubmit = () => {
    this.setState({
      visible: false,
    });
  };

  addWorkOrder = () => {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { visible } = this.state;
   
    const addModal = {
      visible: visible,
      handleCancel: this.handleCancel,
      handleSubmit: this.handleSubmit,
    }
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.after-sale.warranty-list' })}>
        <Card bordered={false}>
          <Button onClick={this.addWorkOrder} className={styles.button} type={'primary'}>新建工单</Button>
          <Tabs hideAdd={true} animated={false} defaultActiveKey="1" onChange={this.onChange}>
            <TabPane tab={<div className={styles.tabStyle}>待处理</div>} key="1">
              <WarrantyPage />
            </TabPane>
            <TabPane tab={<div className={styles.tabStyle}>已处理</div>} key="2">
              2
            </TabPane>
            <TabPane tab={<div className={styles.tabStyle}>归档</div>} key="3">
              3
            </TabPane>
            <TabPane tab={<div className={styles.tabStyle}>关闭</div>} key="4">
            </TabPane>
          </Tabs>
        </Card>
        <AddWarrantyModal {...addModal} />
      </PageHeaderWrapper>
    );
  }
}

export default Warranty;
