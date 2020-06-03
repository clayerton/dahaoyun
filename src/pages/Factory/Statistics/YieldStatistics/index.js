import { Card, Tabs } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import MachineStatistics from './MachineStatistics';
import PatternStatistics from './PatternStatistics';
import ProductionStatistics from './ProductionStatistics';
import WorkSpaceStatistics from './WorkSpaceStatistics';
import YieldReportStatistics from './YieldReportStatistics';

const { TabPane } = Tabs;
@connect(({ machineGlobal, loading, fault }) => ({
    fault,
    machineGlobal,
    loading: loading.models.fetchList,
}))
class YieldStatistics extends PureComponent {

    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
                formValues: values,
            });
            dispatch({
                type: 'fault/fetchList',
                payload: {
                    ...values,
                    beginTime: values.shiftDate[0],
                    endTime: values.shiftDate[1],
                    currentPage: 1,
                    pageSize: 10,
                },
            });
        });
    };

    render() {
        return (
            <Card bordered={false}>
                <Tabs hideAdd={true} animated={false} defaultActiveKey="1" onChange={this.onChange}>
                    <TabPane tab={formatMessage({ id: 'yield.report' })} key="1">
                        <YieldReportStatistics />
                    </TabPane>
                    <TabPane tab={formatMessage({ id: 'workshop.statistics' })} key="2">
                        <WorkSpaceStatistics />
                    </TabPane>
                    <TabPane tab={formatMessage({ id: 'machine.statistics' })} key="3">
                        <MachineStatistics />
                    </TabPane>
                    <TabPane tab={formatMessage({ id: 'production.statistics' })} key="4">
                        <ProductionStatistics />
                    </TabPane>
                    <TabPane tab={formatMessage({ id: 'pattern.statistics' })} key="5">
                        <PatternStatistics />
                    </TabPane>

                </Tabs>
            </Card>
        );
    }
}
export default YieldStatistics;
