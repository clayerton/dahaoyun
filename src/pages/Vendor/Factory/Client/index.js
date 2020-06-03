import NormalTable from '@/components/NormalTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Card, Divider, Modal, Tabs } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import AddOrUpdModal from './AddModalClient';
import styles from './index.less';
import { parseFilters } from '@/utils/parse';

const { TabPane } = Tabs;

@connect(({ vdrClient, loading }) => ({
  client: vdrClient.client,
  proxy: vdrClient.proxy,
  loading: loading.models.list,
}))
class Client extends PureComponent {
  state = {
    formParams: {
      count: 10,
      page: 0,
    },
    page: 0,
    count: 10,
    visible: false,
    current: undefined,
    selectTab: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formParams } = this.state;

    dispatch({
      type: 'vdrClient/getClientList',
      payload: {
        ...formParams,
        type: 0,
      },
    });
    dispatch({
      type: 'vdrClient/getClientList',
      payload: {
        ...formParams,
        type: 1,
      },
    });
  }

  onChange = value => {
    this.setState({
      selectTab: value - 1,
      current: undefined,
    });
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '收货地址',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: '开票抬头',
      dataIndex: 'invoiceName',
      align: 'center',
    },
    {
      title: '税号',
      dataIndex: 'licence',
      align: 'center',
    },
    {
      title: '单位地址',
      dataIndex: 'invoiceAddress',
      align: 'center',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '开户银行',
      dataIndex: 'bank',
      align: 'center',
    },
    {
      title: '银行账户',
      dataIndex: 'account',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: record => (
        <Fragment>
          <a
            onClick={e => {
              e.stopPropagation();
              this.handleModalVisible(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={e => {
              e.stopPropagation();
              this.handleDelete(record);
            }}
          >
            删除
          </a>
        </Fragment>
      ),
    },
  ];
  columnsProxy = [
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '代理地区',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: '开票抬头',
      dataIndex: 'invoiceName',
      align: 'center',
    },
    {
      title: '税号',
      dataIndex: 'licence',
      align: 'center',
    },
    {
      title: '单位地址',
      dataIndex: 'invoiceAddress',
      align: 'center',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '开户银行',
      dataIndex: 'bank',
      align: 'center',
    },
    {
      title: '银行账户',
      dataIndex: 'account',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: record => (
        <Fragment>
          <a
            onClick={e => {
              e.stopPropagation();
              this.handleModalVisible(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={e => {
              e.stopPropagation();
              this.handleDelete(record);
            }}
          >
            删除
          </a>
        </Fragment>
      ),
    },
  ];

  handleModalVisible = record => {
    this.setState({
      current: record,
      visible: true,
    });
  };

  handleDelete = (item, e) => {
    const { selectTab } = this.state;
    let tips = selectTab == 0 ? '客户' : '代理';
    Modal.confirm({
      title: `删除${tips}`,
      content: `确定删除该${tips}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteHandler(item),
    });
  };

  deleteHandler = item => {
    const { dispatch } = this.props;
    const { selectTab, page, count } = this.state;
    dispatch({
      type: 'vdrClient/delClient',
      payload: {
        id: item.id,
        fetch: { type: selectTab, page, count },
      },
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, handleStandardTableChangeProps } = this.props;
    const { count, page, selectTab } = this.state;

    const filters = parseFilters(filtersArg);

    const params = {
      page: pagination.current - 1,
      count: pagination.pageSize,
      ...filters,
    };
    this.setState({
      count: pagination.pageSize,
      page: pagination.current - 1,
    });
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'vdrClient/getClientList',
      payload: {
        ...params,
        type: selectTab,
      },
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      current: undefined,
    });
  };

  handleSubmit = value => {
    const { dispatch } = this.props;
    const { current, page, count, selectTab } = this.state;
    if (current !== undefined) {
      dispatch({
        type: 'vdrClient/upClient',
        payload: {
          up: { ...current, ...value, type: selectTab },
          fetch: { page, count, type: selectTab },
        },
        callback: () => {
          this.setState({
            visible: false,
            current: undefined,
          });
        },
      });
    } else {
      dispatch({
        type: 'vdrClient/addClient',
        payload: {
          add: { ...value, type: selectTab },
          fetch: { page, count, type: selectTab },
        },
        callback: () => {
          this.setState({
            visible: false,
            current: undefined,
          });
        },
      });
    }
  };

  addModel = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  render() {
    const { visible, current, page, count, selectTab } = this.state;
    const { client, proxy, loading } = this.props;
    let clientList = selectTab == 0 ? client || [] : proxy || [];
    const parentMethods = {
      visible,
      current,
      client,
      proxy,
      selectTab,
      handleCancel: this.handleCancel,
      handleSubmit: this.handleSubmit,
    };
    const tableData = {
      list: (clientList && clientList.items) || [],
      pagination: {
        total: clientList ? clientList.total : undefined,
        pageSize: count,
        current: page + 1,
      },
    };
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.factory.client' })}>
        <Card bordered={false}>
          <Tabs animated={false} defaultActiveKey="1" onChange={this.onChange}>
            <TabPane tab="客户" key="1">
              <div className={styles.tableListOperator}>
                <Button type="primary" onClick={this.addModel}>
                  新增客户
                </Button>
              </div>
              <NormalTable
                loading={loading}
                data={tableData}
                columns={this.columns}
                onChange={this.handleStandardTableChange}
                // bordered
                rowkey="id"
              />
            </TabPane>
            <TabPane tab="代理" key="2">
              <div className={styles.tableListOperator}>
                <Button type="primary" onClick={this.addModel}>
                  新增代理
                </Button>
              </div>
              <NormalTable
                loading={false}
                loading={loading}
                data={tableData}
                columns={this.columnsProxy}
                onChange={this.handleStandardTableChange}
                // bordered
                rowkey="id"
              />
            </TabPane>
          </Tabs>
        </Card>
        <AddOrUpdModal {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}

export default Client;
