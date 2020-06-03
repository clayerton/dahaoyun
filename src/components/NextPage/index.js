import React, { Fragment } from 'react';
import styles from './index.less';
export default function NextPage(props) {
    const {nextPage, onClickMore} = props;
    const  _onClickMore = () =>{
        onClickMore && onClickMore();
    }
    return (
        <Fragment>
            {nextPage && (
                <div onClick={_onClickMore} className={styles.more}>
                    加载更多
                </div>
            )}
        </Fragment>

    )
}