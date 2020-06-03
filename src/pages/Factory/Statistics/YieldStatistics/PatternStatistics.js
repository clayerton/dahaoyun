import NormalTable from '@/components/NormalTable';
import TimeSearch from '@/components/TimeSearch';
import { isInteger } from '@/utils/isInteger';
import { Form, Tabs } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { unitMap } from '@/utils/parameter';

const { TabPane } = Tabs;

@connect(({ production, loading }) => ({
  production,
  loading: loading.models.fetchList,
}))
@Form.create()
class PatternStatistics extends PureComponent {
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
      title: formatMessage({ id: 'design.name1' }),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: formatMessage({ id: 'total' }),
      dataIndex: 'total',
      align: 'center',
      render: (text, data) => {
        return `${isInteger(data.valid + data.flawed + data.invalid, true)} ${unitMap[data.unit]}`;
      },
    },
    {
      title: formatMessage({ id: 'valid' }),
      dataIndex: 'valid',
      align: 'center',
      render: (text, data) => {
        return `${isInteger(text, true)} ${unitMap[data.unit]}`;
      },
    },
    {
      title: formatMessage({ id: 'flawed' }),
      dataIndex: 'flawed',
      align: 'center',
      render: (text, data) => {
        return `${isInteger(text, true)} ${unitMap[data.unit]}`;
      },
    },
    {
      title: formatMessage({ id: 'invalid' }),
      dataIndex: 'invalid',
      align: 'center',
      render: (text, data) => {
        return `${isInteger(text, true)} ${unitMap[data.unit]}`;
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const { defaultStartDate, defaultEndDate } = this.state;
    dispatch({
      type: 'production/designFetch',
      payload: {
        start: defaultStartDate,
        end: defaultEndDate,
      },
    });
  }

  handleSearch = (value, values) => {
    const { dispatch } = this.props;
    this.setState({
      defaultStartDate: values.start,
      defaultEndDate: values.end,
    });
    dispatch({
      type: 'production/designFetch',
      payload: {
        start: values.start,
        end: values.end,
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
      type: 'production/designFetch',
      payload: {
        start,
        end,
      },
    });
  };

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
      pageNum: pagination.current - 1,
      formParams: params,
    });
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'production/designFetch',
      payload: {
        ...params,
      },
    });
  };

  render() {
    const {
      production: { pattern },
      loading,
    } = this.props;
    const { pageSize, pageNum } = this.state;
    const tableData = {
      list: pattern ? pattern.items : [],
      pagination: {
        total: pattern ? pattern.total : undefined,
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
          rowkey="name"
        />
      </Fragment>
    );
  }
}
export default PatternStatistics;
