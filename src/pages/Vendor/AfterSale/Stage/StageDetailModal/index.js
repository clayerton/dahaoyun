import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col } from 'antd';
import ModifyStageForm from '../StageModifyModal/ModifyStageForm';
import NormalTable from '@/components/NormalTable';
const stageStatus = {
    'unauthorized': '未授权',
    'authorized': '已授权',
    'decrypted': '已解密',
}
@Form.create()
class StageDetailModal extends PureComponent {
    state = {
        page: 0,
        count: 10
    }

    handleCancel = e => {
        e.preventDefault();
        const { handleCancel } = this.props;
        handleCancel();
    };

    columns = [
        {
            title: 'SN',
            dataIndex: 'sn',
            align: 'center',
        },
        {
            title: '设备名',
            dataIndex: 'deviceName',
            align: 'center',
        },
        {
            title: '出厂编码',
            dataIndex: 'factoryNm',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'decryptStatus',
            align: 'center',
            render: (text) => {
                return stageStatus[text]
            }
        },
        {
            title: '密码',
            dataIndex: 'password',
            align: 'center',
        },

    ]
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch, handleStandardTableChange } = this.props;
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
            formParams: params,
        });
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
        handleStandardTableChange && handleStandardTableChange(params)
        
    };

    render() {
        const { page, count } = this.state;
        const { installmentDeviceList,pageModal, countModal } = this.props;
        const data = {
            list: installmentDeviceList && installmentDeviceList.items,
            pagination: {
                total: installmentDeviceList && installmentDeviceList.total,
                pageSize: countModal,
                current: pageModal + 1,
            },
        };
        const { visible } = this.props;
        return (
            <Modal
                visible={visible}
                onCancel={this.handleCancel}
                width={800}
                footer={null}
            >
                <div style={{height: 30}} />
                <NormalTable
                    loading={false}
                    data={data}
                    columns={this.columns}
                    onChange={this.handleStandardTableChange}
                />

            </Modal>
        );
    }
}
export default StageDetailModal;
