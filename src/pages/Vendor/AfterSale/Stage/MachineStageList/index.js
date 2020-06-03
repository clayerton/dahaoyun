import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Col, Row, Divider, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import NormalTable from '@/components/NormalTable';
import router from 'umi/router';
import StagePasswordModal from './StagePassowrdModal';
import ModifyMachine from './ModifyMachine';
import { parseFilters } from '@/utils/parse';

const { Search } = Input

const color = {
    color: '#999',
}

@connect(({ stage, loading }) => ({
    stage,
    loading: loading.effects['order/fetchList'],
}))
class MachineStageList extends PureComponent {
    state = {
        visible: false,
        visibleModify: false,
        page: 0,
        count: 10,
        pageModal: 0,
        countModal: 10,
        encryptId: null,
        key: null,
    }

    componentDidMount() {
        const { dispatch, location } = this.props;
        let id = location && location.query && location.query.id;
        dispatch({
            type: 'stage/outproductDetails',
            payload: {
                outproductId: id,
            }
        })
    }



    handleModalVisible = (items) => {
        const { dispatch, location } = this.props;
        const {pageModal,countModal} = this.state;
        dispatch({
            type: 'stage/deviceInstallmentDetail',
            payload: {
                encryptId: items && items.encryptId,
                page: 0,
                count: countModal,
            },

        })
        this.setState({
            visible: true,
            pageModal: 0,
            encryptId: items && items.encryptId,

        })
    }

    handleModalModify = (items) => {
        this.setState({
            visibleModify: true,
            current: items,

        })
    }

    handleModalUntied = (item) => {
        Modal.confirm({
            title: `解除分期管理`,
            content: `确定解除吗？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => this.untiedHandler(item),
        });
    }

    handleDeviceEncryptText = (item) => {
        Modal.confirm({
            title: `设备机密(测试)`,
            content: `确定设备机密吗？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => this.SureDeviceEncryptText(item),
        });
    }
    SureDeviceEncryptText = (item) => {
        const { dispatch, location } = this.props;
        const { current ,page,count} = this.state;
        let id = location && location.query && location.query.id;
        dispatch({
            type: 'stage/encrypt',
            payload: {
                add: {
                    sn: item.sn,
                },
                fetch: {
                    outproductId: id,
                    page,
                    count,
                }
            },
            
        })
    }

    untiedHandler = (item) => {
        const { dispatch, location } = this.props;
        const {page, count} = this.state;
        let id = location && location.query && location.query.id;
        dispatch({
            type: 'stage/delOutDevice',
            payload: {
                del: {
                    id: item && item.id,
                },
                fetch: {
                    outproductId: id,
                    page,
                    count,
                }
            },

        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleModifyCancel = () => {
        this.setState({
            visibleModify: false,
        })
    }

    handleSubmit = (value) => {
        const { dispatch, location } = this.props;
        const { current ,page,count} = this.state;
        let id = location && location.query && location.query.id;
        dispatch({
            type: 'stage/updateDevice',
            payload: {
                upd: {
                    id: current && current.id,
                    ...value,
                },
                fetch: {
                    outproductId: id,
                    page,
                    count,

                }
            },
            callback: () => {
                this.setState({
                    visibleModify: false,
                })
            }
        })
    }

    closeReturn = () => {
        router.push(
            '/vendor/afterSale/stage'
        )
    }

    handleSearch = (key) => {
        const { dispatch, location } = this.props;
        const {page, count} = this.state;
        let id = location && location.query && location.query.id;
        this.setState({
            key,
            page: 0,
        })
        dispatch({
            type: 'stage/outproductDetails',
            payload: {
                outproductId: id,
                key,
                count,
            }
        })
    }

    handleStandardTableChangeProps = (value) => {
        const { dispatch, location } = this.props;
        const { encryptId, pageModal, countModal } = this.state;
        this.setState({
            pageModal: value.page,
            countModal: value.count,
        })
        dispatch({
            type: 'stage/deviceInstallmentDetail',
            payload: {
                encryptId: encryptId,
                ...value,
            },

        })
    }

    handleStandardTableChange = (pagination, filtersArg, recordId) => {
        const { dispatch, location } = this.props;
        let id = location && location.query && location.query.id;
        const { page,count, key } = this.state;
    
        const filters = parseFilters(filtersArg);
    
        const params = {
          orderId: recordId,
          page: pagination.current - 1,
          count: pagination.pageSize,
          ...filters,
        };
    
        this.setState({
            count: pagination.pageSize,
            page: pagination.current - 1,
        });
       
        dispatch({
            type: 'stage/outproductDetails',
            payload: {
                outproductId: id,
                key,
                ...params,
            }
        })
      };

    _handleStage = (value) => {
        const { dispatch,location } = this.props;
        let id = location && location.query && location.query.id;
        const {pageModal,countModal,page,count, key} = this.state;
        let index = value.index;
        if (value.index === '总密码') index = 0;
        dispatch({
            type: 'stage/installmentAuthorize',
            payload: {
                add: {
                    encryptId: value.encryptId,
                    index,
                },
                fetch: {
                    encryptId: value.encryptId,
                    count: countModal,
                    page: pageModal,
                },
                fet: {
                    page,
                    count,
                    key,
                    outproductId: id,
                }
            }
        })
    }
    _handleModalCancel = (value) => {
        const { dispatch,location } = this.props;
        let id = location && location.query && location.query.id;
        const {pageModal,countModal,page,count,key} = this.state;

        let index = value.index;
        if (value.index === '总密码') index = 0;
        dispatch({
            type: 'stage/cancelInstallmentAuthorize',
            payload: {
                add: {
                    encryptId: value.encryptId,
                    index: index,
                },
                fetch: {
                    encryptId: value.encryptId,
                    count: countModal,
                    page: pageModal,
                },
                fet: {
                    page,
                    count,
                    key,
                    outproductId: id,
                }
            }
        })
    }

    _handleModalPassword = (value) => {
        const { dispatch, location } = this.props;
        const {pageModal,countModal,count,page} = this.state;

        let id = location && location.query && location.query.id;
        let index = value.index;
        if (value.index === '总密码') index = 0;
        dispatch({
            type: 'stage/manualEncrypt',
            payload: {
                add: {
                    encryptId: value.encryptId,
                    index: index,
                },
                fetch: {
                    encryptId: value.encryptId,
                    count: countModal,
                    page: pageModal,
                },
                fetchStage: {
                    outproductId: id,
                    page,
                    count,
                }
            }
        })
    }

    render() {

        const { visible, visibleModify, page, count, current, pageModal, countModal } = this.state;
        const { stage: { outproductDetails, deviceInstallmentDetail } } = this.props;
        const data = {
            list: outproductDetails && outproductDetails.items,
            pagination: {
                total: outproductDetails && outproductDetails.total,
                pageSize: count,
                current: page + 1,
            },
        };

        const detailModal = {
            visible,
            handleCancel: this.handleCancel,
            deviceInstallmentDetail,
            type: 1,
            handleStandardTableChangeProps: this.handleStandardTableChangeProps,
            _handleStage: this._handleStage,
            _handleModalCancel: this._handleModalCancel,
            _handleModalPassword: this._handleModalPassword,
            pageModal,
            countModal,
        }

        const modifyModal = {
            visible: visibleModify,
            handleCancel: this.handleModifyCancel,
            handleSubmit: this.handleSubmit,
            current,
            type: 2,
        }
        const columns = [
            {
                title: 'SN',
                dataIndex: 'sn',
                align: 'center',
            },
            {
                title: '设备名称',
                dataIndex: 'deviceName',
                align: 'center',
            },
            {
                title: '出厂编号',
                dataIndex: 'factoryNm',
                align: 'center',
            },
            {
                title: '加密状态',
                dataIndex: 'encryptStatus',
                align: 'center',
                render: (text) => {
                    return text === 'encrypted' ? '已加密' : '未加密'
                }
            },
            {
                title: '已解期数',
                dataIndex: 'decryptCount',
                align: 'center',
            },
            {
                title: '授权期数',
                dataIndex: 'authCount',
                align: 'center',
            },
            {
                title: '操作',
                align: 'center',
                width: '20%',
                render: record => (
                    <Fragment>

                        <a onClick={e => {
                            e.stopPropagation();
                            this.handleModalVisible(record);
                        }}
                        >
                            密码表
                     </a>
                        <Divider type="vertical" />
                        <a onClick={e => {
                            e.stopPropagation();
                            this.handleModalModify(record);
                        }}
                        >
                            修改
                     </a>
                        <Divider type="vertical" />
                        <a onClick={e => {
                            e.stopPropagation();
                            this.handleModalUntied(record);
                        }}
                            disabled={
                                // 加密+已结期数完成|| 未加密 === 解绑
                                !(record.encryptStatus === 'encrypted' && record.decryptCount === outproductDetails.totalIndex)
                                &&
                                !(record.encryptStatus === 'unencrypted')
                            }
                        >
                            解绑
                     </a>
                     <Divider type="vertical" />
                        <a onClick={e => {
                            e.stopPropagation();
                            this.handleDeviceEncryptText(record);
                        }}
                        >
                            设备加密(测试)
                     </a>
                    </Fragment>
                ),
            },
        ]

        return (
            <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.after-sale.stage.machine' })}>
                <Card bordered={false}>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 30 }} type="flex" align="middle" justify="space-between">
                        <Col md={16} sm={24}>
                            <span className={styles.letter}><b>起始日期： </b>{outproductDetails && outproductDetails.start}</span>
                            <span className={styles.letter}><b>分期间隔： </b>{outproductDetails && outproductDetails.interval}</span>
                            <span className={styles.letter}><b>分期期数： </b>{outproductDetails && outproductDetails.totalIndex}</span>
                        </Col>
                        <Col md={8} sm={24}>
                            <Search
                                className={styles.extraContentSearch}
                                enterButton="查询"
                                placeholder="请输入设备名\出厂编号"
                                onSearch={this.handleSearch}
                                allowClear
                            />
                        </Col>
                    </Row>
                    <NormalTable
                        loading={false}
                        data={data}
                        columns={columns}
                        onChange={this.handleStandardTableChange}
                    />
                    <div style={{ display: 'flex', marginTop: 20, }}>
                        <Button type="primary" className={styles.reBack} onClick={this.closeReturn}>
                            返回
                        </Button>
                    </div>

                </Card>
                <StagePasswordModal {...detailModal} />
                <ModifyMachine {...modifyModal} />
            </PageHeaderWrapper>
        );
    }
}

export default MachineStageList;
