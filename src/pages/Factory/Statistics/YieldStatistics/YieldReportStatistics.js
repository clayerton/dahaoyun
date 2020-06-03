import NormalTable from '@/components/NormalTable';
import TimeSearch from '@/components/TimeSearch';
import { isInteger } from '@/utils/isInteger';
import { timeToMillion } from '@/utils/timeToMillion';
import { Tabs } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { unitMap } from '@/utils/parameter';

const { TabPane } = Tabs;

@connect(({ device, loading }) => ({
  device,
  loading: loading.models.fetchList,
}))
class YieldReportStatistics extends PureComponent {
  state = {
    pageSize: 10,
    pageNum: 0,
    formValues: {},
    defaultStartDate: moment(
      moment(new Date())
        .add(0, 'days')
        .format('YYYY-MM-DD 00:00')
    )
      .utc()
      .format(),
    defaultEndDate: moment(
      moment(new Date())
        .add(0, 'days')
        .format('YYYY-MM-DD 23:59')
    )
      .utc()
      .format(),
  };

  columns = [
    {
      title: formatMessage({ id: 'device.time' }),
      dataIndex: 'time',
      align: 'center',
      render: text => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: formatMessage({ id: 'upload.time' }),
      dataIndex: 'upload',
      align: 'center',
      render: text => {
        return text && moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: formatMessage({ id: 'device' }),
      dataIndex: 'device',
      align: 'center',
    },
    {
      title: formatMessage({ id: 'workshop' }),
      dataIndex: 'workshop',
      align: 'center',
      render: text => {
        return text || formatMessage({ id: 'unallocated' });
      },
    },
    {
      title: formatMessage({ id: 'product.name' }),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: formatMessage({ id: 'design.name1' }),
      dataIndex: 'design',
      align: 'center',
    },
    {
      title: formatMessage({ id: 'valid' }),
      dataIndex: 'valid',
      align: 'center',
      render: (text, report) => {
        return `${isInteger(text, true)} ${unitMap[report.unit]}`;
      },
    },
    {
      title: formatMessage({ id: 'flawed' }),
      dataIndex: 'flawed',
      align: 'center',
      render: (text, report) => {
        return `${isInteger(text, true)} ${unitMap[report.unit]}`;
      },
    },
    {
      title: formatMessage({ id: 'invalid' }),
      dataIndex: 'invalid',
      align: 'center',
      render: (text, report) => {
        return `${isInteger(text, true)} ${unitMap[report.unit]}`;
      },
    },
    {
      title: formatMessage({ id: 'duration' }),
      dataIndex: 'duration',
      align: 'center',
      render: text => {
        return timeToMillion(text);
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const { defaultStartDate, defaultEndDate } = this.state;
    dispatch({
      type: 'device/fetchProductionDevice',
      payload: {
        start: defaultStartDate,
        end: defaultEndDate,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, location } = this.props;
    const { defaultStartDate, defaultEndDate } = this.state;
    // let sn = location.query.sn;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    let formValues = {
      start: defaultStartDate,
      end: defaultEndDate,
    };
    const params = {
      page: pagination.current - 1,
      count: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    this.setState({
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
      formParams: params,
    });
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'device/fetchProductionDevice',
      payload: {
        ...params,
      },
    });
  };

  handleSearch = (values, values_utc) => {
    const { dispatch } = this.props;
    this.setState({
      defaultStartDate: values_utc.start,
      defaultEndDate: values_utc.end,
    });
    dispatch({
      type: 'device/fetchProductionDevice',
      payload: {
        start: values_utc && values_utc.start,
        end: values_utc && values_utc.end,
        currentPage: 1,
        pageSize: 10,
      },
    });
  };

  searchDate = value => {
    const { dispatch } = this.props;
    let start = value && value.start;
    let end = value && value.end;
    this.setState({
      defaultStartDate: start,
      defaultEndDate: end,
    });
    dispatch({
      type: 'device/fetchProductionDevice',
      payload: {
        start,
        end,
      },
    });
  };

  render() {
    const {
      device: { productionDevice },
      loading,
    } = this.props;
    const { pageSize, pageNum } = this.state;
    const tableData = {
      list: productionDevice ? productionDevice.items : [],
      pagination: {
        total: productionDevice ? productionDevice.total : undefined,
        pageSize,
        current: pageNum,
      },
    };

    const timeSearch = {
      searchButton: this.handleSearch,
      searchDate: this.searchDate,
    };

    return (
      <Fragment>
        <TimeSearch {...timeSearch} />
        <NormalTable
          loading={loading}
          data={tableData}
          columns={this.columns}
          onChange={this.handleStandardTableChange}
          rowkey="id"
        />
      </Fragment>
    );
  }
}
export default YieldReportStatistics;
