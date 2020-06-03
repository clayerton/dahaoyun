import add from '@/assets/common/add.png';
import { Cascader } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.less';

class Header extends PureComponent {
    onChange = value => {
        const { onChangeSelect } = this.props;
        let format = value[value.length - 1];
        onChangeSelect && onChangeSelect(format);
    };
    onClick = () => {
        const { onHandleClick } = this.props;
        onHandleClick && onHandleClick();
    }
    render() {
        const { department, children } = this.props;
        return (
            <div className={styles.header}>
                <div className={styles.left}>
                    <Cascader
                        options={department}
                        onChange={this.onChange}
                        placeholder={['全部车间']}
                        changeOnSelect
                    />
                    {children}
                </div>
                <div onClick={this.onClick} className={styles.right}>
                    <img src={add} />
                    <span>新 增</span>
                </div>
            </div>
        );
    }
}
export default Header;
