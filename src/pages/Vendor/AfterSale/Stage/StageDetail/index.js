import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal, Popover } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import NormalTable from '@/components/NormalTable';
import router from 'umi/router';
import StageDetailModal from '../StageDetailModal';
const stageStatus = {
  'undecrypted': '未解密',
  'partdecrypted': '部分解密',
  'alldecrypted': '全部解密',
}
const decryptStatus = {
  'unauthorized': '未授权',
  'partauthorized': '部分授权',
  'allauthorized': '全部授权',
}

@connect(({ stage, loading }) => ({
  stage,
  loading: loading.effects['order/fetchList'],
}))
class StageList extends PureComponent {
  componentDidMount() {
    const { dispatch, location } = this.props;
    let id = location && location.query && location.query.id
    dispatch({
      type: 'stage/getInstallmentList',
      payload: {
        id,
      }
    })
  }

  state = {
    visible: false,
    page: 0,
    count: 10,
    pageModal: 0,
    countModal: 10,
    current: null,
    currentSelect: null, //选中的modal的ID
  }

  authStatus = (data) => {
    switch(data) {
      case 0: return '未授权';
      case 1: return '全部授权';
      default: return '部分授权';
    }
  }



  closeReturn = () => {
    router.goBack();
  }
  reportPassword = () => {
    Modal.confirm({
      title: `导出密码`,
      content: `确定导出该密码吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.reportSheet(),
    });
  }

  reportSheet = () => {
    const { dispatch, location } = this.props;
    let id = location && location.query && location.query.id;
    let outNo = location && location.query && location.query.outNo || ''
    dispatch({
      type: 'stage/exportPassword',
      payload: {
        id,
        filename: `${outNo}密码表.xlsx`,
      }
    })
  }

  handleModalVisible = (items) => {
    const { dispatch, location } = this.props;
    const { pageModal, countModal } = this.state;
    let id = location && location.query && location.query.id;
    dispatch({
      type: 'stage/getInstallmentDeviceList',
      payload: {
        id,
        index: items.index,
        page: 0,
        count: countModal,
      }
    })
    this.setState({
      visible: true,
      currentSelect: items.index,
      pageModal: 0,
    })
  }
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, location } = this.props;
    let id = location && location.query && location.query.id
    const { count, page } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

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
      type: 'stage/getInstallmentList',
      payload: {
        id,
        ...params,
      }
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  
  handleStandardTableChangeProps = (value) => {
    const { dispatch, location } = this.props;
    const { encryptId, pageModal, countModal, currentSelect } = this.state;
    let id = location && location.query && location.query.id

    this.setState({
      pageModal: value.page,
      countModal: value.count,
    })
    dispatch({
      type: 'stage/getInstallmentDeviceList',
      payload: {
        id,
        index: currentSelect,
        ...value,
      }
    })
  }

  render() {
    const { visible, page, count, pageModal, countModal } = this.state;
    const { stage: { installmentList, installmentDeviceList } } = this.props;
    let listTotal = installmentList && installmentList.total;
    const data = {
      list: installmentList && installmentList.items || [],
      pagination: {
        total: installmentList && installmentList.total,
        pageSize: count,
        current: page + 1,
      },
    };
    const detailModal = {
      visible,
      handleCancel: this.handleCancel,
      installmentDeviceList,
      handleStandardTableChange: this.handleStandardTableChangeProps,
      pageModal,
      countModal
    }
    const columns = [
      {
        title: '期数',
        dataIndex: 'index',
        align: 'center',
      },
      {
        title: '到期日期',
        dataIndex: 'due',
        align: 'center',
      },
      {
        title: '授权状态',
        dateIndex: 'authCount',
        align: 'center',
        render: (text,date) => {
          return <Popover content={decryptStatus[text.authStatus]}>
            {`${text.authCount}/${text.deviceCount}`}
          </Popover>
        }
      },
      {
        title: '解密状态',
        dateIndex: 'decryptCount',
        align: 'center',
        render: (text,date) => {
          return <Popover content={stageStatus[text.decryptStatus]}>
            {`${text.decryptCount}/${text.deviceCount}`}
          </Popover>
        }
      },
      // {
      //   title: '状态',
      //   dataIndex: 'decryptStatus',
      //   align: 'center',
      //   render: (text) => {
      //     return stageStatus[text]
      //   }
      // },
      {
        title: '操作',
        align: 'center',
        render: (items) => (
          <Fragment>
  
            <a
              onClick={e => {
                e.stopPropagation();
                this.handleModalVisible(items);
              }}
            >
              查看密码详情
            </a>
  
          </Fragment>
        ),
      },
    ]



    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.after-sale.stage.orderList' })}>
        <Card bordered={false}>
          <div className={styles.box}>
            <div className={styles.left}>
              <span className={styles.letter}><b>出库单： </b>{installmentList && installmentList.outNo}</span>
              <span className={styles.letter}><b>订单号： </b>{installmentList && installmentList.no}</span>
              <span className={styles.letter}><b>订单标题： </b>{installmentList && installmentList.name}</span>
              <span><b>客户名称： </b>{installmentList && installmentList.customerName}</span>
            </div>
            <Button className={styles.right} type={'primary'} onClick={this.reportPassword}>导出密码</Button>
          </div>
          <NormalTable
            loading={false}
            data={data}
            columns={columns}
            onChange={this.handleStandardTableChange}
            rowkey="index"

          />
          <div style={{ display: 'flex', marginTop: 20, }}>
            <Button type="primary" className={styles.reBack} onClick={this.closeReturn}>
              返回
          </Button>
          </div>

        </Card>
        <StageDetailModal {...detailModal} />
      </PageHeaderWrapper>
    );
  }
}

export default StageList;
