import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Button } from 'antd';
import PhoneWithCode from '@/components/AuthRegister/PhoneWithCode';
import styles from './Register_new.less';

const FormItem = Form.Item;

const mapDispatchToProps = dispatch => {
  return {
    resetPwd: (payload, callback) =>
      dispatch({ type: 'user_global/updatePassword', payload, callback }),
  };
};

@connect(
  ({ user_global, loading }) => ({
    user: user_global,
    submitting: loading.effects['user_global/updatePassword'],
  }),
  mapDispatchToProps
)

@Form.create()
class ForgotPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toNext: null,
    };
  }

  _step1Submit = e => {
    e.preventDefault();
    const {
      form,
      resetPwd,
      user: { bSend },
    } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err && bSend) {
        this.setState({ toNext: values });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, resetPwd } = this.props;
    const { toNext } = this.state;
    form.validateFields({ force: true }, (err, values) => {
      console.log(values)
      if (!err) {
        resetPwd({ ...values, ...toNext }, () => router.push('/user/login'));
      }
    });
  };

  render() {
    const { form, submitting, dispatch } = this.props;
    const { getFieldDecorator } = form;
    const { toNext } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.title}>重置密码</div>
        <Form className={styles.registerForm} >
          <PhoneWithCode form={form} dispatch={dispatch} />
          <FormItem>
            <div className={styles.submit} loading={submitting} onClick={this.handleSubmit}>
              确定
            </div>
            <div className={styles.toLogin}>
              <Link to="/user/login">
                <span>返回到登录页面</span>
              </Link>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default ForgotPwd;
