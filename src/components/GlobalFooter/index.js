import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-react/locale';

const GlobalFooter = ({ className }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {/* {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )} */}
      <div className={styles.copyright}>
        <div style={{ padding: '15px' }}>
          {formatMessage({ id: 'concat.us' })}：010-59248888
          <span style={{ marginLeft: '15px' }}>
            {formatMessage({ id: 'web.name' })}： www.dahaobj.com
          </span>
        </div>
        <span>
          {formatMessage({ id: 'rights.reserve' })} <Icon type="copyright" />{' '}
          {formatMessage({ id: 'company.name' })}
        </span>
        <span style={{ marginLeft: '15px' }}>{formatMessage({ id: 'icp.no' })}</span>
        <a
          target="_blank"
          className={styles.fillHref}
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502039768"
        >
          <img src={require('../../assets/public/filling_no.jpg')} />
          <span>{formatMessage({ id: 'filing.no' })}</span>
        </a>
      </div>
    </footer>
  );
};

export default GlobalFooter;
