import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { systemMenu } from '../menu';
import styles from './index.less';

function SystemSetting(props) {
    const [tabActiveKey, setTabActiveKey] = useState(null);
    const { children } = props;
    const onHandleTo = (item) => {
        router.push(item.router);
        setTabActiveKey(item.type)
    }
    useEffect(() => {
        const { location, match } = props;
        let pathname = location.pathname, matchName = match.path;
        let tabActiveKey = pathname.replace(`${matchName}/`, '');
        setTabActiveKey(tabActiveKey)
    }, [])
    return (
        <div className={styles.setting}>
            <div className={styles.menu}>
                {
                    systemMenu.map((v, i) => {
                        return (
                            <div
                                key={i}
                                className={tabActiveKey === v.type && styles.selectMenu || null}
                                onClick={onHandleTo.bind(this, v)}
                            >
                                {v.name}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
export default SystemSetting;