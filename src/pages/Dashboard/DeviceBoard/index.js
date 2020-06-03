import React, { PureComponent } from 'react';
import router from 'umi/router'
import { connect } from 'dva';
import styles from './index.less';
import { Button } from 'antd';
import screenWidth from './variable';
import DeviceItem from './DeviceItem';
import { getImageUrl } from '@/services/factory/getImageUrl';
import cxj from '@/assets/cxj.jpg';
import hzj from '@/assets/hzj.jpg';
import glv from '@/assets/pattern.png';
import stj from '@/assets/stj.png';
import wj from '@/assets/wj.png';
// import {compare} from '@/util/compareTarget'
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
        count: 12,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { sn, page, count } = this.state;
        this.deviceFetch();
        this.timerDevice = setInterval(
            () => {
                this.deviceFetch();
            },
            30000
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
                let length = deviceList && Math.floor(deviceList.total / 12);
                let yu = deviceList && deviceList.total && Math.ceil(deviceList.total % 12) || 0;
                if(page<length){
                    if(page===length-1 &&yu===0) {
                        this.setState(prevState=>{
                            return {
                                page: 0,
                            }
                        }) 
                    }else {
                        this.setState(prevState=>{
                            return {
                                page: prevState.page + 1,
                            }
                        }) 
                    }

                }else {
                    this.setState(prevState=>{
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
        const singleHeight = (screenWidth.winWidth - 161) / 4 * 64 / 88;
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
                    <div className={styles.list} style={{ height: singleHeight }} key={`${i}${j}`} >
                        <DeviceItem
                            data={item && item[index]}
                            live={live}
                            imgUrl={imgUrl && imgUrl[index]}
                        />
                        {/* {item && item[index]} */}
                    </div>
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
                    <div className={styles.list} style={{ height: singleHeight }} key={`${i}${j}`} >
                        <DeviceItem
                            data={item && item[index]}
                            live={live}
                            imgUrl={imgUrl && imgUrl[index]}
                        />
                        {/* {item && item[index]} */}
                    </div>
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
                <div key={i} className={styles.line}>
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
        switch (type) {
            case 'glove':
                return glv;
            // case 'embroidery':
            //     return cxj;
            // case 'sock':
            //     return wj;
            // case 4:
            //     return stj;
            // case 8:
            //     return hzj;
            default:
                return null;
        }
    };

    render() {
        const { deviceList, deviceLive } = this.props;
        const deviceTotal = deviceList && deviceList.total;
        const deviceItem = deviceList && deviceList.items;
        const deviceLength = deviceList && deviceList.items && deviceList.items.length;


        const singleHeight = (screenWidth.winWidth - 161) / 4 * 64 / 88;
        return (
            <div className={styles.content}>
                <div className={styles.main}>
                    {
                        this.deviceList(deviceLength, deviceItem)
                    }
                    {/* <div className={styles.line}>
                        <div className={styles.list} style={{ height: singleHeight, background: color.run }}>
                            <DeviceItem />
                        </div>
                        <div className={styles.list} style={{ height: singleHeight, background: color.error }}></div>
                        <div className={styles.list} style={{ height: singleHeight, background: color.offline }}></div>
                        <div className={styles.list} style={{ height: singleHeight, background: color.stop }}></div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.list} style={{ height: singleHeight, background: color.run }}></div>
                        <div className={styles.list} style={{ height: singleHeight, background: color.run }}></div>
                        <div className={styles.list} style={{ height: singleHeight, background: color.run }}></div>
                        <div className={styles.list} style={{ height: singleHeight, background: color.run }}></div>
                    </div> */}

                </div>
            </div>
        )
    }
}