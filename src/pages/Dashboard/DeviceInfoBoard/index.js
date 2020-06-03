import React, { PureComponent } from 'react';
import router from 'umi/router'
import { connect } from 'dva';
import styles from './index.less';
import { Button } from 'antd';
import { getImageUrl } from '@/services/factory/getImageUrl';
import glv from '@/assets/pattern.png';
import time from '@/assets/dashboard/time.png';
import empty from '@/assets/dashboard/empty.png';
import A98 from '@/assets/device/d_A98.jpg'
import M98 from '@/assets/device/d_M98.jpg'
import A18A58 from '@/assets/device/d_A18-A58.jpg'
import A15 from '@/assets/device/A15.jpg'
import DeviceItem from './DeviceItem';
@connect(({ kanBan, loading }) => ({
    deviceList: kanBan.deviceList,
    deviceLive: kanBan.deviceLive,
    loading: loading.effects['kanBan/deviceList'],
}))
export default class DashBoard extends PureComponent {
    state = {
        imgUrl: [],
        sn: [],
        page: 0,
        count: 8,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { sn, page, count } = this.state;
        this.deviceFetch();
        this.timerDevice = setInterval(
            () => {
                this.deviceFetch();
            },
            10000
        );
        this.timerLive = setInterval(
            () => {
                this.deviceLive();
            },
            1000
        );
    }

    deviceFetch = () => {
        const { dispatch, deviceList } = this.props;
        const { sn, page, count } = this.state;
        dispatch({
            type: 'kanBan/deviceList',
            payload: {
                page,
                count,
            },
            callback: () => {
                let length = deviceList && Math.floor(deviceList.total / 8);
                let yu = deviceList && deviceList.total && Math.ceil(deviceList.total % 8) || 0;
                if (page < length) {
                    if (page === length - 1 && yu === 0) {
                        this.setState(prevState => {
                            return {
                                page: 0,
                            }
                        })
                    } else {
                        this.setState(prevState => {
                            return {
                                page: prevState.page + 1,
                            }
                        })
                    }

                } else {
                    this.setState(prevState => {
                        return {
                            page: 0,
                        }
                    })
                }
            }
        });
    }
    deviceLive = () => {
        const { dispatch } = this.props;
        const { sn } = this.state;
        dispatch({
            type: 'kanBan/deviceLive',
            payload: {
                sn: sn,
            }
        });
    }
    async componentWillReceiveProps(nextProps) {
        let img = [], sn = [];
        const { dispatch } = this.props;
        let aaa = JSON.stringify(nextProps.deviceList) === JSON.stringify(this.props.deviceList);
        if (aaa) return;
        let items = nextProps && nextProps.deviceList && nextProps.deviceList.items;
        items && await Promise.all(items.map(async (item, index) => {
            sn.push(item.sn)
            if (item.design.thumbnail) {
                img[index] = await getImageUrl(item.design.thumbnail);
            } else {
                img[index] = this.judgeImg(item)
            }
        }))
        this.setState({
            imgUrl: img,
            sn,
        })

    }
    componentWillUnmount() {
        this.timerDevice && clearTimeout(this.timerDevice);
        this.timerLive && clearTimeout(this.timerLive);
    }
    itemCeil = (item, line, i, remainder, length) => {
        const { imgUrl } = this.state;
        const { deviceLive } = this.props;
        let ceil = [];
        if ((i < line - 1) || (remainder === 0 && length >= 4)) {
            for (let j = 0; j < 4; j++) {
                let index = 4 * i + j;
                let live = []
                try {
                    live = deviceLive.length > 0 && deviceLive.filter((v, i) => v.sn === (item && item[index]).sn);
                } catch (e) {

                }
                ceil.push(
                    <DeviceItem
                        key={`${i}${j}`}
                        data={item && item[index]}
                        live={live}
                        imgUrl={imgUrl && imgUrl[index]}
                    />
                )
            }
        } else {
            for (let j = 0; j < remainder; j++) {
                let index = 4 * i + j;
                let live = []
                try {
                    live = deviceLive.length > 0 && deviceLive.filter((v, i) => v.sn === (item && item[index]).sn);
                } catch (e) {

                }
                ceil.push(
                    <DeviceItem
                        key={`${i}${j}`}
                        data={item && item[index]}
                        live={live}
                        imgUrl={imgUrl && imgUrl[index]}
                    />
                )
            }
        }
        return ceil;
    }

    deviceList = (length, item) => {
        let itemRender = [];
        if (!item) return [];
        let line = Math.ceil(length / 4); //行数
        let remainder = length % 4; //余数
        for (let i = 0; i < line; i++) {
            itemRender.push(
                <div key={i} className={styles.box}>
                    {
                        this.itemCeil(item, line, i, remainder, length)
                    }
                </div>
            )
        }
        return itemRender;
    }

    judgeImg = (item) => {
        const { imgUrl } = this.state;
        let type = item && item.type;
        if(item.type==='embroidery') {
            if(item.model==='A15') return A15;
            if(item.model==='A98') return A98;
            if(item.model==='M98') return M98;
            if(item.model==='A18'||item.model=== 'A58') return A18A58;
          }
        switch (type) {
            case 'glove':
                return glv;
            default:
                return A98;
        }
    };

    render() {
        const { deviceList, deviceLive } = this.props;
        const deviceTotal = deviceList && deviceList.total;
        const deviceItem = deviceList && deviceList.items;
        const deviceLength = deviceList && deviceList.items && deviceList.items.length;
        return (
            <div className={styles.content}>
                <div className={styles.main}>
                    {
                        this.deviceList(deviceLength, deviceItem)
                    }
                </div>
            </div>
        )
    }
}