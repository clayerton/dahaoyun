import update from '@/assets/common/update.png';
import cxj from '@/assets/cxj.jpg';
import DeviceHeader from '@/components/DeviceHeader';
import NextPage from '@/components/NextPage';
import { isInteger } from '@/utils/isInteger';
import { timeToMillion } from '@/utils/timeToMillion';
import { Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
@connect(({ department, plan, loading }) => ({
  department: department.department,
  planList: plan.planList,
  nextPage: plan.planNext,
  loading: loading.effects['plan/fetchList'],
}))
class Plan extends PureComponent {
  state = {
    visible: false,
    size: 10,
    workshop: 0,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { size, workshop } = this.state;
    dispatch({
      type: 'department/fetchDepartment',
      payload: { type: 'workshop' },
    });
    dispatch({
      type: 'plan/fetchList',
      payload: {
        workshop,
        size,
      },
    });
  }
  onChange = workshop => {
    const { dispatch } = this.props;
    const { size } = this.state;
    this.setState({
      workshop,
    });
    dispatch({
      type: 'plan/fetchList',
      payload: {
        workshop,
        size,
      },
    });
  };
  onAddClick = () => {
    this.setState({
      visible: true,
    });
  };
  onClickMore = () => {
    const { dispatch, nextPage } = this.props;
    const { size, workshop } = this.state;
    dispatch({
      type: 'plan/fetchList',
      payload: {
        workshop,
        size,
        page: nextPage,
      },
    });
  };
  columns = [
    {
      title: '产品',
      dataIndex: 'product',
      align: 'center',
      width: '10%',
      render: (text, record) => {
        return (
          <div className={styles.product}>
            <div className={styles.img}>
              <img src={record.thumbnail || cxj} />
            </div>
            <span style={{ fontWeight: 'bold' }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: '进度',
      dataIndex: 'pro',
      align: 'center',
      width: '20%',
      render: (text, record) => {
        return (
          <div className={styles.progressAll}>
            <div className={styles.progress}>
              <div
                style={{
                  width: (record.valid / record.total) * 100 + '%',
                  backgroundColor: '#1f9a0b',
                }}
              />
            </div>
            <span>
              {isInteger(record.valid)}/{record.total}
              {record.unit}
            </span>
          </div>
        );
      },
    },
    {
      title: '预计用时',
      dataIndex: 'estimate',
      align: 'center',
      width: '10%',
      render: text => timeToMillion(text),
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      width: '10%',
      filters: [
        {
          text: '待生产',
          value: 'queue',
        },
        {
          text: '生产中',
          value: 'work',
        },
        {
          text: '已完成',
          value: 'complete',
        },
      ],
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      render: text => formatMessage({ id: text }),
    },

    {
      title: '车间',
      dataIndex: 'workshop',
      align: 'center',
      width: '10%',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      align: 'center',
      width: '10%',
      render: text => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '关联订单',
      dataIndex: 'orderName',
      align: 'center',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'action',
      align: 'center',
      width: '10%',
      render: record => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <img src={update} />
          <img src={update} />
          <img src={update} />
        </div>
      ),
    },
  ];
  render() {
    const { department, loading, nextPage, planList } = this.props;
    const headerParent = {
      department,
      onChangeSelect: this.onChange,
      onHandleClick: this.onAddClick,
    };
    const nextParent = {
      nextPage,
      onClickMore: this.onClickMore,
    };
    return (
      <Fragment>
        <DeviceHeader {...headerParent} />
        <Table
          loading={loading}
          className={styles.antdTable}
          columns={this.columns}
          dataSource={planList}
          pagination={false}
          rowKey="id"
        />
        <NextPage {...nextParent} />
      </Fragment>
    );
  }
}
export default Plan;
