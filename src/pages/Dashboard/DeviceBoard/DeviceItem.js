import React, { PureComponent } from 'react';
import styles from './styles.css';
import wj from '@/assets/wj.png';
import empty from '@/assets/dashboard/empty.jpg';
import cxj_device from '@/assets/cxj_device.jpeg'
import screenWidth from './variable';
import EGaugeRpm from './EguageRpm'
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { timeToMillion } from '@/utils/timeToMillion';
import { assignAll } from 'lodash-decorators/utils';
const color = {
    none: null,
    run: '#000689',
    error: '#b40000',
    offline: '#6a6a6a',
    stop: '#c35c00',
}
const unitMap = {
    piece: '件',
    pair: '双',
    'dozen-pair': '打',
    'meter': '米',
    'yard': '码',
};
class DeviceItem extends PureComponent {
    componentDidMount() {

    }

    render() {
        const singleHeight = (screenWidth.winWidth - 161) / 4 * 63 / 88;
        const { imgUrl, data, live } = this.props;
        const dataLive = live && live[0];
        const progress = data && data.design && data.design.total && ((data.design.progress) / (data.design.total)) || 0;
        const progressLive = dataLive && dataLive.total && ((dataLive.progress) / (dataLive.total)) || 0;
       
        return (
            <div className={styles.list} style={{ background:  (dataLive && color[dataLive.state]) || (data && color[data.state]) }}>
                <div className={styles.listLeft}>
                    <div className={styles.imgBox} >
                        <img
                            className={styles.img}
                            src={imgUrl || cxj_device}
                            style={{
                                // marginTop: `${0.1095 * singleHeight}px`, 
                                // marginBottom: `${0.07936 * singleHeight}px` 
                            }}
                        />
                    </div>
                    <div className={styles.title} style={{ height: `${0.07301 * singleHeight}`, marginBottom: `${0.04444 * singleHeight}px` }}>
                        {dataLive && dataLive.design || data && data.design && data.design.name}
                    </div>
                    <div className={styles.eChart} style={{ height: `${0.2683 * singleHeight}px` }}>
                        <EGaugeRpm sn={data && data.sn} deviceStatus={dataLive && dataLive.rpm || data && data.rpm} style={{ height: `${0.2683 * singleHeight}px` }} />
                    </div>
                    <div className={styles.gudgeInfo}>
                    {dataLive && dataLive.rpm || data && data.rpm}
                    </div>
                </div>
                <div className={styles.listRight}>
                    <div className={styles.info}>
                        <span className={styles.infoLeft}>{data && data.name}</span>
                        <span className={styles.infoTime}>{
                            dataLive && dataLive.update && moment(dataLive.update).format('HH:mm:ss')
                            ||
                            data && data.update && moment(data.update).format('HH:mm:ss')
                        }</span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.infoLeft} style={{fontSize: '22px'}}>
                            {
                                dataLive && dataLive.state && formatMessage({ id: `device.${dataLive.state}` })
                                ||
                                data && data.state && formatMessage({ id: `device.${data.state}` })
                            }
                        </span>
                        <span className={styles.infoTime}>
                        {
                            dataLive && dataLive.start && timeToMillion(dataLive.start, true)
                            ||
                            data && data.start && timeToMillion(data.start, true)
                        }
                        </span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.infoLeft} style={{fontSize: '22px'}}>{data && data.work && data.work.name || '暂无工单'}</span>
                        <span className={styles.infoTime}>{data && data.work && `${data.work.valid}/${data.work.quantity} ${unitMap[data.work.unit]}`}</span>
                    </div>
                    <div className={styles.progress}>
                        <div className={styles.progressP}>
                            <div className={styles.progressC} style={{
                                width: `${((progressLive || progress) > 1 ? 1: (progressLive || progress)) * 100}%`
                            }}></div>
                        </div>
                        <div className={styles.progressText}>{
                            dataLive && `${dataLive.progress}/${dataLive.total}` ||
                            data && data.design && `${data.design.progress}/${data.design.total}`
                        }</div>
                    </div>

                    <div className={styles.reason}>
                        <div className={styles.offline}>断线:{data && data.breaks}</div>
                        <div className={styles.yield}>产量:{data && data.valid}</div>
                    </div>
                    <div className={styles.reason}>
                        <div className={styles.offline}>故障:{data && data.errors}</div>
                        <div className={styles.yield}>累计:{dataLive && dataLive.cumulation || data && data.cumulation}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DeviceItem;