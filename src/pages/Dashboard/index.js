import React, { PureComponent } from 'react';
import Link from 'umi/link'
import { Card, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-react/locale';
import hzj from '@/assets/hzj.jpg';
export default class DashBoard extends PureComponent {
    componentDidMount() {
    }

    render() {
        return (
            <Card>
                <Link to='/dashboard' target='_blank'>
                    <Button type='primary'>{formatMessage({id: 'device.board'})}</Button>
                </Link>
                <span style={{ display: 'inline-block', width: '10px', height: '20px' }} />
                <Link to='/dashboard/statistic' target='_blank'>
                    <Button type='primary'>{formatMessage({id: 'statistic.board'})}</Button>
                </Link>
                <span style={{ display: 'inline-block', width: '10px', height: '20px' }} />
                <Link to='/dashboard/statistic2' target='_blank'>
                    <Button type='primary'>{formatMessage({id: 'statistic.board1'})}</Button>
                </Link>
            </Card>
        )
    }
}