import React, { PureComponent } from 'react';
import styles from './index.less';
import wj from '@/assets/wj.png';
import empty from '@/assets/dashboard/empty.png';
import cxj_device from '@/assets/cxj_device.jpeg';
import moment from 'moment';
import time from '@/assets/dashboard/time.png';
import { formatMessage } from 'umi-plugin-react/locale';
import { timeToMillion } from '@/utils/timeToMillion';
import { assignAll } from 'lodash-decorators/utils';
import { isInteger } from '@/utils/isInteger';
import { unitMap } from '@/utils/parameter';

const color = {
  none: null,
  run: '#2f4c2e',
  error: '#ae3d1f',
  offline: '#666666',
  stop: '#ae3d1f',
};
class DeviceItem extends PureComponent {
  item = (value, name) => {
    return (
      <div className={styles.info}>
        <p>{value}</p>
        <div />
        <span>{name}</span>
      </div>
    );
  };
  render() {
    const { imgUrl, data, live, key } = this.props;
    const dataLive = live && live[0];
    const progress =
      (data && data.design && data.design.total && data.design.progress / data.design.total) || 0;
    const progressLive = (dataLive && dataLive.total && dataLive.progress / dataLive.total) || 0;
    const width = (progressLive || progress) > 1 ? 1 : progressLive || progress;
    const max_width = progressLive || progress;
    return (
      <div
        key={key}
        className={styles.list}
        style={{ background: (dataLive && color[dataLive.state]) || (data && color[data.state]) }}
      >
        <div className={styles.listTop}>
          <div className={styles.listTopLeft}>
            <div className={styles.timeAll}>
              <img src={time} />
              <span>
                {(dataLive && dataLive.start && timeToMillion(dataLive.start, true)) ||
                  (data && data.start && timeToMillion(data.start, true))}
              </span>
            </div>
            <div className={styles.progressTotal}>
              <div className={styles.progressAll}>
                <div className={styles.progress} style={{ width: `${100 * width}%` }}></div>
              </div>
              <span>{`${isInteger(100 * max_width)}%`}</span>
            </div>
          </div>
          <div className={styles.listTopRight}>
            <div className={styles.imgDiv}>
              <img src={imgUrl || empty} />
            </div>
            <p>{(dataLive && dataLive.design) || (data && data.design && data.design.name)}</p>
          </div>
        </div>
        <div className={styles.listBottom}>
          <div className={styles.contentBox}>
            {this.item(data && data.name, formatMessage({ id: 'product.name' }))}
            {this.item(
              (dataLive && dataLive.rpm) || (data && data.rpm),
              formatMessage({ id: 'rotating.speed' })
            )}
          </div>
          <div className={styles.contentBox}>
            {this.item(
              (dataLive && dataLive.update && moment(dataLive.update).format('HH:mm:ss')) ||
                (data && data.update && moment(data.update).format('HH:mm:ss')),
              formatMessage({ id: 'update.time' })
            )}
            {this.item(
              (dataLive && `${dataLive.progress}/${dataLive.total}`) ||
                (data && data.design && `${data.design.progress}/${data.design.total}`),
              formatMessage({ id: 'parameter.stitches' })
            )}
          </div>
          <div className={styles.contentBox}>
            {this.item(data && data.breaks, formatMessage({ id: 'broken.line' }))}
            {this.item(data && data.valid, formatMessage({ id: 'output' }))}
          </div>
          <div className={styles.contentBox}>
            {this.item(data && data.errors, formatMessage({ id: 'device.error' }))}
            {this.item(
              (dataLive && dataLive.cumulation) || (data && data.cumulation),
              formatMessage({ id: 'grand.total' })
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default DeviceItem;
