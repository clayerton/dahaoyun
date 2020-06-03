import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage /* formatMessage */ } from 'umi-plugin-react/locale';
import { Spin, Tag, Menu, Icon, Avatar /* Tooltip, message */ } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
// import NoticeIcon from '../NoticeIcon';
// import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  render() {
    const {
      currentUser,
      // fetchingNotices,
      // onNoticeVisibleChange,
      onMenuClick,
      // onNoticeClear,
      theme,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="account">
          <Icon type="user" />
          <FormattedMessage id="menu.account.account" defaultMessage="account" />
        </Menu.Item>
        <Menu.Item key="password">
          <Icon type="edit" />
          <FormattedMessage id="menu.account.password" defaultMessage="modify password" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className} style={{height: 70,lineHeight: '70px'}}>
        {/* 消息 */}
        <div className={styles.notice}>
          <img src={require('@/assets/home/bell.png')} />
          <span>99</span>
        </div>
        {currentUser && currentUser ? (
          <Fragment>
            <HeaderDropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <span className={styles.name}>
                  {currentUser.name}
                  {/* {currentUser.mobile && currentUser.mobile.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')} */}
                </span>
              </span>
            </HeaderDropdown>
            <SelectLang />
          </Fragment>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
