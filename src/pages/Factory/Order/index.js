import search from '@/assets/common/search.png';
import Header from '@/components/DeviceHeader';
import { Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import NextPage from '@/components/NextPage';

@connect(({ department, order, loading }) => ({
  department: department.department,
  orderList: order.orderList,
  nextPage: order.orderNext,
  loading: loading.effects['order/fetchOrder'],
  orderProductList: order.orderProduct,
}))
export default class OrderList extends PureComponent {
  state = {
    query: '',
    size: 10,
    nextType: 0,
    group: null,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { size } = this.state;
    dispatch({
      type: 'department/fetchDepartment',
      payload: {
        type: 'workshop',
      },
    });
    dispatch({
      type: 'order/fetchOrder',
      payload: {
        size,
      },
    });
  }
  columns = [
    {
      title: '产品',
      dataIndex: 'name',
      align: 'center',
      width: '5%',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      align: 'center',
      // width: '5%',
    },
    {
      title: '交货日期',
      dataIndex: 'deadline',
      align: 'center',
      width: '10%',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '总价',
      dataIndex: 'total',
      align: 'center',
      width: '5%',
    },
    {
      title: '进度',
      dataIndex: 'deliver',
      align: 'center',
      width: '15%',
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      width: '10%',
      render: text => formatMessage({ id: text }),
    },
    {
      title: '订单号',
      dataIndex: 'id',
      align: 'center',
      width: '10%',
    },
    {
      title: '备注',
      dataIndex: 'note',
      align: 'center',
      width: '10%',
    },
  ];
  onChangeSelect = value => {
    const { dispatch } = this.props;
    const { query, size } = this.state;
    this.setState({
      nextType: 0,
      query: '',
      group: value,
    });
    dispatch({
      type: 'order/fetchOrder',
      payload: {
        key: query,
        group: value,
        size,
      },
    });
  };
  onHandleClick = () => {
    console.log('onHandleClick');
  };
  onExpand = (expanded, record) => {
    const { dispatch } = this.props;
    if (!expanded) return;
    dispatch({
      type: 'order/fetchOrderOne',
      payload: {
        id: record.id,
      },
    });
  };
  search = () => {
    const { dispatch } = this.props;
    const { query, size } = this.state;
    this.setState({
      nextType: 1,
    });
    dispatch({
      type: 'order/fetchOrderKey',
      payload: {
        key: query,
        size,
      },
    });
  };
  onClickMore = () => {
    const { nextPage, dispatch } = this.props;
    const { size, group, nextType, query } = this.state;
    dispatch({
      type: `order/${nextType === 0 ? 'fetchOrder' : 'fetchOrderKey'}`,
      payload: {
        size,
        page: nextPage,
        group,
        key: query,
      },
    });
  };
  render() {
    const { department, orderList, loading, orderProductList, nextPage } = this.props;
    const { query } = this.state;
    const headerParent = {
      department,
      onChangeSelect: this.onChangeSelect,
      onHandleClick: this.onHandleClick,
    };
    const nextParent = {
      nextPage,
      onClickMore: this.onClickMore,
    };
    const expandedRowRender = records => {
      let dataSource = {};
      if (
        orderProductList &&
        orderProductList.filter(item => item.orderid === records.id).length > 0
      ) {
        dataSource = orderProductList.filter(item => item.orderid === records.id)[0].value;
      }
      const columns = [
        {
          title: '订单名称',
          dataIndex: 'product',
          align: 'center',
          width: '15%',
        },
        {
          title: '单价',
          dataIndex: 'price',
          align: 'center',
          width: '10%',
        },
        {
          title: '分组',
          dataIndex: 'number',
          align: 'center',
          width: '10%',
        },
        {
          title: '电控',
          dataIndex: 'unit',
          align: 'center',
        },
      ];
      return (
        <Table
          loading={false}
          style={{ cursor: 'pointer', width: '100%' }}
          dataSource={(dataSource && dataSource.items) || []}
          columns={columns}
          pagination={false}
          rowKey="product"
        />
      );
    };

    return (
      <Fragment>
        <Header {...headerParent}>
          <div className={styles.search}>
            <input
              placeholder="请输入关键词搜索"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <img onClick={this.search} src={search} />
          </div>
        </Header>
        <Table
          loading={loading}
          className={styles.antdTable}
          columns={this.columns}
          dataSource={orderList}
          pagination={false}
          rowKey="id"
          onExpand={this.onExpand}
          expandRowByClick={true}
          expandedRowRender={expandedRowRender}
        />
        <NextPage {...nextParent} />
      </Fragment>
    );
  }
}
