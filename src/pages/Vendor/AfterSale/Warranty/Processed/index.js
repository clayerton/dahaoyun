import React, { PureComponent, Fragment } from 'react';
import { Button, Input, Row, Col, Divider, Form, Modal, } from 'antd';
import styles from './index.less';
import NormalTable from '@/components/NormalTable';
import EditWarrantyModal from '../EditWarranty'
import router from 'umi/router';

const { Search } = Input;

@Form.create()
class WarrantyPage extends PureComponent {

    state = {
        current: null,
        visibleEdit: false,
    }

    handleSearch = () => {

    }

    handleModalVisible = () => {
        this.setState({
            visibleEdit: true,
        })
    }

    handleDelete = () => {

    }

    columns = [
        {
            title: '',
            dataIndex: 'new',
            align: 'center',
        },
        {
            title: '报修时间',
            dataIndex: 'name',
            align: 'left',
        },
        {
            title: '客户',
            dataIndex: 'contact',
            align: 'left',
        },
        {
            title: '问题描述',
            dataIndex: 'mobile',
            align: 'left',
            width: '50%',
        },
        {
            title: '待处理类型',
            dataIndex: 'address',
            align: 'left',
        },
    ];

    handleStandardTableChange = () => {

    }

    addModel = () => {
        const { addModelShow } = this.props;
        addModelShow();
    }

    handleSubmitEdit = (value) => {
        console.log(value, 'value')
    }

    handleCancel = () => {
        this.setState({
            visibleEdit: false,
        })
    }

    render() {
        const { current, visibleEdit } = this.state;
        const report = {
            page: 1,
            total: 1,
            customerModelList: [{ name: '刘文', contact: '15952398410', id: 22 }]
        };
        const tableData = {
            list: (report && report.customerModelList) || [],
            pagination: {
                total: report ? report.total : undefined,
                pageSize: 1,
                current: 1,
            },
        };

        // 编辑报修信息
        const editWarranty = {
            current,
            visible: visibleEdit,
            handleSubmit: this.handleSubmitEdit,
            handleCancel: this.handleCancel,
        };

        return (
            <Fragment>
                <div className={styles.tableListForm}>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 20, }} type="flex" justify="end">
                        <Col md={8} sm={24} />
                        <Col md={8} sm={24}>
                            <Search
                                placeholder="请输入客户/待处理类型"
                                enterButton="查询"
                                onSearch={this.handleSearch}
                                allowClear
                            />
                        </Col>
                    </Row>
                </div>

                <NormalTable
                    loading={false}
                    data={tableData}
                    columns={this.columns}
                    onChange={this.handleStandardTableChange}
                    onRow={record => {
                        return {
                            onClick: (event) => {
                                event.stopPropagation();
                                router.push({
                                    // pathname: '/vendor/afterSale/warranty-detail',
                                    // query: { id: record.id },
                                }
                                )
                            }, // 点击行
                        };
                    }}
                    rowkey="id"
                    rowClassName={true}

                />
                <EditWarrantyModal {...editWarranty} />
            </Fragment>
        )
    }
}
export default WarrantyPage;