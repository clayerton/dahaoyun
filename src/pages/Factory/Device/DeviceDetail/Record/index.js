import NextPage from '@/components/NextPage';
import { localUtc } from '@/utils/timeLine';
import { timeToMillion } from '@/utils/timeToMillion';
import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import DateUtc from '../component/date';
import styles from './index.less';

@connect(({ run }) => ({
    report: run.report,
    nextPage: run.nextReport,
}))
export default class Record extends PureComponent {
    state = {
        end: new Date(),
        device: null,
        size: 16,
    }
    componentDidMount() {
        const { dispatch, location } = this.props;
        const { end, size } = this.state;
        let device = location.query && location.query.id;
        this.setState({
            device,
        })
        dispatch({
            type: 'run/runFet',
            payload: {
                device,
                end: localUtc(end),
                size,
                state: 'none'
            }
        })


    }
    onClickMore = () => {
        const { nextPage, dispatch } = this.props;
        const { device, size, end } = this.state;
        dispatch({
            type: 'run/runFet',
            payload: {
                end: localUtc(end),
                device,
                size,
                page: nextPage,
            },
        });
    }
    _onRefresh = (date) => {
        const { dispatch } = this.props;
        const { device, size } = this.state;
        this.setState({
            end: date,
        })
        if (device)
            dispatch({
                type: 'run/runFet',
                payload: {
                    device,
                    size,
                    end: localUtc(date),
                }
            })
    }
    render() {
        const { report, nextPage } = this.props;
        const { end } = this.state;

        const nextParent = {
            nextPage,
            onClickMore: this.onClickMore,
        }
        const dateParent = {
            date: end,
            _onRefresh: this._onRefresh
        }
        return (
            <div>
                <div className={styles.header}>
                    <div>
                        <DateUtc {...dateParent} />
                    </div>
                </div>
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td><span>开始时间</span></td>
                                <td><span>状态</span></td>
                                <td><span>时长</span></td>
                                <td><span>原因</span></td>
                                <td><span>机头-针位</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                report && report.map((v, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{moment(v.start).format('YYYY-MM-DD HH:mm:ss')}</td>
                                            <td>{formatMessage({ id: `device.${v.state}` })}</td>
                                            <td>{timeToMillion(v.duration)}</td>
                                            <td>{v.reason}</td>
                                            <td>{v.position}</td>
                                        </tr>
                                    )
                                })

                            }

                        </tbody>
                    </table>
                    <NextPage {...nextParent} />

                </div>
            </div>
        )
    }
}