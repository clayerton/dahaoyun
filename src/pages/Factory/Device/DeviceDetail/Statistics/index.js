import { localUtc, timeLine } from '@/utils/timeLine';
import { timeToMillion } from '@/utils/timeToMillion';
import DataSet from "@antv/data-set";
import { Axis, Chart, G2, Geom, Tooltip } from "bizcharts";
import Slider from 'bizcharts-plugin-slider';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import DateUtc from '../component/date';
import styles from './index.less';
import PieChart from './Pie';
const { Global, Util, Theme } = G2; // 获取 Global 全局对象

const dateSelect = [7, 15, 30];
const status = [
    { reason: '开车', type: 'run', color: '#1a9805' },
    { reason: '停车', type: 'stop', color: '#e77608' },
    { reason: '故障', type: 'error', color: '#c30000' },
    { reason: '离线', type: 'offline', color: '#848484' },
]
const ds = new DataSet({
    state: {
        start: 0,
        end: 1,
    },
});
@connect(({ run }) => ({
    reason: run.reason,
    utilize: run.utilize,
    stateList: run.stateList,
    reasonCount: run.reasonCount,
    reasonDuration: run.reasonDuration
}))
export default class Statistics extends PureComponent {
    state = {
        index: 7, //日期选择
        statusSel: 'run',
        statusColor: '#1a9805',
        start: timeLine(6),
        end: timeLine(0),
        date: new Date(),
        device: null,
        size: 1000,
    }
    componentDidMount() {
        const { dispatch, location } = this.props;
        const { start, end, statusSel, size, date } = this.state;
        let device = location.query && location.query.id;
        this.setState({
            device,
        })
        // 稼动率走势图
        dispatch({
            type: 'run/runUtilize',
            payload: {
                device,
                start,
                end,
                size
            }
        })
        // 状态统计
        dispatch({
            type: 'run/runState',
            payload: {
                device,
                date: localUtc(date),
            }
        })
        dispatch({
            type: 'run/runReason',
            payload: {
                device,
                state: statusSel,
                date: localUtc(date),
            }
        })


    }
    onHandleSelect = (index) => {
        const { dispatch } = this.props;
        const { start, end, device, size } = this.state;
        this.setState({
            index,
        })
        dispatch({
            type: 'run/runUtilize',
            payload: {
                device,
                start: timeLine(index - 1),
                end,
                size
            }
        })
    }
    onHandleSelStatus = (v) => {
        const { dispatch } = this.props;
        const { statusSel, start, date, device } = this.state;
        if (statusSel === v.type) return;
        this.setState({
            statusSel: v.type,
            statusColor: v.color,
        })
        dispatch({
            type: 'run/runReason',
            payload: {
                device,
                state: v.type,
                date: localUtc(date),
            }
        })
    }
    handleSliderChange = e => {
        const { startRadio, endRadio } = e;
        ds.setState('start', startRadio);
        ds.setState('end', endRadio);
    };
    _onRefresh = (date) => {
        const { dispatch } = this.props;
        const { device, statusSel } = this.state;
        this.setState({
            date,
        })
        if (!device) return;
        dispatch({
            type: 'run/runState',
            payload: {
                device,
                date: localUtc(date),
            }
        })
        dispatch({
            type: 'run/runReason',
            payload: {
                device,
                state: statusSel,
                date: localUtc(date),
            }
        })
    }
    render() {
        const { reason, utilize, stateList, reasonCount, reasonDuration } = this.props;
        const { index, statusSel, statusColor, date } = this.state;
        const cols = {
            ratio: {
                range: [0, 1]
            },
        };

        const dv = ds.createView().source(utilize);

        dv.transform({
            type: 'filter',
            callback(item, idx) {
                const radio = idx / utilize.length;
                return radio >= ds.state.start && radio <= ds.state.end;
            },
        });
        const dateParent = {
            date: date,
            _onRefresh: this._onRefresh
        }
        return (
            <div>
                <header className={styles.header}>
                    <span className={styles.title}>稼动率走势图</span>
                    {
                        dateSelect.map((v, i) => {
                            return <div onClick={this.onHandleSelect.bind(this, v)} className={`${styles.date} ${index === v && styles.dateSelect}`} key={i}>{v}日</div>
                        })
                    }
                </header>
                <div style={{ height: 459, }}>
                    <Chart height={400} padding='auto' data={dv} scale={cols} forceFit>
                        <Axis name="date" />
                        <Axis name="ratio"
                            tooltip={[
                                "radio*percent",
                                (radio, percent) => {
                                    percent = percent * 100 + "%";
                                    console.log(percent)
                                    return {
                                        name: radio,
                                        value: percent
                                    };
                                }
                            ]}
                        />
                        <Tooltip
                            crosshairs={{
                                type: 'y',
                            }}
                        />
                        <Geom type="line" position="date*ratio" />
                    </Chart>
                    <Slider
                        data={utilize}
                        padding={80}
                        xAxis="date"
                        yAxis="ratio"
                        onChange={this.handleSliderChange}
                    />
                </div>
                <header className={styles.statistics}>
                    <span className={styles.title}>状态统计</span>
                    <DateUtc {...dateParent} />
                </header>
                <div className={styles.eChart}>
                    <div className={styles.pie}>
                        <PieChart stateList={stateList} />
                    </div>
                    <div className={styles.status}>
                        <div className={styles.reason}>
                            {
                                status.map((v, i) => {
                                    return <div
                                        key={i}
                                        className={`${statusSel === v.type && styles.select}`}
                                        style={{
                                            background: v.color,
                                        }}
                                        onClick={this.onHandleSelStatus.bind(this, v)}
                                    >{v.reason}</div>
                                })
                            }
                        </div>
                        <div className={styles.list} style={{
                            borderColor: statusColor,
                        }}>
                            <div className={styles.listHeader}
                                style={{
                                    background: statusColor,
                                }}>
                                <span>合计</span>
                                <span>{reasonCount}次</span>
                                <span>{timeToMillion(reasonDuration)}</span>
                            </div>
                            <div className={styles.listBody}>
                                <div className={styles.bodyHeader} style={{
                                    borderColor: statusColor,
                                }}>
                                    <span>原因</span>
                                    <span>次数</span>
                                    <span>时长</span>
                                </div>
                                {
                                    reason && reason.map((v, i) => {
                                        return <div key={i} className={styles.content} style={{ borderColor: statusColor }}>
                                            <span>{v.reason && formatMessage({ id: `error-code-${v.reason}` })}</span>
                                            <span>{v.count}</span>
                                            <span>{timeToMillion(v.duration)}</span>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}