import { Form, Input } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import Link from 'umi/link';
import styles from './Login.less';
const mapDispatchToProps = dispatch => {
    return {
        login: (payload, callback) => dispatch({ type: 'user_global/login', payload, callback }),
    };
};
@connect(
    ({ user, login, loading }) => ({
        user,
        login,
        submitting: loading.effects['user/login'],
    }),
    mapDispatchToProps
)
@Form.create()
class LoginPage extends Component {
    componentDidMount() { }
    handleSubmit = e => {
        e.preventDefault();
        const { form, login } = this.props;
        form.validateFields({ force: true }, (err, values) => {
            if (!err) {
                login({ ...values });
            }
        });
    };
    render() {
        const { submitting, login, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.loginTitle}>欢迎登录大豪云平台</div>
                    <div className={styles.loginLogo}>
                        <img src={require('@/assets/home/loginBg.png')} />
                    </div>
                </div>
                <div className={styles.right}>
                    <Form name="normal_login">
                        <Form.Item
                            name="username"
                            className={styles.userInfo}
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            {getFieldDecorator('user', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入手机号或用户名',
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <img
                                            style={{ width: 28, height: 30 }}
                                            src={require('@/assets/home/user.png')}
                                        />
                                    }
                                    autoComplete="off"
                                    type="username"
                                    className={styles.user}
                                    placeholder="请输入手机号或用户名"
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            name="password"
                            className={styles.userInfo}
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入登录密码',
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <img
                                            style={{ width: 28, height: 30 }}
                                            src={require('@/assets/home/password.png')}
                                        />
                                    }
                                    autoComplete="off"
                                    type="password"
                                    placeholder="请输入登录密码"
                                />
                            )}
                        </Form.Item>
                        <div className={styles.forgetPass}><Link to="/user/forgotPwd">忘记密码？</Link></div>
                        <div onClick={this.handleSubmit} loading={submitting} className={styles.onLogin}>
                            立即登录
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default LoginPage;
