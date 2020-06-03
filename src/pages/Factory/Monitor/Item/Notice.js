import React from 'react';
import styles from '../style.less';
import Header from './Header';
import bell_blue from '@/assets/home/bell_blue.png';
import bell from '@/assets/home/bell.png';

const Notice = props => {
    const items = props && props.items;
    return (
        <div className={styles.notice}>
            <Header title={'通知事项'} />
            <div className={styles.content}>
                {
                    items && items.map((v, i) => {
                        return (
                            <div key={i} className={styles.item}>
                                <div className={styles.itemText}>
                                    <img src={v.read ? bell_blue : bell} />
                                    <span className={!v.read && styles.read || null}>{v.title}窗外的柳丁的沙子</span>
                                </div>
                                <a>#查看详情</a>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
export default Notice;