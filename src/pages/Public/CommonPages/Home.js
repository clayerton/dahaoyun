import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import logo from '@/assets/logo-blue.png';

import GlobalFooter from '@/components/GlobalFooter';
import Header from '@/components/Header';
import styles from './Home.less';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 北京大豪科技股份有限公司
  </Fragment>
);
@connect(({ menu: menuModel, user }) => ({
  user,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))
class Home extends PureComponent {
  // state = {
  //   status: 'login',

  // }

  componentDidMount() {
    // const {
    //   dispatch,
    //   route: { routes, authority },
    // } = this.props;
    // dispatch({
    //   type: 'menu/getMenuData',
    //   payload: { routes, authority },
    // });
  }

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'logout') {
      dispatch({
        type: 'user_global/logout',
      });
    }
  };

  // judgeStatus = () => {
  //   const { status } = this.state;
  //   if (status === 'login') {
  //     router.push('/cloud/my-company');
  //   }
  //   if (status === 'apply') {
  //     router.push('/user/login');
  //   }
  //   if (status === 'sta') {
  //     router.push('/user/login');
  //   }
  // }

  render() {
    const {
      children,
      route: { routes },
    } = this.props;
    console.log(children);
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

    return (
      <div className={styles.main}>
        <Header {...params} />
        <div className={styles.contentMenu}>
          <img src={require('@/assets/background.png')} />
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}

export default Home;
