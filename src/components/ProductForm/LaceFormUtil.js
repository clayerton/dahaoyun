import React, { PureComponent } from 'react';
import { Form, Input, Col, InputNumber, Select } from 'antd';
import { getValue } from '@/utils/parameter';
import { formatMessage } from 'umi-plugin-locale';

const FormItem = Form.Item;
const SelectOption = Select.Option;
class LaceFormUtil extends PureComponent {
  constructor(props) {
    super(props);
  
  }
  render() {
    const { getFieldDecorator, current, formLayout } = this.props;
    return (
      <div>
        <Col span={12}>
          <FormItem label={formatMessage({id: 'parameter.lace.type'})} {...formLayout}>
            {getFieldDecorator('parameter.type', {
              initialValue: current && current.parameter && getValue('type', current.parameter),
            })(<Input placeholder={formatMessage({id: 'please.input'})} style={{ width: '100%' }} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={formatMessage({id: 'parameter.colors'})} {...formLayout}>
            {getFieldDecorator('parameter.color', {
              initialValue: current && current.parameter && getValue('length', current.parameter),
            })(<Input placeholder={formatMessage({id: 'please.input'})} style={{ width: '100%' }} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={formatMessage({id: 'parameter.lace.count'})} {...formLayout}>
            {getFieldDecorator('parameter.length', {
              initialValue: current && current.parameter && getValue('width', current.parameter),
            })(<InputNumber placeholder={formatMessage({id: 'please.input'})} min={0} style={{ width: '100%' }} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={formatMessage({id: 'parameter.lace.length'})} {...formLayout}>
            {getFieldDecorator('parameter.count', {
              initialValue: current && current.parameter && getValue('count', current.parameter),
            })(<InputNumber placeholder={formatMessage({id: 'please.input'})} min={0} style={{ width: '100%' }} />)}
          </FormItem>
        </Col>
      </div>
    );
  }

}
export default LaceFormUtil;
