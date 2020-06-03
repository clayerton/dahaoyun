import { Col, Form, Input, notification, Row, Select, DatePicker } from 'antd';
import React, { Fragment } from 'react';
import styles from './index.less';
import moment from 'moment';
const { TextArea } = Input;

const FormItem = Form.Item;
const SelectOption = Select.Option;

const ModifyStageForm = Form.create()(props => {
  const {
    getFieldDecorator,
    current,
    formLayout,
    submit,
    validateFields,
    groupList,
    type
  } = props;
  //   console.log({current})
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) return;
      submit(fieldsValue);
    });
  };

  const InputNumber = (rule, value, callback) => {
    if (value && isNaN(Number(value))) {
      notification.success({
        message: '头数请输入数字类型',
      });
      return;
    }
    callback();
  };

  const onChange = (data, dataString) => {
  }

  const dateFormat = 'YYYY/MM/DD';

  return (
    <Form className={{}} onSubmit={handleSubmit}>
      {type === 1 &&
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="订单号" {...formLayout}>
              {getFieldDecorator('craftNm', {
                rules: [{ required: true, message: '请输入订单号' }],
                initialValue: current && current.craftNm,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="订单标题" {...formLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: false, message: '请输入订单标题' }],
                initialValue: current && current.name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label="客户名称" {...formLayout}>
              {getFieldDecorator('electrCtrl', {
                rules: [{ required: false, message: '请输入客户名称' }],
                initialValue: current && current.electrCtrl,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="下单日期" {...formLayout}>
              {getFieldDecorator('date-picker', {
                rules: [{ required: false, message: '请输入下单日期' }],
                initialValue: current && current.frame,
              })(<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} placeholder="请选择下单日期" style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="交货日期" {...formLayout}>
              {getFieldDecorator('headNm', {
                rules: [
                  { required: false, message: '请输入交货日期' }],
                initialValue: current && current.headNm,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="起始日期" {...formLayout}>
              {getFieldDecorator('stitches', {
                rules: [{ required: false, message: '请输入针数' }],
                initialValue: current && current.stitches,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="分期间隔" {...formLayout}>
              {getFieldDecorator('clipper', {
                rules: [{ required: false, message: '请输入夹线器' }],
                initialValue: current && current.clipper,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="分期期数" {...formLayout}>
              {getFieldDecorator('headstock', {
                rules: [{ required: false, message: '请输入主轴' }],
                initialValue: current && current.headstock,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="每期还款" {...formLayout}>
              {getFieldDecorator('embFrame', {
                rules: [{ required: false, message: '请输入绣框' }],
                initialValue: current && current.embFrame,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
      }
      {
        type === 2 &&
        <Fragment>
          <FormItem key={1}  className={styles.leftWidth} label="数量" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('productQuantity', {
              rules: [{ required: true, message: '请输入数量' }],
              initialValue: current && current.productQuantity,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem key={2} label="备注" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('remark', {
              rules: [{ required: false, message: '请输入备注' }],
              initialValue: current && current.remark,
            })(<TextArea placeholder="请输入" />)}
          </FormItem>
        </Fragment>
      }

    </Form>
  );
});
export default ModifyStageForm;
