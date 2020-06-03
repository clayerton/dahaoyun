import React from 'react';
import styles from '../style.less';

const Statistics = props => {
    const { img, name, count } = props;
    return (
        <div className={styles.statistics}>
            <div className={styles.imgBox}>
                <img src={img} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{name}</div>
                <div className={styles.count}>{count}</div>
            </div>
        </div>
    )
}
export default Statistics;