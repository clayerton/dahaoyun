import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Icon } from 'antd';
import logo from '@/assets/logo-blue.png';
import GlobalFooter from '@/components/GlobalFooter';
import Header from '@/components/Header';
// import SelectLang from '@/components/SelectLang';
import styles from './CommonLayout.less';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 北京大豪科技股份有限公司
  </Fragment>
);

class CommonLayout extends Component {
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

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'logout') {
      dispatch({
        type: 'user_global/logout',
      });
    }
  };

  render() {
    const {
      children,
      route: { routes },
    } = this.props;

    const showCloud = localStorage.getItem('userId');
    const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const factory = localStorage.getItem('company')
      ? JSON.parse(localStorage.getItem('company'))
      : null;
    const pathName = routes && routes[0] ? routes[0].path : '';
    const params = {
      showCloud,
      userName,
      logo,
      pathName,
      factory,
      handleMenuClick: this.handleMenuClick,
    };

    const content = <Fragment>{children}</Fragment>;

    return (
      <div className={styles.container}>
        {/* <Header {...params} /> */}
        {content}
        {/* <GlobalFooter copyright={copyright} /> */}
      </div>
    );
  }
}

export default connect(({ menu: menuModel, user }) => ({
  user,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(CommonLayout);
