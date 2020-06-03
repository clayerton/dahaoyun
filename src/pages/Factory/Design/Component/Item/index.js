import cxj from '@/assets/cxj.jpg';
import hzj from '@/assets/hzj.jpg';
import glv from '@/assets/pattern.png';
import { isInteger } from '@/utils/isInteger';
import moment from 'moment';
import React from 'react';
import router from 'umi/router';
import styles from './index.less';
const ItemText = (props) => {
    const { left, right } = props;
    return (
        <div className={styles.item}>
            <span>{left}</span>
            {right && <span>{right}</span>}
        </div>
    )
}
function Item(props) {
    const {
        name,
        group,
        type,
        stitch,
        stitchPrice,
        created,
        deployed,
        imgUrl,
        thumbnail,
        onClickDetail,
        groupList
    } = props;
    const suffix = Array.isArray(type) && type[0];
    const price = stitchPrice && isInteger(stitchPrice * 10000);
    const _deleteDesign = () => {
        const { deleteDesign, name } = this.props;
        deleteDesign && deleteDesign(name);
    };
    const judgeImg = (type, thumbnail) => {
        const suffix = Array.isArray(type) && type[0];
        if (!thumbnail) {
            switch (suffix) {
                case 'glv':
                    return glv;
                case 'dst':
                case 'dsb':
                    return cxj;
                case 'cnt':
                case 'pat':
                    return hzj;
                default:
                    return null;
            }
        }
    };
    const _onClickDetail = () => {
        // if (!type.includes('dsb') && !type.includes('dst')) return;
        router.push({
            pathname: '/factory/produce/design-list/design-detail',
            state: { name, group: groupList },
        });
    };
    const _onClickWork = () => {
        router.push({
            pathname: '/factory/produce/design-list/deploy-list',
            state: { name },
        });
    }
    return (
        <div className={styles.item}>
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.img}>
                        <img src={imgUrl || judgeImg(type, thumbnail)} />
                    </div>
                    <span>{suffix}</span>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>
                        <span className={styles.name}>{name}</span>
                        <span style={{ background: deployed && '#1a9805' }} className={styles.status}>
                            {deployed ? '已排' : '未排'}
                        </span>
                    </div>
                    <ItemText left={`针数：${stitch || 0}针`} right={`分组：${group || '未分组'}`} />
                    <ItemText left={`创建：${created && moment(created).format('YYYY-MM-DD HH:mm:ss')}`} />
                    <ItemText left={`单价：${price || 0}元/万针`} />
                </div>
            </div>
            <div className={styles.features}>
                <span onClick={() => _onClickWork()} className={styles.nest}>排样</span>
                <span onClick={() => _onClickDetail()} className={styles.detail}>详情</span>
            </div>
        </div>
    )

}
export default Item;