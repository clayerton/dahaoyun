import React from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Progress, Popover } from 'antd';
import styles from './PasswordWithConfirm.less';

const FormItem = Form.Item;

export default class PasswordWithConfirm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 7) {
      return 'ok';
    }
    if (value && value.length > 3) {
      return 'pass';
    }
    return 'poor';
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        // help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback(formatMessage({ id: 'validation.password.required' }));
    } else {
      // this.setState({
      //   help: '',
      // });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 4) {
        callback(formatMessage({ id: 'validation.password.strength.short' }));
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { visible } = this.state;

    return (
      <>
        <FormItem>
          {/* <Popover
            getPopupContainer={node => node.parentNode}
            content={
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[this.getPasswordStatus()]}
                {this.renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <FormattedMessage id="validation.password.strength.msg" />
                </div>
              </div>
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          > */}
          {getFieldDecorator('password', {
            rules: [
              {
                validator: this.checkPassword,
              },
            ],
          })(
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({ id: 'register.password.placeholder' })}
            />
          )}
          {/* </Popover> */}
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
              size="large"
              type="password"
              placeholder={formatMessage({ id: 'register.confirm.placeholder' })}
            />
          )}
        </FormItem>
      </>
    );
  }
}

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
