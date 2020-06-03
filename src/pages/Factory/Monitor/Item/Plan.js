import { isInteger } from '@/utils/isInteger';
import React from 'react';
import styles from '../style.less';
import Header from './Header';
const bg = ['#4430d5', '#0072ff', '#1a9805', '#d530c7', '#e77608'];
const Plan = props => {
    const items = props && props.items;
    return (
        <div className={styles.plan}>
            <Header title={'款型进度'} />
            <div className={styles.content}>
                {
                    items && items.map((v, i) => {
                        let process = 0;
                        if (v.valid > 0)
                            process = v.total && (Math.abs(v.valid) / v.total * 100 <= 100 ? Math.abs(v.valid) / v.total * 100 : 100);
                        return (
                            <div key={i} className={styles.item}>
                                <div className={styles.itemCount}>
                                    <span className={styles.title}>{v.product}</span>
                                    <span>{isInteger(v.valid)}/{isInteger(v.total)}&nbsp;{v.unit}</span>
                                </div>
                                <div className={styles.progress}>
                                    <div className={styles.process} style={{ width: process + '%' }}></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
export default Plan;