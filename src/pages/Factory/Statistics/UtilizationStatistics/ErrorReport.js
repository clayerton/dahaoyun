import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const { Search } = Input;
import moment from 'moment';
import { connect } from 'dva';

import NormalTable from '@/components/NormalTable';
@connect(({ device, loading }) => ({
    device,
    loading: loading.models.list,
}))
class ErrorReport extends PureComponent {

    state = {
        pageSize: 10,
        pageNum: 0
    }

    componentDidMount() {
        const { dispatch, start, end, name } = this.props;
        dispatch({
            type: 'device/fetchDeviceRun',
            payload: {
                name,
                state: 'error',
                start,
                end
            },
        });
    }

    handleCancel = () => {
        const { handleCancel } = this.props;
        handleCancel && handleCancel();
    }

    handleSearch = (key) => {
    }

    columns = [
        {
            title: '故障原因',
            dataIndex: 'reason',
            align: 'center',
        },
        {
            title: '发生时间',
            dataIndex: 'time',
            align: 'center',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm')
            }
        },
        {
            title: '持续时间',
            dataIndex: 'duration',
            align: 'center',
        },
    ];

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch, start, end, name } = this.props;
        const { } = this.state;

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
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
            formParams: params,
        });
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'device/fetchDeviceRun',
            payload: {
                ...params,
                name,
                state: 'error',
                start,
                end
            },
        });
    };

    render() {
        const { visible, loading, device: { deviceRunError }, } = this.props;
        const { pageSize, pageNum } = this.state;
        const tableData = {
            list: deviceRunError ? deviceRunError.items : [],
            pagination: {
                total: deviceRunError ? deviceRunError.total : undefined,
                pageSize,
                current: pageNum,
            },
        };
        return (
            <Modal title="" width={800} visible={visible} onCancel={this.handleCancel} footer={null}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginTop: 30, marginBottom: 30, }} type="flex" justify="end">
                    <Col md={12} sm={24}>
                        <Search
                            enterButton="查询"
                            placeholder="请输入故障原因"
                            onSearch={this.handleSearch}
                            allowClear
                        />
                    </Col>
                </Row>
                <NormalTable
                    loading={loading}
                    data={tableData}
                    columns={this.columns}
                    onChange={this.handleStandardTableChange}
                    rowkey="id"
                />
            </Modal>
        )
    }

}
export default ErrorReport;