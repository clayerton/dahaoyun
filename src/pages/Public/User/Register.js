import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import PhoneWithCode from '@/components/AuthRegister/PhoneWithCode';
import { Form, Button, Checkbox, Input } from 'antd';
import Link from 'umi/link';
import styles from './Register_new.less';
const FormItem = Form.Item;

const mapDispatchToProps = dispatch => {
  return {
    register: (payload, callback) => dispatch({ type: 'user_global/register', payload, callback }),
  };
};

@connect(
  ({ user, loading }) => ({
    user,
    submitting: loading.effects['user_global/register'],
  }),
  mapDispatchToProps
)
@Form.create()
class Register extends PureComponent {
  constructor(props) {
    super(props);
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, validateFields },
      register,
    } = this.props;
    console.log(111);
    validateFields((err, values) => {
      console.log(values, err, '11');
      if (!err) {
        register({ ...values }, () => router.push('/user/register'));
      }
    });
  };
  render() {
    const { form, submitting, dispatch, count } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <div className={styles.title}>欢迎注册大豪云平台</div>
        <Form className={styles.registerForm} onSubmit={this.handleSubmit}>
          <PhoneWithCode form={form} dispatch={dispatch} />
          <FormItem>
            <Checkbox className={styles.checkout} onChange={this.onChange}>
              我已阅读并同意<a>《大豪云用户协议》</a>和<a>《隐私政策协议》</a>
            </Checkbox>
            <Button type="primary" className={styles.submit} loading={submitting} htmlType="submit">
              立即注册
            </Button>
            <div className={styles.toLogin}>
              已有账号？
              <Link to="/user/login">
                <span>马上登录</span>
              </Link>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Register;
