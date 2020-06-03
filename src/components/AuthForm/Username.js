import React from 'react';
import { Form, Input } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const FormItem = Form.Item;

export default class Username extends React.PureComponent {
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <FormItem>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.username.required' }),
            },
            {
              pattern: /^.{2,20}$/,
              message: formatMessage({ id: 'validation.username.strength' }),
            },
          ],
        })(
          <Input
            size="large"
            placeholder={formatMessage({ id: 'register.username.placeholder' })}
          />
        )}
      </FormItem>
    );
  }
}
