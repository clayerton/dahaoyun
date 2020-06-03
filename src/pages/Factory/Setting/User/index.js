import React, { useEffect, useState }  from 'react';
import router from 'umi/router';
import styles from './index.less';
import {userMenu} from '../menu';
export default function UserSetting(props){
    const [tabActiveKey, setTabActiveKey] = useState(null);
    useEffect(() => {
        const { location, match } = props;
        let pathname = location.pathname, matchName = match.path;
        let tabActiveKey = pathname.replace(`${matchName}/`, '');
        setTabActiveKey(tabActiveKey)
    }, [])
    const onHandleTo = (item) => {
        router.push(item.router);
        setTabActiveKey(item.type)
    }
    const { children } = props;
    return (
        <div className={styles.setting}>
            <div className={styles.menu}>
                {
                    userMenu.map((v, i) => {
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