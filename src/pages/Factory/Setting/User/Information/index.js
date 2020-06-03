import React, { PureComponent } from 'react';

import { connect } from 'dva';
@connect(({ user }) => ({
    userInfo: user.userInfo,
}))
class Setting extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        const id = localStorage.getItem('userId');
        dispatch({
            type: 'user/fetchUserOne',
            payload: {
                id,
            }
        })
    }
    onEditUser = () => {
        
    }
    render() {
        const { userInfo } = this.props;
        const {name, real, email, role, department, company} = userInfo || {};
        return (
            <div>
                <div>用户名: {name} <span onClick={this.onEditUser}>修改用户名</span></div>
                <div>姓名: {real}</div>
                <div>邮箱: {email} <span>修改邮箱</span></div>
                <div>角色: {role}</div>
                <div>部门: {department}</div>
                <div>公司: {company}</div>
                <div>用户代码: {}</div>

            </div>
        )
    }

}
export default Setting;