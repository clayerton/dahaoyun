import { getCaptchaTime, setCaptchaTime } from '@/utils/captcha';
import { Button, Form, Input } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './PhoneWithCode.less';

const FormItem = Form.Item;
const mapStateToProps = ({ user_global, loading }) => {
  return {
    bCount: user_global.bCount,
    submitting: loading.effects['register/getSms'],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendCode: (payload, callback) => dispatch({ type: 'user_global/getSms', payload, callback }),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class PhoneWithCode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  checkPassword = (rule, value, callback) => {
    if (value && value.length < 4) {
      callback(formatMessage({ id: 'validation.password.strength.short' }));
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };
  runningTime = count => {
    let knock = count;
    this.setState({ count: knock });
    setCaptchaTime(knock, Date.parse(new Date()));
    this.interval = setInterval(() => {
      this.setState({ count: (knock -= 1) });
      setCaptchaTime(knock, Date.parse(new Date()));
      if (knock === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
  componentDidMount() {
    if (getCaptchaTime(Date.parse(new Date())) > 0) {
      this.runningTime(getCaptchaTime(Date.parse(new Date())));
    }
  }

  componentWillUnmount() {
    const { count } = this.state;
    setCaptchaTime(count, Date.parse(new Date()));
  }
  onGetCaptcha = () => {
    const { form, sendCode } = this.props;
    let value = form.getFieldValue('mobile');
    if (!value || form.getFieldError('mobile')) {
      return;
    }

    sendCode({ mobile: value }, () => {
      this.runningTime(59);
    });
  };
  onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };
  render() {
    const { form, submitting } = this.props;
    const { count } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form className={styles.main}>
        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[0-9]{10}$/,
                message: '手机号格式错误！',
              },
            ],
          })(<Input autoComplete='off' placeholder={'请输入手机号'} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
              {
                validator: this.checkPassword,
              },
            ],
          })(<Input type="password" placeholder={'请设置新的登录密码'} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.confirm-password.required' }),
              },
              {
                validator: this.checkConfirm,
              },
            ],
          })(
            <Input
              type="password"
              placeholder={formatMessage({ id: 'register.confirm.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem style={{ height: 56 }} className={styles.sms}>
          {getFieldDecorator('sms', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.verification-code.required' }),
              },
            ],
          })(
            <Input
              className={styles.smsInput}
              placeholder={'请输入六位验证码'}
            />
          )}
          <Button
            type="primary"
            disabled={count}
            className={styles.getCaptcha}
            onClick={this.onGetCaptcha}
            loading={submitting}
          >
            {count ? `${count} s` : '发送短信验证码'}
          </Button>
        </FormItem>
      </Form>
    );
  }
}
export default PhoneWithCode;
