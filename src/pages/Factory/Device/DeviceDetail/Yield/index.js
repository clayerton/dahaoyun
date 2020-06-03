import NextPage from '@/components/NextPage';
import { isInteger } from '@/utils/isInteger';
import { localUtc } from '@/utils/timeLine';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import DateUtc from '../component/date';
import styles from './index.less';
let time = 0;
@connect(({ Yield }) => ({
    device: Yield.device,
    nextPage: Yield.deviceNext,
}))
export default class Yield extends PureComponent {
    state = {
        unit: null,
        device: null,
        date: localUtc(), //默认查询今日
        size: 16,
    }
    componentDidMount() {
        const { dispatch, location } = this.props;
        const { date, size } = this.state;
        let device = location.query && location.query.id;
        const unit = JSON.parse(localStorage.getItem('unit'));
        this.setState({
            unit,
            device
        })
        dispatch({
            type: 'Yield/yieldByDevice',
            payload: {
                device,
                date,
                size
            }
        })
    }
    onClickMore = () => {
        const { dispatch, nextPage } = this.props;
        const { device, date, size } = this.state;
        dispatch({
            type: 'Yield/yieldByDevice',
            payload: {
                device,
                size,
                page: nextPage,
                date: localUtc(date),
            }
        })
    }
    _onRefresh = (date) => {
        const { dispatch } = this.props;
        const { device, size } = this.state;
        if (device)
            dispatch({
                type: 'Yield/yieldByDevice',
                payload: {
                    device,
                    size,
                    date: localUtc(date),
                }
            })
    }
    render() {
        const { device, nextPage } = this.props;
        const { unit, date } = this.state;
        const nextParent = {
            nextPage,
            onClickMore: this.onClickMore,
        }
        const dateParent = {
            date,
            _onRefresh: this._onRefresh
        }
        return (
            <div>
                <DateUtc {...dateParent} />
                <div className={styles.list}>
                    {
                        device && device.map((v, i) => {
                            const unitType = v.unitType;
                            let unitName = null, factor = 1;
                            try {
                                unitName = unitType && unit && (unit.filter((v, i) => v.type === unitType)[0].name) || null;
                                factor = unitType && unit && (unit.filter((v, i) => v.type === unitType)[0].factor) || 1;
                            } catch (e) { }

                            return (
                                <div className={styles.item} key={i}>
                                    <div className={styles.content}>
                                        <div className={styles.header}>
                                            <span>{v.design}</span>
                                        </div>
                                        <div className={styles.unitCount}> {isInteger(v.count * factor, 0)}{unitName}</div>
                                    </div>
                                    <div className={styles.footer}>
                                        <span>花样产量：{isInteger(v.designYield * factor)}{unitName}</span>
                                        <span>正品数量：{isInteger(v.valid * factor, 0)}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <NextPage {...nextParent} />
                </div>
            </div>
        )
    }
}