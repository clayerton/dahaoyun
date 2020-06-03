import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { setCaptchaTime, getCaptchaTime } from '@/utils/captcha';
import { connect } from 'dva';
import styles from './PhoneWithCode.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

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

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class PhoneWithCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      count: 0,
      prefix: '86',
    };
  }

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  onGetCaptcha = () => {
    const { form, sendCode } = this.props;
    if (form.getFieldError('mobile')) {
      return;
    }
    sendCode({ mobile: form.getFieldValue('mobile') }, () => {
      this.runningTime(59);
    });
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

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix } = this.state;

    return (
      <>
        <FormItem>
          <InputGroup compact>
            <Select
              size="large"
              value={prefix}
              onChange={this.changePrefix}
              style={{ width: '20%' }}
            >
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
            {getFieldDecorator('mobile', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
                {
                  pattern: /^1[0-9]{10}$/,
                  message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                },
              ],
            })(
              <Input
                size="large"
                style={{ width: '80%' }}
                placeholder={formatMessage({ id: 'register.phone.placeholder' })}
              />
            )}
          </InputGroup>
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('sms', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.verification-code.required' }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
                />
              )}
            </Col>
            <Col span={8}>
              <Button
                size="large"
                type="primary"
                disabled={count}
                className={styles.getCaptcha}
                onClick={this.onGetCaptcha}
                loading={submitting}
              >
                {count ? `${count} s` : formatMessage({ id: 'app.register.get-verification-code' })}
              </Button>
            </Col>
          </Row>
        </FormItem>
      </>
    );
  }
}
