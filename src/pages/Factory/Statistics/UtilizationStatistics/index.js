import NormalTable from '@/components/NormalTable';
import TimeSearch from '@/components/TimeSearch';
import { isInteger } from '@/utils/isInteger';
import { timeToMillion } from '@/utils/timeToMillion';
import { Card, DatePicker, Form, Input, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import ErrorReport from './ErrorReport';
import styles from './index.less';
import UtilizationModal from './UtilizationModal';
import { formatMessage } from 'umi-plugin-react/locale';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const { Search } = Input;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({ utilization, group, loading }) => ({
  utilization,
  group,
  loading: loading.models.fetchList,
}))
@Form.create()
class FaultStatistics extends PureComponent {
  state = {
    pageSize: 10,
    pageNum: 0,
    formValues: {},
    start: moment(
      moment(new Date())
        .add(0, 'days')
        .format('YYYY-MM-DD 00:00')
    ).utc().format(),
    end: moment(
      moment(new Date())
        .add(0, 'days')
        .format('YYYY-MM-DD 23:59')
    ).utc().format(),
    visibleErrorReport: false,
    visibleUtilizationReport: false,
    utilization: null,
    name: null,
  };

  columns = (groupListAll) => {
    return [
      {
        title: formatMessage({id: 'device'}),
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: formatMessage({id: 'workshop'}),
        dataIndex: 'workshop',
        align: 'center',
        // filters: this.group(groupListAll),
        // onFilter: (value, record) => {
        //   console.log(value, record.workshop)
        //   if (value === '未分配') return record.workshop === ''
        //   return record.workshop.indexOf(value) === 0
        // },
        render: (text) => {
          return text || formatMessage({id: 'unallocated'})
        }
      },
      {
        title: formatMessage({id: 'utilization'}),
        dataIndex: 'utilization',
        align: 'center',
        render: (text) => {
          return `${isInteger(text*100)} %`
        }
      },
      {
        title: formatMessage({id: 'run.during.time'}),
        dataIndex: 'run',
        align: 'right',
        render: (text) => {
          return timeToMillion(text)
        }
      },
      {
        title: formatMessage({id: 'error.during.time'}),
        dataIndex: 'error',
        align: 'right',
        render: (text) => {
          return timeToMillion(text)
        }
      },
      {
        title: formatMessage({id: 'stop.during.time'}),
        dataIndex: 'stop',
        align: 'right',
        render: (text) => {
          return timeToMillion(text)
        }
      },
      {
        title: formatMessage({id: 'offline.during.time'}),
        dataIndex: 'offline',
        align: 'right',
        render: (text) => {
          return timeToMillion(text)
        }
      },
    ];
  } 

  errorReport(e, report) {
    e.preventDefault();
    const { start, end } = this.state;
    this.setState({
      visibleErrorReport: true,
      visibleUtilizationReport: false,
      name: report && report.name,
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { start, end } = this.state;
    dispatch({
      type: 'utilization/fetchUtilization',
      payload: {
        workshop: null,
        start,
        end,
      }
    })
    dispatch({
      type: 'group/fetchGroup',
      payload: {
        count: 100,
        type: 'workshop',
        workshop: null,
      }
    })
  }
  group(groupList) {
    let data = [];
    groupList && groupList.map((v, i) => {
      data.push({
        text: v.name,
        value: v.name,
      })
    })
    data.push(...data, { text: formatMessage({id: 'unallocated'}), value: formatMessage({id: 'unallocated'}) })
    return Array.from(new Set(data));
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues, start, end } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {

      page: pagination.current - 1,
      count: pagination.pageSize,
      ...formValues,
      ...filters,
      start,
      end,
    };
    this.setState({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    });

    if (sorter.field) {
      params.orderBy = sorter.field;
      params.sort = sorter.order;
    }
    dispatch({
      type: 'utilization/fetchUtilization',
      payload: { ...params },
    });
  };



  handleSearch = (values, values_utc) => {
    const { dispatch } = this.props;
    this.setState({
      start: values_utc.start,
      end: values_utc.end,
    })
    dispatch({
      type: 'utilization/fetchUtilization',
      payload: {
        start: values_utc.start,
        end: values_utc.end,
        page:0,
        count: 10,
      },
    });
  };

  searchDate = value => {
    const { dispatch } = this.props;
    let start = value && value.start;
    let end = value && value.end;
    this.setState({
      start,
      end,
    })
    dispatch({
      type: 'utilization/fetchUtilization',
      payload: {
        start,
        end,
        page:0,
        count: 10,
      }
    })
  }

  ErrorReportHandleCancel = () => {
    this.setState({
      visibleErrorReport: false,
    })
  }

  _workList = (record, e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { start, end, page, count } = this.state;
    let params = {
      name: record.name,
      start,
      end,
      page, count
    }
    dispatch({
      type: 'utilization/fetchFault',
      payload: {
        ...params,
      }
    })
    this.setState({
      visibleUtilizationReport: true,
      utilization: record,
    })
  }

  UtilizationHandleCancel = () => {
    this.setState({
      visibleUtilizationReport: false,
    })
  }

  render() {
    const { group: { groupList }, loading, problemStatisticsList, utilization: { utilizationList, faultList } } = this.props;
    const { pageSize, pageNum, visibleErrorReport, visibleUtilizationReport, start, end, name, utilization } = this.state;
    const tableData = {
      list: utilizationList ? utilizationList.items : [],
      pagination: {
        total: utilizationList ? utilizationList.total : undefined,
        pageSize,
        current: pageNum,
      },
    };
    const timeSearch = {
      searchButton: this.handleSearch,
      searchDate: this.searchDate,
    }
    const errorReport = {
      visible: visibleErrorReport,
      handleCancel: this.ErrorReportHandleCancel,
      start,
      end,
      name
    }

    const utilizationReport = {
      visible: visibleUtilizationReport,
      handleCancel: this.UtilizationHandleCancel,
      faultList,
      utilization,
    }
    let groupListAll = groupList && groupList.items;

    return (
      <Fragment>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <TimeSearch {...timeSearch} />

            <NormalTable
              loading={loading}
              data={tableData}
              columns={this.columns(groupListAll)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onRow={record => ({
                onClick: (e) => {
                  this._workList(record, e);
                },
              })}
              rowkey="name"
              rowClassName={true}
            />
          </div>
        </Card>
        <ErrorReport {...errorReport} />
        <UtilizationModal {...utilizationReport} />
      </Fragment>
    );
  }
}
export default FaultStatistics;
