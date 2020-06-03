import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Input, Button, Card, Modal } from 'antd';
import SelectTable from '@/components/SelectTable';
import styles from './index.less';

const { Search } = Input;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ loading, design }) => ({
  designList: design.designList,
  loading: loading.effects['design/fetchList'],
}))
@Form.create()
class DesignModal extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    pageSize: '',
    pageNum: '',
  };

  columns = [
    {
      title: '花样ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '花样名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'group',
      align: 'center',
      render: record => {
        return record !== null ? record : '未定义';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: record => {
        return record !== null ? moment(record).format('YYYY-MM-DD') : null;
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'design/fetchList',
      payload: {},
    });
  }

  // 选择表格单选框
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  // 表格翻页事件
  handleSelectTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

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
    };
    this.setState({
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
    });
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'design/fetchList',
      payload: params,
    });
  };

  // 查询重置事件
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      pageNum: 1,
    });
    dispatch({
      type: 'design/fetchList',
      payload: {},
    });
  };

  // 条件查询
  handleSearch = key => {
    const { dispatch } = this.props;

    this.setState({
      formValues: key,
    });

    dispatch({
      type: 'design/fetchList',
      payload: { key },
    });
  };

  closeDesignModal = () => {
    const { designHandleCancel } = this.props;

    designHandleCancel();
    this.setState({
      selectedRows: [],
    });
  };

  confirmBtn = () => {
    const { designHandleCancel } = this.props;
    const { selectedRows } = this.state;

    designHandleCancel(selectedRows);
    this.setState({
      selectedRows: [],
    });
  };

  renderForm() {
    return this.renderAdvancedForm();
  }

  render() {
    const { designList, loading, designVisible } = this.props;
    const { selectedRows, pageSize, pageNum } = this.state;

    const tableData = {
      list: designList ? designList.items : [],
      pagination: {
        total: designList ? designList.total : undefined,
        pageSize,
        current: pageNum,
      },
    };

    return (
      <Card bordered={false}>
        <Modal
          visible={designVisible}
          onCancel={this.closeDesignModal}
          width={1000}
          footer={null}
          title="选择花样"
        >
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Search
                className={styles.extraContentSearch}
                enterButton="查询"
                placeholder="请输入花样名\类型"
                onSearch={this.handleSearch}
                allowClear
              />
            </div>
            <SelectTable
              selectedRows={selectedRows}
              loading={loading}
              data={tableData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleSelectTableChange}
              selectType="radio"
            />
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <Button type="primary" disabled={selectedRows.length === 0} onClick={this.confirmBtn}>
                确定
              </Button>
              <Button style={{ marginLeft: '10px' }} onClick={this.closeDesignModal}>
                返回
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    );
  }
}

export default DesignModal;
