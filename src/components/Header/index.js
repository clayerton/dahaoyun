import React, { PureComponent } from 'react';
import { FormattedMessage /* formatMessage */ } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Button, Menu, Icon, Avatar } from 'antd';
import HeaderDropdown from '@/components/HeaderDropdown';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-react/locale';

export default class Header extends PureComponent {
  /* eslint-disable*/
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { logo, showCloud, userName, handleMenuClick, pathName, factory } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={handleMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    // console.log(this.props,111)
    return (
      <div style={{ background: '#000120' }}>
        <div className={styles.header}>
          <div className={styles.header_l}>
            <Link to="/">
              <img className={styles.header_l_logo} src={logo} alt="" />
              <span className={styles.header_l_title} style={{ color: 'white' }}>
                {formatMessage({id: 'header.title'})}
              </span>
            </Link>
          </div>
          <div className={styles.header_r}>
            <div className={styles.header_r_p}>
              {showCloud !== null ? (
                <span>
                  {factory === null && (
                    <Link to="/cloud/my-company" className={styles.link}>
                      <Button>{formatMessage({id: 'cloud.company'})}</Button>
                    </Link>
                  )}
                  {factory !== null && factory.type === 'factory' && factory.state === 'apply' && (
                    <Link to="/cloud/inreview" className={styles.link}>
                      <Button>{formatMessage({id: 'cloud.company'})}</Button>
                    </Link>
                  )}
                  {factory !== null && factory.type === 'factory' && factory.state === 'normal' && (
                    <Link to="/factory" className={styles.link}>
                      <Button>{formatMessage({id: 'factory'})}</Button>
                    </Link>
                  )}
                  {factory !== null && factory.type === 'vendor' && factory.state === 'normal' && (
                    <Link to="/vendor" className={styles.link}>
                      <Button>{formatMessage({id: 'vendor'})}</Button>
                    </Link>
                  )}
                  {factory !== null && factory.type === 'factory' && factory.state === 'reject' && (
                    <Link to="/cloud/rejected" className={styles.link}>
                      <Button>{formatMessage({id: 'cloud.company'})}</Button>
                    </Link>
                  )}
                  <HeaderDropdown overlay={menu}>
                    <span className={styles.action}>
                      <Avatar size="small" className={styles.avatar} icon="user" alt="avatar" />
                      <span className={styles.name}>
                        {userName && userName.name !== null ? userName.name : userName.mobile}
                      </span>
                    </span>
                  </HeaderDropdown>
                </span>
              ) : (
                <span>
                  {pathName === '/user' ? (
                    <span>
                      <div className={styles.header_r}>
                        <div className={styles.header_r_p}>
                          <Link to="/">
                            <Button>{formatMessage({id: 'factory.menu.statistics.homepage'})}</Button>
                          </Link>
                        </div>
                      </div>
                    </span>
                  ) : (
                    <span>
                      <Link to="/user/login" className={styles.link}>
                        <Button>{formatMessage({id: 'menu.login'})}</Button>
                      </Link>
                      <Link to="/user/register">
                        <Button>{formatMessage({id: 'menu.register'})}</Button>
                      </Link>
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
