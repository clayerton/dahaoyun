import React, { PureComponent, Fragment } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col, Popconfirm } from 'antd';
import NormalTable from '@/components/NormalTable';
import { connect } from 'dva';
const stageStatus = {
    unauthorized: '未授权',
    authorized: '已授权',
    decrypted: '已解密',
}
@Form.create()
@connect(({ stage, loading }) => ({
    stage,
    loading: loading.effects['order/fetchList'],
}))
class StagePasswordModal extends PureComponent {
    state = {
        page: 0,
        count: 10,
    }

    handleCancel = e => {
        e.preventDefault();
        const { handleCancel } = this.props;
        handleCancel();
    };

    handleModalVisible = () => {
        const { dispatch, _handleStage } = this.props;
        _handleStage && _handleStage(record)
    }


    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch, handleStandardTableChangeProps } = this.props;

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
            count: pagination.pageSize,
            page: pagination.current - 1,
        });
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        handleStandardTableChangeProps && handleStandardTableChangeProps(params);
    };

    handleStage = (record) => {
        const { dispatch, _handleStage } = this.props;
        _handleStage && _handleStage(record)
    }

    // 取消授权
    handleModalCancel = (record) => {
        const { dispatch, _handleModalCancel } = this.props;
        _handleModalCancel && _handleModalCancel(record)
    }
    // 密码解密
    handleModalPassword = (record) => {
        const { dispatch, _handleModalPassword } = this.props;
        _handleModalPassword && _handleModalPassword(record)
    }

    render() {
        const { page, count } = this.state;
        const { deviceInstallmentDetail, pageModal, countModal } = this.props;
        let deviceInstall = deviceInstallmentDetail && deviceInstallmentDetail.items; // 数据源
        let decryptCount = deviceInstallmentDetail && (deviceInstallmentDetail.decryptedCount + 1); //数据解密期数截止线
        const data = {
            list: deviceInstallmentDetail && deviceInstallmentDetail.items,
            pagination: {
                total: deviceInstallmentDetail && deviceInstallmentDetail.total,
                pageSize: countModal,
                current: pageModal + 1,
            },
        };
        let id = deviceInstall && deviceInstall.map((v, i) => {
            if (v.decryptStatus === 'authorized' || v.decryptStatus === 'unauthorized') {
                return v.id
            }
        })
        let newId = id && id.filter((v, i) => {
            if (!isNaN(v)) {
                return v;
            }
        })
        let decryptId = newId && newId[0];

        const { visible } = this.props;
        const columns = [
            {
                title: '期数',
                dataIndex: 'index',
                align: 'center',
            },
            {
                title: '到期日期',
                dataIndex: 'due',
                align: 'center',
            },
            {
                title: '状态',
                dataIndex: 'decryptStatus',
                align: 'center',
                render: (text) => {
                    return stageStatus[text];
                }
            },
            {
                title: '密码',
                dataIndex: 'password',
                align: 'center',
            },
            {
                title: '解密日期',
                dataIndex: 'decryptDate',
                align: 'center',
            },
            {
                title: '操作',
                align: 'center',
                width: '25%',
                render: (record) => {
                    let idDecrypt = id.indexOf(record.id) >= 0;
                    let tip = null;
                    tip = '取消授权';
                    if (idDecrypt && record.decryptStatus === 'authorized') {
                        tip = '已授权';
                    }
                    if (idDecrypt && record.decryptStatus === 'unauthorized') {
                        tip = '授权';
                    }
                    return (
                        <Fragment>
                            {
                                tip === '取消授权' && <a type='primary'
                                    style={{ marginRight: 10 }}
                                    onClick={e => {
                                        e.stopPropagation();
                                        this.handleModalVisible(record);
                                    }}
                                    disabled={true}
                                >
                                    {tip}
                                </a>
                            }
                            {
                                tip === '已授权' && record.id === decryptId && record.index !== '总密码' &&
                                <Fragment>
                                    <a type='primary'
                                        style={{ marginRight: 10 }}
                                        onClick={e => {
                                            e.stopPropagation();
                                            this.handleModalCancel(record);
                                        }}
                                    >
                                        取消授权
                                </a>
                                    <a type='primary'
                                        onClick={e => {
                                            e.stopPropagation();
                                            this.handleModalPassword(record);
                                        }}>
                                        密码解密
                                 </a>
                                </Fragment>

                            }
                            {
                                tip === '已授权' && record.index === '总密码' &&
                                <Fragment>
                                    <a type='primary'
                                        style={{ marginRight: 10 }}
                                        onClick={e => {
                                            e.stopPropagation();
                                            this.handleModalCancel(record);
                                        }}
                                    >
                                        取消授权
                                </a>
                                    <a type='primary'
                                        onClick={e => {
                                            e.stopPropagation();
                                            this.handleModalPassword(record);
                                        }}>
                                        密码解密
                                 </a>
                                </Fragment>

                            }

                            {
                                tip === '授权' && record.id === decryptId && record.index == decryptCount && record.index !== '总密码' &&
                                <Popconfirm title="是否授权解密权限给客户?" onConfirm={() => this.handleStage(record)}>
                                    <a type='primary'
                                        style={{ marginRight: 10 }}
                                        onClick={e => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        授权
                                    </a>
                                </Popconfirm>

                            }
                            {
                                tip === '授权' && record.id === decryptId && record.index != decryptCount &&
                                <a type='primary'
                                    style={{ marginRight: 10 }}
                                    onClick={e => {
                                        e.stopPropagation();
                                        this.handleModalVisible(record);
                                    }}
                                    disabled={true}
                                >
                                    授权
                                </a>
                            }
                            {
                                tip === '授权' && record.id !== decryptId && record.index !== '总密码' &&
                                <a type='primary'
                                    style={{ marginRight: 10 }}
                                    onClick={e => {
                                        e.stopPropagation();
                                        this.handleModalVisible(record);
                                    }}
                                    disabled={true}
                                >
                                    授权
                                </a>
                            }
                            {
                                tip === '授权' && record.index === '总密码' &&
                                <Popconfirm title="是否授权解密权限给客户?" onConfirm={() => this.handleStage(record)}>
                                    <a type='primary'
                                        style={{ marginRight: 10 }}
                                        onClick={e => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        授权
                                </a>
                                </Popconfirm>
                            }
                        </Fragment>
                    )
                }
            }

        ]
        return (
            <Modal
                visible={visible}
                onCancel={this.handleCancel}
                width={800}
                footer={null}
            >
                <div style={{ height: 30 }} />
                <NormalTable
                    loading={false}
                    data={data}
                    columns={columns}
                    onChange={this.handleStandardTableChange}
                />

            </Modal>
        );
    }
}
export default StagePasswordModal;