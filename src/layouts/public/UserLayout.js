import React, { Component, Fragment } from 'react';
// import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Button } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
// import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '@/assets/logo-blue.png';
import logoh from '@/assets/logo.png';
import getPageTitle from '@/utils/getPageTitle';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 北京大豪科技股份有限公司
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;

    const titleHeader = (
      <div className={styles.headerTop}>
        <div className={styles.header_l}>
          <img className={styles.header_l_logo} src={logoh} alt="" />
          <span className={styles.header_l_title} style={{ color: 'white' }}>
            大豪云
          </span>
        </div>
        <div className={styles.header_r}>
          <p className={styles.header_r_p}>
            <Link to="/">
              <Button>首页</Button>
            </Link>
          </p>
        </div>
      </div>
    );

    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          {titleHeader}
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                {/* <Link to="/"> */}
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>大豪云平台</span>
                {/* </Link> */}
              </div>
            </div>
            {children}
          </div>
          <GlobalFooter copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
