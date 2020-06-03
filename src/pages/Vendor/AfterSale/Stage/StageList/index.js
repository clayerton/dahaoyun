import NormalTable from '@/components/NormalTable';
// import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Col, Divider, Input, Row, Modal, Button, Badge, Popover } from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import UpdateStageModal from '../StageModifyModal/updateStageModal';
import ModifyStageSN from '../StageModifyModal/ModifyStageSN'
import { connect } from 'dva';
import { parseFilters } from '@/utils/parse';

const stageListStatus1 = {
  unbound: '未绑定',
  partbound: '部分绑定',
  bound: '完成绑定',
}
const stageListStatus = [
  { text: '未绑定', value: 'unbound', state: 'default' },
  { text: '部分绑定', value: 'partbound', state: 'processing' },
  { text: '完成绑定', value: 'bound', state: 'success' }
]

const stageState = [
  { text: '是', value: 'installment' },
  { text: '否', value: 'full' }
]

const { Search } = Input;
@connect(({ stage, loading }) => ({
  stage,
  loading: loading.effects['stage/getStageList'],
}))
class Stage extends React.Component {
  state = {
    visible: false,
    snVisible: false,
    current: undefined,
    currentPage: undefined,
    currentSN: undefined,
    type: null,
    page: 0,
    count: 10,
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
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'stage/getStageList',
      payload: {

      }
    })
  }

  columns = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'left',
    },
    {
      title: '出库单',
      dataIndex: 'outNo',
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
      title: '客户',
      dataIndex: 'customerName',
      align: 'left',
      // render: record => {
      //     return record ? moment(record).format('YYYY-MM-DD') : null;
      // },
    },
    // {
    //   title: '下单日期',
    //   dataIndex: 'order',
    //   align: 'center',
    // },
    {
      title: '交货日期',
      dataIndex: 'deliver',
      align: 'left',
    },
    {
      title: '总数',
      dataIndex: 'totalCount',
      align: 'right',
    },
    {
      title: '分期',
      dataIndex: 'paytypeValue',
      align: 'left',
      filterMultiple: false,
      filters: stageState,
      onFilter: (value, record) => {
        return record.paytypeValue.indexOf(value) === 0
      },
      render: (text, record) => {
        return <Popover content={this.installShow(record)}>
          {text === 'installment' ? '是' : '否'}
        </Popover>
        // return stageState.filter(item => item.value === text)[0].text
      }
    },
    {
      title: '解密剩余天数',
      dataIndex: 'lastDays',
      align: 'left',
    },
    {
      title: '绑定状态',
      dataIndex: 'bindStatus',
      align: 'left',
      filterMultiple: false,
      filters: stageListStatus,
      render: (val, data) => {
        // return stageListStatus[text];
        return <Popover content={stageListStatus.filter(item => item.value === val)[0].text}>
          <Badge
            status={stageListStatus.filter(item => item.value === val)[0].state}
            text={`${data.bindCount}/${data.totalCount}`}
          />
        </Popover>
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
            {/* 导出密码 */}
            查看详情
          </a>
          <Divider type="vertical" />
          {/* <a
            onClick={e => {
              e.stopPropagation();
              this.handleModalVisible(record, 1);
            }}
          >
            修改
          </a>
          <Divider type="vertical" /> */}
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
  // 需求改动——>查看详情
  newSheet = (record) => {
    router.push({
      pathname: '/vendor/afterSale/stage/orderList',
      query: { id: record.id, outNo: record.outNo },
    })
    // Modal.confirm({
    //   title: `导出密码`,
    //   content: `确定导出该密码吗？`,
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk: () => this.reportSheet(record),
    // });
  };

  // 导出密码表
  reportSheet = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'stage/exportPassword',
      payload: {
        id: record.id,
        filename: `${record.outNo}密码表.xlsx`,
      }
    })
  }

  // 删除分期管理 
  deleteHandler = (record, index, records) => {
    const { dispatch } = this.props;
    const { page, count } = this.state;
    if (index === 1) {
      dispatch({
        type: 'stage/delStageList',
        payload: {
          del: {
            id: record.id
          },
          fet: {
            page,
            count
          }
        }
      })
    } else {
      dispatch({
        type: 'stage/delOutProduct',
        payload: {
          del: { id: record.id },
          fetch: { id: records.id, },
          fet: { page, count }
        }
      })
    }

  }

  // 修改分期管理子类
  modalCraftEdit = (record) => {

  }

  handleDelete = (item, index, records, e) => {
    let tip = index === 1 ? '出库单' : '出库单产品';
    Modal.confirm({
      title: `删除${tip}`,
      content: `确定删除该${tip}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteHandler(item, index, records),
    });
  };

  handleModalVisible = (record, type, records) => {
    this.setState({
      visible: true,
      current: record,
      currentPage: records && records.id,
      type,
    })
  }

  handleModalSN = (record, records) => {
    this.setState({
      snVisible: true,
      currentSN: record,
      currentPage: records && records.id,
    })
  }

  handleSearch = (key) => {
    const { dispatch } = this.props;
    this.setState({
      page: 0,
    })
    dispatch({
      type: 'stage/getStageList',
      payload: {
        key,
      }
    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, handleStandardTableChangeProps } = this.props;
    const { count, page } = this.state;

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
      type: 'stage/getStageList',
      payload: {
        ...params,
      }
    })
  };

  onExpand = (expanded, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'stage/getOutProduct',
      payload: {
        id: record.id
      }
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancelSN = () => {
    this.setState({
      snVisible: false,
    })
  }

  handleSubmit = (value) => {
    const { current, currentPage, page, count, } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'stage/updateOutProduct',
      payload: {
        upd: {
          id: current && current.id,
          ...value,
        },
        fetch: {
          id: currentPage,
        },
        fet: {
          page,
          count,
        }
      },
      callback: () => {
        this.setState({
          visible: false,
        })
      }
    })
  }

  handleSubmitSN = (value) => {
    const { currentSN, currentPage, page, count } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'stage/deviceBind',
      payload: {
        add: {
          outProductId: currentSN && currentSN.id,
          captcha: '',
          ...value,
        },
        fetch: {
          id: currentPage,

        },
        fet: {
          page,
          count,
        }
      },
      callback: () => {
        this.setState({
          snVisible: false,
        })
      }
    })
  }

  addNewOrder() {
    router.push({
      pathname: '/vendor/afterSale/newOrder'
    })
  }

  render() {
    const { visible, snVisible, current, currentSN, type, page, count } = this.state;
    const { stage: { stageList, outProduct } } = this.props;
    const data = {
      list: stageList && stageList.items || [],
      pagination: {
        total: stageList && stageList.total,
        pageSize: count,
        current: page + 1,
      },
    };
    const stageModal = {
      visible,
      current,
      handleCancel: this.handleCancel,
      handleSubmit: this.handleSubmit,
      type,
    }
    const stageModalSN = {
      visible: snVisible,
      current: currentSN,
      handleCancel: this.handleCancelSN,
      handleSubmit: this.handleSubmitSN,
    }
    const expandedRowRender = (records) => {
      let dataSource = {};
      if (outProduct.filter(item => item.orderid === records.id).length > 0) {
        dataSource = outProduct.filter(item => item.orderid === records.id)[0].value;
      }
      const scheduleData = {
        list: dataSource && dataSource.items || [],
        pagination: {
          position: 'none',
        },
      };
      const columns = [
        
        {
          title: '工艺单',
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
          title: '绑定状态',
          dataIndex: 'bindStatus',
          align: 'left',
          filterMultiple: false,
          filters: stageListStatus,
          render: (val, data) => {
            return <Popover content={stageListStatus.filter(item => item.value === val)[0].text}>
              <Badge
                status={stageListStatus.filter(item => item.value === val)[0].state}
                text={`${data.bindCount}/${data.productQuantity}`}
              />
            </Popover>
          }
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
          // width: '20%',
          render: record => (
            <Fragment>
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
              <Divider type="vertical" />
              <a
                onClick={e => {
                  e.stopPropagation();
                  this.handleModalSN(record, records);
                }}
              // style={{ color: '#999' }}
              >
                设备绑定(测试)
              </a>
            </Fragment>
          ),
        },
      ];
      return (
        <NormalTable
          loading={false}
          data={scheduleData}
          columns={columns}
          onChange={this.handleStandardTableChange}
          rowClassName={true}
          onRow={(record) => ({
            onClick: () => {
              // this._workList(record);
              router.push({
                pathname: '/vendor/afterSale/stage/machineList',
                query: {
                  id: record.id,
                }
              })
            },
          })}
        />
      );
    };
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.after-sale.stage' })}>
        <Card bordered={false}>
          <Row
            gutter={{ md: 8, lg: 24, xl: 48 }}
            style={{ marginBottom: 20 }}
            type="flex"
            justify="space-between"
          >
            <Col md={8} sm={24}>
              <Button onClick={() => this.addNewOrder()} type='primary'>新增出库单</Button>
            </Col>
            <Col md={8} sm={24}>
              <Search
                enterButton="查询"
                placeholder="请输入订单号\客户名称"
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
            rowClassName={true}
            expandRowByClick
          // onRow={record => {
          //   return {
          //     onClick: (event) => {
          //       event.stopPropagation();
          //       router.push({
          //         pathname: '/vendor/afterSale/stage/orderList',
          //         query: { id: record.id },
          //       }
          //       )
          //     }, // 点击行
          //   };
          // }}
          />
        </Card>
        <UpdateStageModal {...stageModal} />
        <ModifyStageSN {...stageModalSN} />
      </PageHeaderWrapper>
    );
  }
}

export default Stage;
