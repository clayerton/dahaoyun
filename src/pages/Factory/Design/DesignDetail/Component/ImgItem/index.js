import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
import cnt from '@/assets/cnt.jpg';
import cxj from '@/assets/cxj.jpg';
import hzj from '@/assets/hzj.jpg';
import glv from '@/assets/pattern.png';
import { getImageUrl } from '@/services/factory/getImageUrl';
export default class ImgItem extends PureComponent {
  state = {
    img: null,
  };
  judgeImg = thumbnail => {
    if (thumbnail) {
      switch (thumbnail) {
        case 'glv':
          return glv;
        case 'cnt':
          return cnt;
        case 'dsb':
        case 'dst':
          return cxj;
        default:
          return hzj;
      }
    }
  };
  async componentWillReceiveProps(props) {
    let img = null;
    let items = props && props.DesIdDetail && props.DesIdDetail.image;
    let type = props && props.DesIdDetail && props.DesIdDetail.type;
    let thumbnail = Array.isArray(type) && type[0];
    if (items) img = await getImageUrl(items);
    if (!items) img = this.judgeImg(thumbnail);
    this.setState({
      img,
    });
  }
  render() {
    const { DesIdDetail } = this.props;
    const { img } = this.state;

    return (
      <Fragment>
        <div className={styles.right}>
          <img src={img} alt={''} />
        </div>
      </Fragment>
    );
  }
}
