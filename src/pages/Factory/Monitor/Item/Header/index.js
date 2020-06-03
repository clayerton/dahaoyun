import React from 'react';
import router from 'umi/router';
import styles from './index.less';

const Header = (props) => {
    const { title, routerTo, to } = props;
    const _onClick = () => {
        to && router.push({
            pathname: to,
        });
    }
    return (
        <div className={styles.header}>
            <span className={styles.left}>
                {title}
            </span>
            <div onClick={_onClick}  className={styles.more}>
                <span />
                <span />
                <span />
            </div>
        </div>
    )
}
export default Header;