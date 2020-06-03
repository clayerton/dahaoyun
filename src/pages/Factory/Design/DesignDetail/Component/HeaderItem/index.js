import React from 'react';
import styles from './index.less'
function HeaderItem(props) {
    return (
        <div className={styles.title}>
            <span className={styles.textInfo}>{props.title}</span>
            {props.children}
        </div>
    )
}
export default HeaderItem;