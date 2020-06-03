import ProductForm from '@/components/ProductForm';
import SelectTable from '@/components/SelectTable';
import { Button, Form, Input, Modal, Tabs } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

const { Search } = Input;
const { TabPane } = Tabs;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ loading, group, category, product }) => ({
  product,
  groupList: group.groupList,
  categoryList: category.typeList,
  loading: loading.effects['product/fetch'],
}))
@Form.create()
class ChooseProd extends PureComponent {
  formLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };

  state = {
    selectedRows: [],
    formValues: {},
    pageSize: 5,
    pageNum: 1,
    tabKey: '1',
    type: 'glove',
    workshopParams: {
      type: 'product',
      count: 5,
    },
  };

  columns = [
    // {
    //   title: '工艺单号',
    //   dataIndex: 'no',
    //   align: 'center',
    // },
    {
      title: formatMessage({ id: 'product.name' }),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: formatMessage({ id: 'group' }),
      dataIndex: 'group',
      align: 'center',
      render: record => {
        return record !== null ? record : formatMessage({ id: 'unallocated' });
      },
    },
    {
      title: formatMessage({ id: 'create.time' }),
      dataIndex: 'createTime',
      align: 'center',
      render: val => moment(val).format('YYYY-MM-DD HH:mm'),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const { workshopParams } = this.state;
    dispatch({
      type: 'product/fetch',
      payload: {},
    });
    dispatch({
      type: 'group/fetchGroup',
      payload: { ...workshopParams, count: 100 },
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
      type: 'product/fetch',
      payload: params,
    });
  };

  // 条件查询
  handleSearch = key => {
    const { dispatch } = this.props;

    this.setState({
      formValues: key,
    });

    dispatch({
      type: 'product/fetch',
      payload: { key },
    });
  };

  onChange = activeKey => {
    const { form, dispatch } = this.props;
    if (activeKey === '1') {
      this.changeItem('glove');
      form.resetFields();
    }
    this.setState({
      tabKey: activeKey,
    });
    if (activeKey === '2') {
      dispatch({
        type: 'category/searchCategory',
        payload: {
          // deviceType: 'glove',
          // page: 0,
          count: 100,
        }
      })
    }
  };

  closeDesignModal = () => {
    const { prodHandleCancel } = this.props;

    prodHandleCancel();
    this.setState({
      selectedRows: [],
      tabKey: '1',
    });
    this.changeItem('glove');
  };

  handleSubmit = values => {
    const { prodHandleCancel, dispatch, form } = this.props;
    const { selectedRows, tabKey } = this.state;

    if (tabKey === '1') {
      prodHandleCancel(selectedRows[0]);
      this.setState({
        selectedRows: [],
      });
    } else if (tabKey === '2' && values) {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const items = [];
        const params = fieldsValue.parameter;
        params &&
          Object.keys(params).map(key => {
            items.push({ key, value: params[key] });
          });
        fieldsValue.parameter = [...items];
        dispatch({
          type: 'product/addProd',
          payload: {
            add: {
              ...fieldsValue,
            },
            fetch: {},
          },
          callback: () => {
            this.setState({
              type: 'glove',
            });
            form.resetFields();
          },
        });
      });
    }
  };

  changeItem = value => {
    this.setState({
      type: value,
    });
  };

  renderForm() {
    return this.renderAdvancedForm();
  }

  render() {
    const {
      form: { validateFields, getFieldDecorator },
      product: { prod },
      loading,
      prodVisible,
      groupList,
      categoryList,
    } = this.props;
    const { selectedRows, pageSize, pageNum, type } = this.state;

    const tableData = {
      list: prod ? prod.items : [],
      pagination: {
        total: prod ? prod.total : undefined,
        pageSize,
        current: pageNum,
        showSizeChanger: false,
      },
    };

    const formMethods = {
      getFieldDecorator,
      formLayout: this.formLayout,
      type,
      submit: this.handleSubmit,
      validateFields,
      changeItem: this.changeItem,
      groupList,
      categoryList,
    };

    const modalFooter = {
      okText: formatMessage({ id: 'sure' }),
      onOk: this.handleSubmit,
      onCancel: this.closeDesignModal,
    };

    return (
      <Modal
        visible={prodVisible}
        onCancel={this.closeDesignModal}
        destroyOnClose
        width={1000}
        title={formatMessage({ id: 'select.add.product' })}
        {...modalFooter}
        footer={[
          <Button onClick={this.handleSubmit} type="primary">{formatMessage({ id: 'confirm' })}</Button>,
          <Button onClick={this.closeDesignModal} >{formatMessage({ id: 'cancel' })}</Button>
        ]}
      >
        <Tabs defaultActiveKey="1" onChange={this.onChange}>
          <TabPane tab={formatMessage({ id: 'choose.product' })} key="1">
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Search
                  className={styles.extraContentSearch}
                  enterButton={formatMessage({ id: 'search' })}
                  placeholder={formatMessage({ id: 'please.input.product.group' })}
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
            </div>
          </TabPane>
          <TabPane tab={formatMessage({ id: 'add.product' })} key="2">
            <ProductForm {...formMethods} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default ChooseProd;
