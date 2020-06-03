import React from 'react';
import styles from './index.less';
import router from 'umi/router';

function Item(props) {
    const { name, group, price, unit, imgUrl } = props;
    const onHandleDetail = () => {
        router.push('/factory/market/product/product-detail',{name});
    }
    return (
        <div className={styles.item} onClick={onHandleDetail}>
            <div className={styles.group}>
                <span>{group}</span>
            </div>
            <div className={styles.img}>
                <img src={imgUrl || null} />
            </div>
            <div className={styles.info}>
                <span className={styles.name}>{name}</span>
                <span className={styles.price}>¥{price}元/{unit}</span>
            </div>
        </div>
    )
}
export default Item;