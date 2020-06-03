import NextPage from '@/components/NextPage';
import { Table } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import router from 'umi/router';
import styles from './index.less';
import moment from 'moment';
@connect(({ loading, deploy }) => ({
  design: deploy.design && deploy.design.items,
  nextPage: deploy.design && deploy.design.next,
  loading: loading.effects['deploy/fetchDeploy'],
}))
export default class WorkList extends PureComponent {
  state = {
    design: null,
    size: 10,
    devices: [],
  };
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { size } = this.state;
    const design = location && location.state && location.state.name;
    this.setState({
      design,
    });
    dispatch({
      type: 'deploy/fetchDeploy',
      payload: {
        design,
        page: null,
        size,
      },
    });
  }
  onClickMore = () => {
    const { nextPage, dispatch } = this.props;
    const { design, size } = this.state;
    dispatch({
      type: 'deploy/fetchDeploy',
      payload: {
        design,
        size,
        page: nextPage,
      },
    });
  };
  onHandleDel = () => {
    const { nextPage, dispatch } = this.props;
    const { design, size, devices } = this.state;
    if (devices.length === 0) return;
    dispatch({
      type: 'deploy/delDeployByDesign',
      del: {
        design,
        devices,
      },
      fet: {
        design,
        size,
      },
      callback: () => {
        console.log(2121212);
        this.setState({
          devices: [],
        });
      },
    });
  };
  onHandleBack = () => {
    router.goBack();
  };
  columns = [
    {
      title: '设备编号',
      dataIndex: 'device',
      align: 'center',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      align: 'center',
    },
    {
      title: '车间',
      dataIndex: 'workshop',
      align: 'center',
    },
    {
      title: '排样时间',
      dataIndex: 'created',
      align: 'center',
    },
  ];
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    // const { onSelectRow } = this.props;
    // if (onSelectRow) {
    //   onSelectRow(selectedRows);
    // }

    this.setState({ devices: selectedRowKeys });
  };
  render() {
    const { design, nextPage, loading } = this.props;
    const nextParent = {
      nextPage,
      onClickMore: this.onClickMore,
    };
    const rowSelection = {
      type: 'checkbox',
      onChange: this.handleRowSelectChange,
      // getCheckboxProps: record => ({
      //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //     name: record.name,
      // }),
    };
    return (
      <div>
        <header className={styles.deployHeader}>
          <span className={styles.deployTitle}>排样列表</span>
          <div>
            <span>新增</span>
            <span onClick={this.onHandleDel}>删除</span>
            <span onClick={this.onHandleBack}>返回</span>
          </div>
        </header>

        <Table
          loading={loading}
          rowSelection={rowSelection}
          className={styles.antdTable}
          columns={this.columns}
          dataSource={design}
          pagination={false}
          rowKey="device"
        />
        <NextPage {...nextParent} />
      </div>
    );
  }
}
