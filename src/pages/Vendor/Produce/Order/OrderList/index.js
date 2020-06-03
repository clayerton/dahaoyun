import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Col, Divider, Input, Row, Modal, Button, Popover } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import NormalTable from '@/components/NormalTable';
import router from 'umi/router';
import ModifyOrder from './ModifyOrder';
import ModifyPlan from './ModifyPlan';

const { Search } = Input;

// import styles from './index.less';
@connect(({ vdrOrder, loading }) => ({
  vdrOrder,
  loading: loading.effects['vdrOrder/fetchList'],
}))
class Order extends PureComponent {
  state = {
    visible: false,
    current: undefined,
    type: null,
    page: 1,
    count: 10,
    modifyOrderVisible: false,
    modifyPlanVisible: false,
    orderCurrent: null,
    planCurrent: null,
    planId: null
  };

  installShow = (record) => {
    return (
      <div>
        <p>起始日期:{record && record.start}</p>
        <p>分期间隔:{record && record.interval ? `${record.interval}个月` : record.interval}</p>
        <p>分期期数:{record && record.totalIndex}</p>
        <p>每期还款:{record && record.amount ? `${record.amount}元` : record.amount}</p>
      </div>
    )
  }
  handleDelete = (item, index, records, e) => {
    let tip = index === 1 ? '订单' : '产品';
    Modal.confirm({
      title: `删除${tip}`,
      content: `确定删除该${tip}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteHandler(item, index, records),
    });
  };
  deleteHandler = (item, index, records) => {
    const {page, count} = this.state;
    const { dispatch } = this.props;
    if (index === 1) {
      dispatch({
        type: 'vdrOrder/delOrder',
        payload: {
          del: { id: item.id, },
          fetch: {
            page: page - 1,
            count,
          }
        },
      });
    } else {
      dispatch({
        type: 'vdrOrder/delOrderProduct',
        payload: {
          del: { id: item.id, },
          fetch: { id: records.id }
        },
      });
    }

  };

  orderScheduling = (item,record) => {
    Modal.confirm({
      title: `出库`,
      content: `确定产品出库吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.orderSchedulingHandler(item, record),
    });
  }

  orderSchedulingHandler = (item, record) => {
    const { dispatch } = this.props;
  
      dispatch({
        type: 'vdrOrder/orderScheduling',
        payload: {
          upd: { id: item.id, },
          fetch: { id: record.id }
        },
      });
  }

  columns = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'left',
    },
    {
      title: '订单号',
      dataIndex: 'no',
      align: 'left',
    },
    {
      title: '订单标题',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      align: 'left',
    },
    {
      title: '下单日期',
      dataIndex: 'order',
      align: 'left',
    },
    {
      title: '交货日期',
      dataIndex: 'deliver',
      align: 'left',
    },
    {
      title: '总数量',
      dataIndex: 'totalCount',
      align: 'right',
    },
    {
      title: '分期',
      dataIndex: 'paytypeValue',
      align: 'left',
      render: (text, record) => {
        return (
          <Popover content={this.installShow(record)}>
            {text === "installment" ? '是' : '否'}
          </Popover>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      render: record => (
        <Fragment>
          <a
            onClick={e => {
              e.stopPropagation();
              this.newSheet(record);
            }}
          >
            新增
          </a>
          <Divider type="vertical" />
          <a
            onClick={e => {
              e.stopPropagation();
              this.handleModalVisible(record, 1);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={e => {
              e.stopPropagation();
              this.handleDelete(record, 1);
            }}
            // style={{ color: '#888' }}
          >
            删除
          </a>
        </Fragment>
      ),
    },
  ];

  newSheet = (record) => {
    router.push({
      pathname: '/vendor/produce/order/addPlan',
      query: {
        id: record.id,
      }
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'vdrOrder/getOrderMenu',
      payload: {

      }
    })
  }
  //  新增订单
  addNewOrder() {
    router.push('/vendor/produce/order/newOrder')
  }
  //  搜索
  handleSearch = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'vdrOrder/getOrderMenu',
      payload: {
        key: v,
      }
    })
    this.setState({
      page: 1,
    })
  }

  onExpand = (expanded, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'vdrOrder/orderProduct',
      payload: {
        id: record.id,
      },
    });
  };

  _handleTableChangeForSchedule = () => { };

  handleStandardTableChange = (pagination, filtersArg, recordId) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    // const filters = parseFilters(filtersArg);

    const params = {
      orderId: recordId,
      page: pagination.current - 1,
      count: pagination.pageSize,
      ...formValues,
      // ...filters,
    };

    this.setState({
      page: pagination.current,
      count: pagination.pageSize,
    });
    // if (sorter.field) {
    //   params.sorter = `${sorter.field}_${sorter.order}`;
    // }

    dispatch({
      type: 'vdrOrder/getOrderMenu',
      payload: params,
    });
  };

  handleModalVisible = (record, index, records) => {
    if (index === 1) {
      let value = record && record.paytypeValue === "installment" ? 1 : 2;
      this.setState({
        modifyOrderVisible: true,
        orderCurrent: record,
        value
      })
    } else {
      this.setState({
        modifyPlanVisible: true,
        planCurrent: record,
        planId: records && records.id,
      })
    }
  }
  modifyOrderCancel = () => {
    this.setState({
      modifyOrderVisible: false,
    })
  }

  modifyOrderSubmit = (value) => {
    const { dispatch } = this.props;
    const { orderCurrent, page, count } = this.state;
    // let start = null;
    // if(value && value.instalment) {
    //   start = moment(value.instalment.start).format('YYYY-MM-DD') || null;
    //   value.instalment.start = start;
    // }
    dispatch({
      type: 'vdrOrder/updateOrder',
      payload: {
        upd: {
          id: orderCurrent.id,
          ...value
        },
        fetch: {
          page: page - 1 ,
          count,
        }
      },
      callback: () => {
        this.setState({
          modifyOrderVisible: false,
        })
      }
    })
  }

  modifyPlanCancel = () => {
    this.setState({
      modifyPlanVisible: false,
    })
  }

  modifyPlanSubmit = (value) => {
    const { dispatch } = this.props;
    const { planId, planCurrent } = this.state;
    dispatch({
      type: 'vdrOrder/updateOrderProduct',
      payload: {
        upd: { id: planCurrent.id, ...value },
        fetch: {
          id: planId,
        }
      },
      callback: ()=>{
        this.setState({
          modifyPlanVisible: false,
        })
      }
    })
  }

  render() {
    const { dataSource, visible, current, type, page, count, modifyOrderVisible, modifyPlanVisible, orderCurrent, planCurrent, value } = this.state;
    const { vdrOrder: { orderList, orderProductList }, loading } = this.props;
    const data = {
      list: orderList && orderList.items,
      pagination: {
        total: orderList && orderList.total,
        pageSize: count,
        current: page,
      },
    };
    const modifyParent = {
      visible: modifyOrderVisible,
      cancel: this.modifyOrderCancel,
      submit: this.modifyOrderSubmit,
      current: orderCurrent,
      value,
    }
    const modifyPlanParent = {
      visible: modifyPlanVisible,
      cancel: this.modifyPlanCancel,
      submit: this.modifyPlanSubmit,
      current: planCurrent,
    }
    const expandedRowRender = (records) => {
      let dataSource = {};
      if (orderProductList && orderProductList.filter(item => item.orderid === records.id).length > 0) {
        dataSource = orderProductList.filter(item => item.orderid === records.id)[0].value;
      }
      const scheduleData = {
        list: dataSource && dataSource.items || [],
        pagination: {
          position: 'none',
        },
      };
      const columns = [
        {
          title: '工艺单号',
          dataIndex: 'craftNm',
          align: 'left',
        },
        {
          title: '品名',
          dataIndex: 'name',
          align: 'left',
        },
        {
          title: '分组',
          dataIndex: 'typeName',
          align: 'left',
        },
        {
          title: '电控',
          dataIndex: 'electrCtrl',
          align: 'left',
        },
        {
          title: '数量',
          dataIndex: 'productQuantity',
          align: 'right',
        },
        {
          title: '单价（元）',
          dataIndex: 'price',
          align: 'right',
        },
        {
          title: '总价（元）',
          dataIndex: 'totalPrice',
          align: 'right',
        },
        {
          title: '备注',
          dataIndex: 'remark',
          align: 'left',
          // width: '15%',
        },
        {
          title: '操作',
          align: 'center',
          width: '20%',
          render: record => (
            <Fragment>
              <a
                onClick={e => {
                  e.stopPropagation();
                  this.orderScheduling(record, records);
                }}
                disabled={record.outStatus == 'out'}
              >
                {record.outStatus == 'noOut' ? '出库' : '已出库'}
              </a>
              <Divider type="vertical" />
              <a
                onClick={e => {
                  e.stopPropagation();
                  this.handleModalVisible(record, 2, records);
                }}
              >
                修改
              </a>
              <Divider type="vertical" />
              <a
                onClick={e => {
                  e.stopPropagation();
                  this.handleDelete(record, 2, records);
                }}
                // style={{ color: '#999' }}
              >
                删除
              </a>
            </Fragment>
          ),
        },
      ];
      return (
        <NormalTable
          loading={false}
          style={{ cursor: 'pointer' }}
          data={scheduleData}
          columns={columns}
          onChange={(pagination, filtersArg) =>
            this._handleTableChangeForSchedule(pagination, filtersArg, records.id)
          }
        />
      );
    }
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.produce.order' })}>
        <Card bordered={false}>
          <Row
            gutter={{ md: 8, lg: 24, xl: 48 }}
            style={{ marginBottom: 20 }}
            type="flex"
            justify="space-between"
          >
            <Col md={8} sm={24}>
              <Button onClick={() => this.addNewOrder()} type='primary'>新增订单</Button>
            </Col>
            <Col md={8} sm={24}>
              <Search
                enterButton="查询"
                placeholder="请输入订单号\订单标题\客户"
                onSearch={this.handleSearch}
                allowClear
              />
            </Col>
          </Row>
          <NormalTable
            loading={false}
            data={data}
            columns={this.columns}
            onChange={this.handleStandardTableChange}
            expandedRowRender={expandedRowRender}
            onExpand={this.onExpand}
            expandRowByClick
            rowClassName={true}
          />
        </Card>
        <ModifyOrder {...modifyParent} />
        <ModifyPlan {...modifyPlanParent} />
      </PageHeaderWrapper>
    );
  }
}

export default Order;
