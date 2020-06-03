import React from 'react';
import { Form, Input, Col, InputNumber } from 'antd';
import { getValue } from '@/utils/parameter';
import { formatMessage } from 'umi-plugin-react/locale';

const FormItem = Form.Item;

const GloveFormUtil = Form.create()(props => {
  const { getFieldDecorator, current, formLayout } = props;

  return (
    <div>
      <Col span={12}>
        <FormItem label={formatMessage({id: 'parameter.size'})} {...formLayout}>
          {getFieldDecorator('parameter.size', {
            initialValue: current && current.parameter && getValue('size', current.parameter),
          })(<Input placeholder={formatMessage({id: 'please.input'})} />)}
        </FormItem>
      </Col>
    
      <Col span={12}>
        <FormItem label={`${formatMessage({id: 'parameter.length'})}(cm)`} {...formLayout}>
          {getFieldDecorator('parameter.length', {
            initialValue: current && current.parameter && getValue('length', current.parameter),
          })(<InputNumber placeholder={formatMessage({id: 'please.input'})} min={0} style={{ width: '100%' }} />)}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem label={`${formatMessage({id: 'parameter.width'})}(cm)`} {...formLayout}>
          {getFieldDecorator('parameter.width', {
            initialValue: current && current.parameter && getValue('width', current.parameter),
          })(<InputNumber placeholder={formatMessage({id: 'please.input'})} min={0} style={{ width: '100%' }} />)}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem label={formatMessage({id: 'parameter.weight.price'})} {...formLayout}>
          {getFieldDecorator('parameter.weight', {
            initialValue: current && current.parameter && getValue('weight', current.parameter),
          })(<InputNumber placeholder={formatMessage({id: 'please.input'})} min={0} style={{ width: '100%' }} />)}
        </FormItem>
      </Col>
    </div>
  );
});

export default GloveFormUtil;
