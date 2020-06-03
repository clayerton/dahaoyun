import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Tabs, Button } from 'antd';
import SelectTable from '@/components/SelectTable';
import ProductFormVdr from '@/components/ProductFormVdr';
import moment from 'moment';
import styles from './index.less';

const { Search } = Input;
const { TabPane } = Tabs;

const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');

@connect(({ loading, vdrProduct }) => ({
    vdrProduct: vdrProduct.productList,
    groupList: vdrProduct.productType,
    loading: loading.effects['product/fetch'],
}))
@Form.create()
class ChooseProdVdr extends PureComponent {
    formLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 13 },
    };

    state = {
        selectedRows: [],
        formValues: {},
        pageSize: 5,
        pageNum: 0,
        tabKey: '1',
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
            title: '创建时间',
            dataIndex: 'createTime',
            align: 'left',
            // render: val => moment(val).format('YYYY-MM-DD HH:mm'),
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        const { workshopParams } = this.state;
        dispatch({
            type: 'vdrProduct/getProductMenu',
            payload: {
                count: 5,
                page: 0,
            },
        });
        dispatch({
            type: 'vdrProduct/getProductType',
            payload: {
                count: 100,
            },
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
            pageNum: pagination.current - 1,
        });
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'vdrProduct/getProductMenu',
            payload: params,
        });
    };

    // 条件查询
    handleSearch = key => {
        const { dispatch } = this.props;

        this.setState({
            formValues: key,
            pageNum: 0,
        });

        dispatch({
            type: 'vdrProduct/getProductMenu',
            payload: { key },
        });
    };

    onChange = activeKey => {
        const { form, dispatch } = this.props;
        if (activeKey === '1') {
            this.changeItem(0);
            form.resetFields();
        }
        this.setState({
            tabKey: activeKey,
        });
    };

    closeDesignModal = () => {
        const { prodHandleCancel } = this.props;

        prodHandleCancel();
        this.setState({
            selectedRows: [],
        });
        this.changeItem(0);
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
                dispatch({
                    type: 'vdrProduct/addProduct',
                    payload: {
                        add: {
                            ...fieldsValue,
                        },
                        fetch: {},
                    },
                    callback: () => {
                        this.setState({
                            type: 0,
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
            vdrProduct,
            loading,
            prodVisible,
            groupList,
            categoryList,
        } = this.props;
        const { selectedRows, pageSize, pageNum, type } = this.state;
        const tableData = {
            list: vdrProduct ? vdrProduct.items : [],
            pagination: {
                total: vdrProduct ? vdrProduct.total : undefined,
                pageSize,
                current: pageNum + 1,
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
            okText: '确定',
            onOk: this.handleSubmit,
            onCancel: this.closeDesignModal,
        };
        return (
            <Modal
                visible={prodVisible}
                onCancel={this.closeDesignModal}
                destroyOnClose
                width={1000}
                title="选择（新增）产品"
                {...modalFooter}
                footer={[
                    <Button onClick={this.handleSubmit} type="primary">确认</Button>,
                    <Button onClick={this.closeDesignModal} >取消</Button>
                ]}
            >
                <Tabs defaultActiveKey="1" onChange={this.onChange}>
                    <TabPane tab="选择产品" key="1">
                        <div className={styles.tableList}>
                            <div className={styles.tableListForm}>
                                <Search
                                    className={styles.extraContentSearch}
                                    enterButton="查询"
                                    placeholder="请输入工艺单号\品名\分组"
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
                    <TabPane tab="新增产品" key="2">
                        <ProductFormVdr {...formMethods} />
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}

export default ChooseProdVdr;
