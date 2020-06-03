import A15 from '@/assets/device/A15.jpg';
import A18A58 from '@/assets/device/d_A18-A58.jpg';
import A98 from '@/assets/device/d_A98.jpg';
import M98 from '@/assets/device/d_M98.jpg';
import stj from '@/assets/stj.png';
import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { isInteger } from '@/utils/isInteger';
import { timeToMillion } from '@/utils/timeToMillion';

@connect(({ device }) => ({
    detail: device.detail,
    live: device.live,
}))
export default class Detail extends PureComponent {
    judgeImg = (type, model) => {
        if (type === 'embroidery') {
            if (model === 'A15') return A15;
            if (model === 'A98') return A98;
            if (model === 'M98') return M98;
            if (model === 'A18' || model === 'A58') return A18A58;
        }
        switch (type) {
            case 'glove':
                return stj;
            default:
                return A98;
        }
    };
    componentDidMount() {
        const { location, match, dispatch } = this.props;
        const id = location.query && location.query.id;
        dispatch({
            type: 'device/deviceOne',
            payload: { id }
        });
        dispatch({
            type: 'device/deviceLive',
            payload: { id }
        }) 
        this.timer = setInterval(() => {
            dispatch({
                type: 'device/deviceLive',
                payload: { id }
            }) 
        }, 30 * 1000);
        
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        const { detail, live } = this.props;
        const { id, vendor, model, display, name, type, workshop, ip, mac, machine, control, needles, board, heads, parameter } = detail;
        const { state, reason, total, rpm, utilize, start, user, updated, design, plan, product } = live;
        return (
            <div className={styles.box}>
                <div className={styles.left}>
                    <div className={styles.title}>单台设备详情</div>
                    <div className={styles.detail}>
                        <span>编号: {id}</span>
                        <span>电控: {model}</span>
                        <span>头数：{heads}</span>
                        <span>显示软件: {display}</span>
                    </div>
                    <div className={styles.detail}>
                        <span>名称: {name}</span>
                        <span>机型: {machine}</span>
                        <span>IP: {ip}</span>
                        <span>主控软件: {control}</span>
                    </div>
                    <div className={styles.detail}>
                        <span>车间: {workshop}</span>
                        <span>针数: {needles}</span>
                        <span>MAC: {mac}</span>
                        <span>协议版本：{board}</span>
                    </div>
                    <div className={styles.detail}>
                        <span>厂商：{vendor}</span>
                        {
                            parameter && parameter.map((v, i) => {
                                return <span key={i}>{v.key}: {v.value}</span>
                            })
                        }
                    </div>
                    <div className={styles.line} />
                    <div className={`${styles.title} ${styles.diff}`}>单台当前状态</div>
                    <div className={styles.status}>
                        <span>状态: {state && formatMessage({ id: `device.${state}` })}</span>
                        <span>当前速度: {rpm}</span>
                        <span>当天嫁动率: {isInteger(utilize && utilize.ratio * 100) + '%'}</span>
                    </div>
                    <div className={styles.status}>
                        <span>原因: {reason && formatMessage({ id: `error-code-${reason}` })}</span>
                        <span>累计针数: {total}</span>
                        <span>状态开始：{start && moment(start).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div className={styles.status}>
                        <span>时长: {start && timeToMillion(start,true)}</span>
                        <span>登录用户: {user}</span>
                        <span>状态更新: {updated && moment(updated).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div className={styles.line} />
                    <div className={`${styles.title} ${styles.diff}`}>单台当前花样与计划</div>
                    <div className={styles.status}>
                        <span>花样：{design && design.name}</span>
                        <span>计划：{product}</span>
                        <span>状态更新：{updated && moment(updated).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div className={styles.status}>
                        <span>进度：{design && design.stitch}/{design && design.total}针</span>
                        <span>正在生产：{design && design.working}</span>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={this.judgeImg(type, model)} />
                </div>
            </div>
        )
    }
}