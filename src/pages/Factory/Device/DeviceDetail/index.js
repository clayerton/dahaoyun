import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import styles from './index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const menu = [
    {
        type: 'detail',
        name: '详情',
    },
    {
        type: 'statistics',
        name: '状态统计',
    },
    {
        type: 'record',
        name: '状态记录',
    },
    {
        type: 'design',
        name: '花样',
    },
    {
        type: 'yield',
        name: '产量',
    },
];
export default function UserSetting(props) {
    const [tabActiveKey, setTabActiveKey] = useState(null);
    useEffect(() => {
        const { location, match } = props;
        let pathname = location.pathname, matchName = match.path;
        let tabActiveKey = pathname.replace(`${matchName}/`, '');
        setTabActiveKey(tabActiveKey)
    }, [])
    const onHandleTo = (item) => {
        const { location, match } = props;
        router.push(`/factory/produce/device/info/${item.type}${location.search}`);
        setTabActiveKey(item.type)
    }
    const { children } = props;
    return (
        <div className={styles.box}>
            <div className={styles.menu}>
                {
                    menu.map((v, i) => {
                        return (
                            <div
                                key={i}
                                className={`${styles.menuTab} ${tabActiveKey === v.type && styles.selectMenu || null}`}
                                onClick={onHandleTo.bind(this, v)}
                            >
                                {v.name}
                            </div>
                        )
                    })
                }
                <div className={styles.right}>
                    <span onClick={()=>router.push('/factory/produce/device')}>生产   >>   设备   >>   详情</span>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}