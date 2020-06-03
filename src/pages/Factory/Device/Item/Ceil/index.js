import A15 from '@/assets/device/A15.jpg';
import A18A58 from '@/assets/device/d_A18-A58.jpg';
import A98 from '@/assets/device/d_A98.jpg';
import M98 from '@/assets/device/d_M98.jpg';
import stj from '@/assets/stj.png';
import { isInteger } from '@/utils/isInteger';
import { deviceT } from '@/utils/statusType';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import styles from './index.less';

const ItemText = (props) => {
  const { left, right, type } = props;
  return (
    <div className={`${styles.content} ${type && styles.overflow}`}>
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  )
}
class DeviceCeil extends PureComponent {
  judgeImg = (type, model) => {
    if (type === 'embroidery') {
      if (model === 'A15') return A15;
      if (model === 'A98') return A98;
      if (model === 'M98') return M98;
      if (model === 'A18' || model === 'A58') return A18A58;
    }
    switch (type) {
      case 'glove':
        return stj;
      default:
        return A98;
    }
  };
  onSelectBg = (c, type = 'color') => {
    let device = deviceT.filter((v, i) => v.type === c) || null;
    let color = (device[0] && device[0][type]) || null;
    return color;
  };
  onHandleDetail = () => {
    const { id, name } = this.props;
    router.push(`/factory/produce/device/info/detail?id=${id}`, { id })
  }
  render() {
    const { name, user, utilize, state, type, workshop, worker, start, reason, model, id } = this.props;
    return (
      <div className={styles.ceil} onClick={this.onHandleDetail}>
        <div className={styles.left}>
          <div className={styles.img}>
            <img src={this.judgeImg(type, model)} />
          </div>
          <span className={styles.utilize}>{utilize && isInteger(utilize.ratio)}%</span>
        </div>
        <div className={styles.right}>
          <div className={styles.infoTop}>
            <div>
              <span className={styles.name}>{name}</span>
              {
                model && <span className={styles.type}>{model}</span>
              }
            </div>
            <span className={styles.status} style={{ background: this.onSelectBg(state) }}>
              {formatMessage({ id: `device.${state}` })}
            </span>
          </div>
          <ItemText left={`员工：${user || ''}`} right={`车间：${workshop}`} />
          <ItemText left={`更新：${start && moment(start).format('YYYY-MM-DD HH:mm:ss')}`} />
          <ItemText left={`原因：${reason || '无'}`} type={true} />
        </div>
      </div>
    );
  }
}
export default DeviceCeil;
